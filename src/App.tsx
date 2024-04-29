import AppRouter from "@/router"
import { Suspense, useLayoutEffect } from "react"
import Loading from "@/components/Loading"
import { StyleProvider } from "@ant-design/cssinjs"
import { ConfigProvider, ThemeConfig, theme } from "antd"
import "antd/dist/reset.css"
import { useAppConfig } from "@/store/config"
import i18n from "i18next"
import "dayjs/locale/zh-cn"
import "dayjs/locale/en.js"
import dayjs from "dayjs"
// antd locals
import zh from "antd/lib/locale/zh_CN"
import en from "antd/lib/locale/en_US"
import { Locale } from "antd/es/locale"

const localeMap = {
    en,
    zh,
} as Record<string, Locale>

const themeModeToken: Record<"dark" | "light", ThemeConfig> = {
    dark: {
        token: {
            colorBgLayout: "#161C24",
            colorBgContainer: "#161C24",
            colorBgElevated: "#161c24",
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
    light: {},
}

function App() {
    const { themeMode, update, isDark, locale } = useAppConfig()

    i18n.on("languageChanged", lng => {
        update(state => {
            state.locale = lng
        })
    })

    useLayoutEffect(() => {
        i18n.changeLanguage(locale)
        console.log("locale", locale)
        dayjs.locale(locale)
    }, [locale])

    useLayoutEffect(() => {
        const isAuto = themeMode === "system"
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (isAuto) {
            update(state => {
                state.isDark = isDark
            })
        } else {
            update(state => {
                state.isDark = themeMode === "dark"
            })
        }
        const mql = window.matchMedia("(prefers-color-scheme: dark)")
        const listener = (e: MediaQueryListEvent) => {
            if (isAuto) {
                update(state => {
                    state.isDark = e.matches
                })
            }
        }
        mql.addEventListener("change", listener)
        return () => {
            mql.removeEventListener("change", listener)
        }
    }, [themeMode])

    useLayoutEffect(() => {
        // set html tag theme class
        document.documentElement.classList.remove("dark", "light")
        document.documentElement.classList.add(isDark ? "dark" : "light")
        // set data-theme attribute
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
        // set html style color scheme
        document.documentElement.style.colorScheme = isDark ? "dark" : "light"
    }, [isDark])

    return (
        <StyleProvider hashPriority="high">
            <ConfigProvider
                locale={localeMap[locale] || zh}
                theme={{
                    token: {
                        colorPrimary: isDark ? "#4a9fee" : "#1890ff",
                        ...themeModeToken[isDark ? "dark" : "light"].token,
                    },
                    algorithm: isDark ? theme.darkAlgorithm : undefined,
                    components: {
                        Menu: {
                            fontSize: 14,
                            colorFillAlter: "transparent",
                            itemColor: "rgb(145, 158, 171)",
                        },
                        ...themeModeToken[isDark ? "dark" : "light"].components,
                    },
                }}
            >
                <Suspense fallback={<Loading />}>
                    <AppRouter />
                </Suspense>
            </ConfigProvider>
        </StyleProvider>
    )
}

export default App
