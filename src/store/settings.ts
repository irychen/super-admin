import { Theme, ThemeMode } from "@/types"
import { useLayoutEffect } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SettingsStore {
    theme: Theme
    themeMode: ThemeMode
    menuCollapsed: boolean
    showBreadcrumb: boolean
    siderMenuSelectedKeys: string[]
    siderMenuOpenKeys: string[]
    layoutStretch: boolean
    primaryColor: string
    enableMemoizedScollTop: boolean
    multiTabs: boolean
    setTheme: (theme: Theme) => void
    setThemeMode: (themeMode: ThemeMode) => void
    setMenuCollapsed: (collapsed: boolean) => void
    setShowBreadcrumb: (showBreadcrumb: boolean) => void
    setSiderMenuSelectedKeys: (selectedKeys: string[]) => void
    setSiderMenuOpenKeys: (openKeys: string[]) => void
    setLayoutStretch: (stretch: boolean) => void
    setPrimaryColor: (primaryColor: string) => void
    setEnableMemoizedScollTop: (enableMemoizedScollTop: boolean) => void
    setMultiTabs: (multiTabs: boolean) => void
}

export const useSettingsStore = create<SettingsStore>()(
    persist(
        set => ({
            theme: Theme.LIGHT,
            themeMode: ThemeMode.SYSTEM,
            menuCollapsed: false,
            showBreadcrumb: true,
            siderMenuSelectedKeys: [],
            siderMenuOpenKeys: [],
            layoutStretch: false,
            primaryColor: "#0780EA",
            enableMemoizedScollTop: true,
            multiTabs: true,
            setTheme: (theme: Theme) => set({ theme }),
            setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),
            setMenuCollapsed: (collapsed: boolean) => set({ menuCollapsed: collapsed }),
            setShowBreadcrumb: (showBreadcrumb: boolean) => set({ showBreadcrumb: showBreadcrumb }),
            setSiderMenuSelectedKeys: (selectedKeys: string[]) => set({ siderMenuSelectedKeys: selectedKeys }),
            setSiderMenuOpenKeys: (openKeys: string[]) => set({ siderMenuOpenKeys: openKeys }),
            setLayoutStretch: (stretch: boolean) => set({ layoutStretch: stretch }),
            setPrimaryColor: (primaryColor: string) => set({ primaryColor }),
            setEnableMemoizedScollTop: (enableMemoizedScollTop: boolean) => set({ enableMemoizedScollTop }),
            setMultiTabs: (multiTabs: boolean) => set({ multiTabs }),
        }),
        {
            name: "settings",
        },
    ),
)

export const settingsStore = {
    setTheme: (theme: Theme) => useSettingsStore.getState().setTheme(theme),
    setThemeMode: (themeMode: ThemeMode) => useSettingsStore.getState().setThemeMode(themeMode),
    setMenuCollapsed: (collapsed: boolean) => useSettingsStore.getState().setMenuCollapsed(collapsed),
    setShowBreadcrumb: (showBreadcrumb: boolean) => useSettingsStore.getState().setShowBreadcrumb(showBreadcrumb),
    setSiderMenuSelectedKeys: (selectedKeys: string[]) =>
        useSettingsStore.getState().setSiderMenuSelectedKeys(selectedKeys),
    setSiderMenuOpenKeys: (openKeys: string[]) => useSettingsStore.getState().setSiderMenuOpenKeys(openKeys),
    setLayoutStretch: (stretch: boolean) => useSettingsStore.getState().setLayoutStretch(stretch),
    setPrimaryColor: (primaryColor: string) => useSettingsStore.getState().setPrimaryColor(primaryColor),
    setEnableMemoizedScollTop: (enableMemoizedScollTop: boolean) =>
        useSettingsStore.getState().setEnableMemoizedScollTop(enableMemoizedScollTop),
    setMultiTabs: (multiTabs: boolean) => useSettingsStore.getState().setMultiTabs(multiTabs),
}

export function useInitTheme() {
    const themeMode = useSettingsStore(state => state.themeMode)
    const theme = useSettingsStore(state => state.theme)
    const setTheme = useSettingsStore(state => state.setTheme)

    useLayoutEffect(() => {
        const isAuto = themeMode === ThemeMode.SYSTEM
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (isAuto) {
            setTheme(isDark ? Theme.DARK : Theme.LIGHT)
        } else {
            setTheme(themeMode === ThemeMode.DARK ? Theme.DARK : Theme.LIGHT)
        }
        const mql = window.matchMedia("(prefers-color-scheme: dark)")
        const listener = (e: MediaQueryListEvent) => {
            if (isAuto) {
                setTheme(e.matches ? Theme.DARK : Theme.LIGHT)
            }
        }
        mql.addEventListener("change", listener)
        return () => {
            mql.removeEventListener("change", listener)
        }
    }, [setTheme, themeMode])

    useLayoutEffect(() => {
        // set html tag theme class
        document.documentElement.classList.remove("dark", "light")
        document.documentElement.classList.add(theme)
        // set data-theme attribute
        document.documentElement.setAttribute("data-theme", theme)
        // set html style color scheme
        document.documentElement.style.colorScheme = theme
    }, [theme])
}
