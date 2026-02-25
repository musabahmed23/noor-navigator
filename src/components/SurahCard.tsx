import React from 'react';
import { Surah } from '../types/quran';
import { BookOpen, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface SurahCardProps {
  surah: Surah;
  onClick: (number: number) => void;
}

export const SurahCard: React.FC<SurahCardProps> = ({ surah, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(surah.number)}
      className="cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold text-lg rotate-45 group-hover:rotate-0 transition-transform">
            <span className="-rotate-45 group-hover:rotate-0 transition-transform">
              {surah.number}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
              {surah.englishName}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {surah.englishNameTranslation}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-arabic font-bold text-emerald-700 dark:text-emerald-400">
            {surah.name}
          </p>
          <div className="flex items-center justify-end gap-3 mt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <BookOpen size={12} /> {surah.numberOfAyahs}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {surah.revelationType}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};