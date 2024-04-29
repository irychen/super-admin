import { persist } from "zustand/middleware"
import { storageKeys } from "@/constants"
import { create } from "zustand"

type ThemeMode = "light" | "dark" | "system"

interface AppConfig {
    themeMode: ThemeMode
    isDark: boolean
    locale: string
    update: (updater: (config: AppConfig) => void) => void
    reset: () => void
}

export const DEFAULT_CONFIG = {
    themeMode: "system" as ThemeMode,
    locale: "zh-CN",
    isDark: false,
}

export const useAppConfig = create(
    persist<AppConfig>(
        (set, get) => ({
            ...DEFAULT_CONFIG,
            update(updater: (config: AppConfig) => void) {
                const state = get()
                updater(state)
                set({
                    ...state,
                })
            },
            reset() {
                set(() => ({ ...DEFAULT_CONFIG }))
            },
        }),
        {
            name: storageKeys.config,
            version: 1,
        },
    ),
)
