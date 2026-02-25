import { Surah, SurahDetail } from '../types/quran';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${BASE_URL}/surah`);
  const data = await response.json();
  return data.data;
};

export const fetchSurahDetail = async (number: number, edition: string = 'quran-uthmani'): Promise<SurahDetail> => {
  const response = await fetch(`${BASE_URL}/surah/${number}/${edition}`);
  const data = await response.json();
  return data.data;
};

export const fetchTranslation = async (number: number, edition: string = 'en.sahih'): Promise<SurahDetail> => {
  const response = await fetch(`${BASE_URL}/surah/${number}/${edition}`);
  const data = await response.json();
  return data.data;
};

export const fetchAyahAudio = (ayahNumber: number, reciter: string = 'ar.alafasy') => {
  return `https://cdn.islamic.network/quran/audio/128/${reciter}/${ayahNumber}.mp3`;
};