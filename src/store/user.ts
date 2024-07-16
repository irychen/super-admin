import { create } from "zustand"
import { persist } from "zustand/middleware"
import { storageKeys } from "@/constants"

interface AppUser {
    token: string
    permissions: string[]
    name: string
    roles: string[]
    avatarURL: string
    desc: string
    update: (updater: (config: AppUser) => void) => void
    reset: () => void
}

export const DEFAULT_USER = {
    token: "",
    permissions: [],
    name: "",
    roles: [],
    avatarURL: "",
    desc: "",
}

export const useAppUser = create(
    persist<AppUser>(
        (set, get) => ({
            ...DEFAULT_USER,
            update(updater: (config: AppUser) => void) {
                const state = get()
                updater(state)
                set({
                    ...state,
                })
            },
            reset() {
                set(() => ({ ...DEFAULT_USER }))
            },
        }),
        {
            name: storageKeys.user,
            version: 1,
        },
    ),
)
