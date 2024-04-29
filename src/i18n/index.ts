import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import enTranslation from "@/locales/en.json"
import zhTranslation from "@/locales/zh.json"

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            zh: { translation: zhTranslation },
        },
        lng: "zh", // 默认语言
        fallbackLng: "en", // 回退语言
        interpolation: {
            escapeValue: false, // 不转义插值
        },
    })

export default i18n
