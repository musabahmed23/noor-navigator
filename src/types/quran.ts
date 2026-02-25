export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  translation?: string;
  audio?: string;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface Settings {
  fontSize: number;
  showTranslation: boolean;
  showTransliteration: boolean;
  theme: 'light' | 'dark' | 'sepia';
  translationEdition: string;
  reciter: string;
}