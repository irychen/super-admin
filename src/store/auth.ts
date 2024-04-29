import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { storageKeys } from "@/constants"

interface AppAuth {
    token: string
    permissions: string[]
    update: (updater: (config: AppAuth) => void) => void
    reset: () => void
}

export const DEFAULT_AUTH = {
    token: "",
    permissions: [],
}

export const useAppAuth = create(
    persist<AppAuth>(
        (set, get) => ({
            ...DEFAULT_AUTH,
            update(updater: (config: AppAuth) => void) {
                const state = get()
                updater(state)
                set({
                    ...state,
                })
            },
            reset() {
                set(() => ({ ...DEFAULT_AUTH }))
            },
        }),
        {
            name: storageKeys.auth,
            version: 1,
            // set with sessionStorage
            // storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
