import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { Settings, Moon, Sun, Monitor, Type, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Settings size={20} className="text-emerald-600" />
            Preferences
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Appearance</label>
            <div className="grid grid-cols-3 gap-3">
              {(['light', 'dark', 'sepia'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => updateSettings({ theme: t })}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 capitalize ${
                    settings.theme === t 
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' 
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                  }`}
                >
                  {t === 'light' && <Sun size={20} />}
                  {t === 'dark' && <Moon size={20} />}
                  {t === 'sepia' && <Monitor size={20} />}
                  <span className="text-xs font-semibold">{t}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Type size={16} /> Font Size
              </label>
              <span className="text-sm font-bold text-emerald-600">{settings.fontSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="48"
              value={settings.fontSize}
              onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Visibility */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Display Options</label>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <span className="font-medium">Show Translation</span>
              <button
                onClick={() => updateSettings({ showTranslation: !settings.showTranslation })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.showTranslation ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.showTranslation ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};