// testUtils.ts
import en from '../../public/locales/en/translation.json';
import es from '../../public/locales/es/translation.json';

// Define a recursive type for translations
interface Translations {
  [key: string]: string | Translations;
}

interface LanguageTranslations {
  en: Translations;
  es: Translations;
}

const translations: LanguageTranslations = {
  en,
  es,
};

interface Replacements {
  [key: string]: string;
}

const getNestedTranslation = (obj: Translations, key: string): string | Translations => {
  return key.split('.').reduce((acc, part) => {
    if (typeof acc === 'string') {
      throw new Error(`Expected object but got string when accessing ${part} in ${key}`);
    }
    return acc[part] as Translations;
  }, obj);
};

export const getExpectedText = (key: string, lang: keyof LanguageTranslations, replacements: Replacements = {}): string => {
  let text = getNestedTranslation(translations[lang], key) as string;
  Object.keys(replacements).forEach((placeholder) => {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  });
  return text;
};
