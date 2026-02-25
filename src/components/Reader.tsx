import React, { useEffect, useState } from 'react';
import { SurahDetail, Ayah } from '../types/quran';
import { fetchSurahDetail, fetchTranslation, fetchAyahAudio } from '../lib/api';
import { useSettings } from '../hooks/useSettings';
import { Play, Pause, Bookmark, Share2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ReaderProps {
  surahNumber: number;
  onBack: () => void;
}

export const Reader: React.FC<ReaderProps> = ({ surahNumber, onBack }) => {
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [translations, setTranslations] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const { settings } = useSettings();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [arabic, trans] = await Promise.all([
          fetchSurahDetail(surahNumber),
          fetchTranslation(surahNumber, settings.translationEdition)
        ]);
        setSurah(arabic);
        setTranslations(trans.ayahs);
      } catch (err) {
        toast.error('Failed to load Surah. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
    window.scrollTo(0, 0);
  }, [surahNumber, settings.translationEdition]);

  const handlePlayAudio = (ayah: Ayah) => {
    if (playingAyah === ayah.number) {
      audioRef.current?.pause();
      setPlayingAyah(null);
      return;
    }

    const audioUrl = fetchAyahAudio(ayah.number, settings.reciter);
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setPlayingAyah(ayah.number);
      
      audioRef.current.onended = () => {
        setPlayingAyah(null);
      };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 animate-pulse">Loading Sacred Text...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4 sm:px-6">
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-4 mb-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold font-arabic text-emerald-700 dark:text-emerald-400">
            {surah?.name}
          </h2>
          <p className="text-sm text-slate-500">{surah?.englishName}</p>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {surahNumber !== 1 && surahNumber !== 9 && (
        <div className="text-center mb-12">
          <p className="text-3xl font-arabic py-8 text-slate-800 dark:text-slate-100">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>
      )}

      <div className="space-y-12">
        {surah?.ayahs.map((ayah, index) => (
          <motion.div
            key={ayah.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`group p-6 rounded-3xl transition-all duration-300 ${
              playingAyah === ayah.number 
                ? 'bg-emerald-50/50 dark:bg-emerald-900/10 ring-1 ring-emerald-200 dark:ring-emerald-800' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm font-medium">
                  {ayah.numberInSurah}
                </span>
                <div className="flex flex-col gap-2 mt-2">
                  <button 
                    onClick={() => handlePlayAudio(ayah)}
                    className={`p-2 rounded-full transition-colors ${
                      playingAyah === ayah.number 
                        ? 'bg-emerald-500 text-white' 
                        : 'text-slate-400 hover:bg-emerald-100 hover:text-emerald-600'
                    }`}
                  >
                    {playingAyah === ayah.number ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
              
              <p 
                dir="rtl" 
                className="font-arabic text-right leading-[2.5] text-slate-800 dark:text-slate-100"
                style={{ fontSize: `${settings.fontSize}px` }}
              >
                {ayah.text}
              </p>
            </div>

            {settings.showTranslation && translations[index] && (
              <div className="pl-16">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
                  {translations[index].text}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};