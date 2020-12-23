import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import browserLanguageDetector from 'i18next-browser-languagedetector';

import translationResources from './locales/index';

export const supportedLanguages = [
  'en', // english
  'tr', // turkish
  'ru', // russian
  'zh', // simplified chinese
  'de', // german
  'ja', // japanese
  'es_419', // latin america spanish
];

export const supportedLanguagesLabelsMap: { [index: string]: string } = {
  en: 'English',
  tr: 'Türkçe',
  ru: 'Русский',
  zh: '简体中文',
  de: 'Deutsch',
  ja: '日本語',
  es_419: 'Español',
};

const options = {
  // i18next browser-languagedetector config options
  detection: {
    order: ['cookie', 'localStorage'],
    caches: ['cookie', 'localStorage'],
  },

  // i18next config options
  // Translation strings
  resources: translationResources,

  // Translations in `common.json` will be available as fallback on all namespaces.
  fallbackNS: 'common',
  // Translations in `common.json` will be used if no namespace is passed to translate.
  defaultNS: 'common',

  // English translations will be used if the key is missing in the selected language.
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(browserLanguageDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;
