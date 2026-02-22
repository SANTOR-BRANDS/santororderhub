import React, { createContext, useContext, useState, useEffect } from 'react';
import { enTranslations, thTranslations, zhTranslations } from '@/i18n';

type Language = 'en' | 'th' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: enTranslations,
  th: thTranslations,
  zh: zhTranslations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('santor-language');
    // Default language is Thai, can be switched to English
    return (saved as Language) || 'th';
  });

  useEffect(() => {
    try {
      localStorage.setItem('santor-language', language);
    } catch (error) {
      // Storage quota exceeded - silently fail
      console.warn('Storage quota exceeded, language preference not saved');
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof enTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
