import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useState } from "react"
import { setCookie, parseCookies } from "nookies"
import { ConfigProvider, theme } from "antd"
import type { ThemeConfig } from "antd"
import { isNil } from "ramda"
import { primaryColor } from "@/config"

export type IsAutoTheme = "yes" | "no" | undefined
export type ThemeMode = "light" | "dark"

export interface AppTheme {
    // 主题模式 light | dark
    mode: ThemeMode
    // 主题配置 antd 的主题配置
    themeConfig: ThemeConfig
    // 是否自动跟随系统主题
    isAuto: boolean
    // 切换主题
    toggleTheme: (v?: ThemeMode) => void
    // 设置是否自动跟随系统主题
    setIsAuto: (v: boolean) => void
    // 设置主题配置
    setThemeConfig: (v: ThemeConfig) => void
}

const ThemeContext = createContext<AppTheme>({
    isAuto: false,
    mode: "light",
    themeConfig: {},
    toggleTheme: (v?: ThemeMode) => {
        console.log(v)
    },
    setIsAuto: (v: boolean) => {
        console.log(v)
    },
    setThemeConfig: (v: ThemeConfig) => {
        console.log(v)
    },
})

export const useThemeContext = () => {
    return useContext(ThemeContext)
}

function setBodyTagThemeClass(theme: ThemeMode) {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(theme)
}

function setCookieThemeMode(theme: ThemeMode) {
    setCookie(null, "themeMode", theme, {
        maxAge: 60 * 60 * 24 * 365,
        // path: "/"
    }) // 将主题存储到 cookie，有效期 365 天
}

function setCookieIsAutoTheme(isAuto: boolean) {
    setCookie(null, "isAutoTheme", isAuto ? "yes" : "no", {
        maxAge: 60 * 60 * 24 * 365,
        // path: "/"
    }) // 将主题存储到 cookie，有效期 365 天
}

function ThemeProvider({ children }: { children: ReactNode }) {
    const cookieThemeIsAuto = parseCookies().isAutoTheme as IsAutoTheme
    const initIsAuto = cookieThemeIsAuto ? cookieThemeIsAuto === "yes" : true
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const themeMode = initIsAuto
        ? media.matches
            ? "dark"
            : "light"
        : ((parseCookies().themeMode || "light") as ThemeMode)
    // 是否自动跟随系统主题
    const [isAuto, setIsAuto] = useState<boolean>(initIsAuto)
    // 主题模式 light | dark
    const [mode, setMode] = useState<ThemeMode>(themeMode as ThemeMode)
    // antd 的主题配置
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
        token: {
            // borderRadius: 0,
            colorPrimary: primaryColor,
            colorLink: primaryColor,
        },
    })

    // 切换主题 light | dark | undefined
    const toggleTheme = (v?: ThemeMode) => {
        if (isNil(v)) {
            setMode(mode === "light" ? "dark" : "light")
        } else {
            setMode(v)
        }
    }

    useLayoutEffect(() => {
        setBodyTagThemeClass(mode)
        setCookieThemeMode(mode)
    }, [mode])

    const memoizedThemeConfig = useMemo(() => {
        return {
            ...themeConfig,
            algorithm: mode === "light" ? undefined : theme.darkAlgorithm,
        }
    }, [themeConfig, mode])

    useLayoutEffect(() => {
        setCookieIsAutoTheme(isAuto)
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (isAuto) {
            setMode(isDark ? "dark" : "light")
        }
        const mql = window.matchMedia("(prefers-color-scheme: dark)")
        const listener = (e: MediaQueryListEvent) => {
            if (isAuto) {
                setMode(e.matches ? "dark" : "light")
            }
        }
        mql.addEventListener("change", listener)
        return () => {
            mql.removeEventListener("change", listener)
        }
    }, [isAuto])

    return (
        <ThemeContext.Provider
            value={{
                themeConfig: memoizedThemeConfig,
                setThemeConfig,
                mode,
                isAuto,
                toggleTheme,
                setIsAuto,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

function AntdThemeProvider({ children }: { children?: ReactNode }) {
    const { themeConfig } = useThemeContext()
    return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
}

export function AppThemeProvider({ children }: { children?: ReactNode }) {
    return (
        <ThemeProvider>
            <AntdThemeProvider>{children}</AntdThemeProvider>
        </ThemeProvider>
    )
}
