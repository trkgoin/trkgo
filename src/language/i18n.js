import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { english } from './en'

// sirf english language resources
const resources = {
    en: {
        translation: english,
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',          // default language
    fallbackLng: 'en',  // agar kuch missing ho to bhi english
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
