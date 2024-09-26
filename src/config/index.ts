import timeDuration from "@/utils/timeDuration"

const config = {
    mode: import.meta.env.MODE, // development | production | test | mock
    isDev: import.meta.env.DEV,
    appTitle: import.meta.env.VITE_APP_TITLE,
    appDescription: import.meta.env.VITE_APP_DESCRIPTION,
    hashRouter: import.meta.env.VITE_HASH_ROUTER === "true",
    baseUrl: import.meta.env.BASE_URL,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    apiMaxTimeout: timeDuration(import.meta.env.VITE_API_MAX_TIMEOUT),
    // milliseconds
    tokenExpiresIn: timeDuration(import.meta.env.VITE_TOKEN_EXPIRES_IN),
}

export default config
