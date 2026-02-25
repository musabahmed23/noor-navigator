import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings } from '../types/quran';

const defaultSettings: Settings = {
  fontSize: 28,
  showTranslation: true,
  showTransliteration: false,
  theme: 'light',
  translationEdition: 'en.sahih',
  reciter: 'ar.alafasy',
};

const SettingsContext = createContext<{
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
} | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('quran-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('quran-settings', JSON.stringify(settings));
    document.documentElement.className = settings.theme;
  }, [settings]);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};