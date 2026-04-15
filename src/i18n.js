import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import sr from './locales/sr.json'
import en from './locales/en.json'
import de from './locales/de.json'
import ru from './locales/ru.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sr: { translation: sr },
      en: { translation: en },
      de: { translation: de },
      ru: { translation: ru }
    },
    fallbackLng: 'sr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
