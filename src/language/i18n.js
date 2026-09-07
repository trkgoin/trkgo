import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { english } from './en'
import { hindi } from './hi'

// Only the languages TrkGo actually serves. Hindi is a partial translation:
// anything not present in hi.js falls back to English via fallbackLng below,
// so adding more Hindi strings later is safe and needs no code change.
const resources = {
    en: {
        translation: english,
    },
    hi: {
        translation: hindi,
    },
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    })

export default i18n
