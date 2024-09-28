import { memo, useMemo, useState } from "react"
import { ConfigProvider, ThemeConfig, theme as antdTheme } from "antd"
import { getI18n } from "react-i18next"
import { useInitTheme, useSettingsStore } from "@/store/settings"
import { Theme } from "@/types"
import dayjs from "dayjs"
import zh_CN from "antd/lib/locale/zh_CN"
import en_US from "antd/lib/locale/en_US"
import { i18nLanguage } from "@/i18n"

import "dayjs/locale/zh-cn"
import "dayjs/locale/en"
import Color from "color"

const localeMap = {
    [i18nLanguage.ZH_CN]: zh_CN,
    [i18nLanguage.EN_US]: en_US,
}

function AntdConfigWrapper(props: { children: React.ReactNode }) {
    console.log("AntdConfigWrapper render")
    const { children } = props
    const i18n = getI18n()
    const [locale, setLocale] = useState<string>(i18n.language)

    i18n.on("languageChanged", lng => {
        if (lng !== locale) {
            setLocale(lng)
            if (lng === i18nLanguage.ZH_CN) {
                dayjs.locale("zh-cn")
            } else {
                dayjs.locale("en")
            }
        }
    })

    const theme = useSettingsStore(state => state.theme)
    const primaryColor = useSettingsStore(state => state.primaryColor)
    const antdThemeMemoized = useMemo((): ThemeConfig => {
        const darkPrimaryColor = Color(primaryColor).lighten(0.1).hex()
        const themeModeToken: Record<Theme, ThemeConfig> = {
            dark: {
                token: {
                    colorBgLayout: "#161C24",
                    colorBgContainer: "#161C24",
                    colorBgElevated: "#161c24",
                    colorPrimary: primaryColor,
                    colorLink: theme === Theme.DARK ? darkPrimaryColor : primaryColor,
                    colorLinkHover: theme === Theme.DARK ? darkPrimaryColor : primaryColor,
                    colorPrimaryHover: theme === Theme.DARK ? darkPrimaryColor : primaryColor,
                },
                components: {
                    Modal: {
                        headerBg: "#212b36",
                        contentBg: "#212b36",
                        footerBg: "#212b36",
                    },
                    Notification: {},
                },
            },
            light: {
                token: {
                    colorPrimary: primaryColor,
                    colorLink: theme === Theme.DARK ? darkPrimaryColor : primaryColor,
                    colorLinkHover: theme === Theme.DARK ? darkPrimaryColor : primaryColor,
                    colorPrimaryHover: theme === Theme.DARK ? darkPrimaryColor : primaryColor,
                },
                components: {},
            },
        }

        return {
            token: {
                colorPrimary: theme === Theme.DARK ? darkPrimaryColor : primaryColor,
                ...themeModeToken[theme].token,
            },
            algorithm: theme === Theme.DARK ? antdTheme.darkAlgorithm : undefined,
            components: {
                Menu: {
                    fontSize: 14,
                    colorFillAlter: "transparent",
                    itemColor: "rgb(145, 158, 171)",
                },
                ...themeModeToken[theme].components,
            },
        }
    }, [theme, primaryColor])

    useInitTheme()

    return (
        <ConfigProvider locale={localeMap[locale as i18nLanguage]} theme={antdThemeMemoized}>
            {children}
        </ConfigProvider>
    )
}

export default memo(AntdConfigWrapper)
