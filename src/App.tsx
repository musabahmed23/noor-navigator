import React, { useState, useEffect } from 'react';
import { fetchSurahs } from './lib/api';
import { Surah } from './types/quran';
import { SurahCard } from './components/SurahCard';
import { Reader } from './components/Reader';
import { SettingsPanel } from './components/SettingsPanel';
import { SettingsProvider, useSettings } from './hooks/useSettings';
import { Search, Settings as SettingsIcon, Book, LayoutGrid, List, Sparkles } from 'lucide-react';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import './custom.css';

const QuranApp = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSurahs = async () => {
      try {
        const data = await fetchSurahs();
        setSurahs(data);
        setFilteredSurahs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getSurahs();
  }, []);

  useEffect(() => {
    const filtered = surahs.filter(
      (s) =>
        s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.number.toString() === searchQuery
    );
    setFilteredSurahs(filtered);
  }, [searchQuery, surahs]);

  if (selectedSurah) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
        <Reader 
          surahNumber={selectedSurah} 
          onBack={() => setSelectedSurah(null)} 
        />
        <Toaster position="bottom-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07dd2e1e-f485-4540-a291-a06be2b68261/quran-hero-image-fc0aed1e-1771983069179.webp" 
            alt="Quran Background" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent dark:from-slate-950 dark:via-slate-950/50" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <Sparkles size={16} />
            Experience the Divine Wisdom
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 font-arabic"
          >
            القرآن الكريم
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-300 mb-8"
          >
            Explore, Read, and Listen to the Holy Quran with a professional and immersive experience.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by Surah name or number..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20 relative z-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Surah Directory</h2>
            <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium">
              114 Chapters
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow text-slate-600 dark:text-slate-300"
            >
              <SettingsIcon size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-24 bg-white dark:bg-slate-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSurahs.map((surah) => (
                <SurahCard 
                  key={surah.number} 
                  surah={surah} 
                  onClick={setSelectedSurah} 
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default function App() {
  return (
    <SettingsProvider>
      <QuranApp />
    </SettingsProvider>
  );
}