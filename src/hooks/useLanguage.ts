import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export type Language = 'en' | 'de';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('de');

  // Initialize language from browser storage or i18n
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'de')) {
      setCurrentLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    } else {
      setCurrentLanguage(i18n.language as Language || 'de');
    }
  }, [i18n]);

  // Function to change language
  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  return {
    currentLanguage,
    changeLanguage,
    languages: ['en', 'de'] as Language[],
  };
}; 