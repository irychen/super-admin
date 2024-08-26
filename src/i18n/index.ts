import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import enTranslation from "@/i18n/locales/en.json"
import zhTranslation from "@/i18n/locales/zh.json"
import { DEFAULT_LOCALE } from "@/constants" // 确保这个值是 'en' 或你希望的默认语言

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            zh: { translation: zhTranslation },
            "en-US": { translation: enTranslation },
            "zh-CN": { translation: zhTranslation },
            "en-GB": { translation: enTranslation },
        },
        fallbackLng: {
            default: [DEFAULT_LOCALE],
        },
        interpolation: {
            escapeValue: false, // 不转义插值
        },
    })

export default i18n
