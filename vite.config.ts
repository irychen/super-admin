import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
const pathSrc = resolve(__dirname, "src")
const envPath = resolve(__dirname, "src", ".env")
const BASE_SITE_URL = process.env.BASE_SITE_URL || "/"

// https://vitejs.dev/config/
export default defineConfig({
    base: BASE_SITE_URL,
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {},
            },
        },
    },
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                presets: ["@emotion/babel-preset-css-prop"],
            },
        }),
    ],
    resolve: {
        alias: [
            {
                find: "@/",
                replacement: `${pathSrc}/`,
            },
        ],
    },
})
