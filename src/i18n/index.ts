import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
// import Backend from "i18next-http-backend"
import enUS from "./locales/en-US/translation.json"
import zhCN from "./locales/zh-CN/translation.json"

/*

If you need to access the t function or the i18next instance from 
outside of a React component you can simply import your ./i18n.js 
and use the exported i18next instance:

```ts
import i18next from "@/i18n"
i18next.t("my.key")
```

*/

export enum i18nLanguage {
    EN_US = "en-US",
    ZH_CN = "zh-CN",
}

i18n
    /*
    if you want to use http backend to load translations, you need move locales folder to public folder
    then the locale files can be automatically loaded without import
    */
    // .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: [i18nLanguage.EN_US, i18nLanguage.ZH_CN],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        fallbackLng: i18nLanguage.EN_US,
        resources: {
            [i18nLanguage.EN_US]: {
                translation: enUS,
            },
            [i18nLanguage.ZH_CN]: {
                translation: zhCN,
            },
        },
    })

export default i18n
