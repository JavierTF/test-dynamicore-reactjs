import { useState, useEffect, useCallback } from 'react';
import lang from '../utils/lang.json';
import { TLanguage } from '../types/common.type';

type TextFunction = any;

const useLanguage = (initialLang: TLanguage = 'es'): {
  text: TextFunction;
  language: TLanguage;
  setLanguage: (lang: TLanguage) => void;
} => {
  const validInitialLang = Object.keys(lang).includes(initialLang) ? initialLang : 'es';
  
  const [language, setLanguage] = useState<TLanguage>(validInitialLang);

  const handleSetLanguage = useCallback((newLang: TLanguage) => {
    if (!Object.keys(lang).includes(newLang)) {
      console.error(`Idioma "${newLang}" no soportado. Usando idioma por defecto.`);
      setLanguage('es');
      return;
    }
    setLanguage(newLang);
  }, []);

  const text = lang[language] || lang['es'];
  
  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch (error) {
      console.error('Error al establecer el atributo lang en el documento:', error);
    }
  }, [language]);

  if (!text) {
    console.error(`No se encontraron traducciones para el idioma "${language}". Usando fallback.`);
    return { 
      text: lang['es'] || {}, 
      language, 
      setLanguage: handleSetLanguage 
    };
  }

  return { text, language, setLanguage: handleSetLanguage };
};

export default useLanguage;