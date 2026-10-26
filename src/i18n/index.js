import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import de from './de.json'
import en from './en.json'
import fr from './fr.json'
import nl from './nl.json'

const SUPPORTED = ['de', 'en', 'fr', 'nl']

const savedLang = () => {
  try {
    const lng = localStorage.getItem('lang')
    return SUPPORTED.includes(lng) ? lng : 'de'
  } catch {
    return 'de'
  }
}

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    fr: { translation: fr },
    nl: { translation: nl },
  },
  lng: savedLang(),
  fallbackLng: 'de',
  interpolation: { escapeValue: false },
})

const syncDocument = (lng) => {
  document.documentElement.lang = lng
  document.title = i18n.t('meta.title')
  try {
    localStorage.setItem('lang', lng)
  } catch {
    // storage unavailable (private mode): language just won't persist
  }
}

syncDocument(i18n.language)
i18n.on('languageChanged', syncDocument)

export default i18n
