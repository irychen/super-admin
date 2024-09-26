import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
    keys: Array<string>
    roles: Array<string>
    setKeys: (keys: Array<string>) => void
    setRoles: (roles: Array<string>) => void
    dropKey: (key: string) => void
    addKey: (key: string) => void
    dropRole: (role: string) => void
    addRole: (role: string) => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        set => ({
            keys: [],
            roles: [],
            setKeys: (keys: Array<string>) => set({ keys }),
            setRoles: (roles: Array<string>) => set({ roles }),
            dropKey: (key: string) => set(state => ({ keys: state.keys.filter(k => k !== key) })),
            addKey: (key: string) => set(state => ({ keys: [...state.keys, key] })),
            dropRole: (role: string) => set(state => ({ roles: state.roles.filter(r => r !== role) })),
            addRole: (role: string) => set(state => ({ roles: [...state.roles, role] })),
        }),
        { name: "auth" },
    ),
)

export const authStore = {
    setKeys: (keys: Array<string>) => useAuthStore.getState().setKeys(keys),
    setRoles: (roles: Array<string>) => useAuthStore.getState().setRoles(roles),
    dropKey: (key: string) => useAuthStore.getState().dropKey(key),
    addKey: (key: string) => useAuthStore.getState().addKey(key),
    dropRole: (role: string) => useAuthStore.getState().dropRole(role),
    addRole: (role: string) => useAuthStore.getState().addRole(role),
}
