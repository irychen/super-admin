import config from "@/config"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TokenStore {
    token: string
    expires: number
    setToken: (token: string, expires?: number) => void
    dropToken: () => void
    getToken: () => string
}

export const useTokenStore = create<TokenStore>()(
    persist(
        (set, get) => ({
            token: "",
            expires: 0,
            setToken: (token: string, expires?: number) => {
                expires = expires || Date.now() + config.tokenExpiresIn
                set({ token, expires })
            },
            dropToken: () => set({ token: "", expires: 0 }),
            getToken: () => {
                const { token, expires } = get()
                if (expires < Date.now()) {
                    set({ token: "", expires: 0 })
                    return ""
                }
                return token
            },
        }),
        { name: "token" },
    ),
)

export const tokenStore = {
    setToken: (token: string, expires?: number) => useTokenStore.getState().setToken(token, expires),
    dropToken: () => useTokenStore.getState().dropToken(),
    getToken: () => useTokenStore.getState().getToken(),
}
