import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
      format: function (value, format) {
        if (format === 'capitalize') return value.charAt(0).toUpperCase() + value.slice(1);
        return value;
      },
    },

    detection: {
      order: ['customDetector', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    },

    backend: {
      loadPath: `/locales/{{lng}}.json`,
      allowMultiLoading: false,
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;
