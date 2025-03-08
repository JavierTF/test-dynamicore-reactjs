import { TLanguage } from "../types/common.type";

export const saveLanguageToCache = (language: TLanguage): boolean => {
  if (language !== 'es' && language !== 'en') {
    console.warn('Idioma no válido. Solo se admiten "es" o "en"');
    return false;
  }

  try {
    localStorage.setItem('lang_test_dynamicore', language);
    return true;
  } catch (error) {
    console.error('Error al guardar el idioma en caché:', error);
    return false;
  }
};

export const getLanguageFromCache = (): TLanguage => {
  try {
    const cachedLanguage = localStorage.getItem('lang_test_dynamicore');

    if (cachedLanguage === 'es' || cachedLanguage === 'en') {
      return cachedLanguage;
    }

    saveLanguageToCache('es');
    return 'es';
  } catch (error) {
    console.error('Error al obtener el idioma desde caché:', error);
    return 'es';
  }
};