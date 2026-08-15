import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.json';
import ky from './locales/ky.json';

i18n.use(initReactI18next).init({
  resources: { ru: { translation: ru }, ky: { translation: ky } },
  lng: localStorage.getItem('autoservice-language') || 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (language) => localStorage.setItem('autoservice-language', language));
export default i18n;
