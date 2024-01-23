import { I18n } from 'i18n-js';

export const translations = {
  en: {
    welcome: 'Welcome Back!',
    name: 'Name',
    language: 'Language'
  },
  fr: {
    welcome: 'Content de te revoir!',
    name: 'Nom',
    language: 'Langue'
  },
};

export const i18n = new I18n(translations);
// Set the locale once at the beginning of your app.
i18n.locale = 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';