/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MODE: string
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_DESCRIPTION: string
    readonly VITE_HASH_ROUTER: string
    readonly VITE_BASE_SITE_URL: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
