import { defineConfig, UserConfig } from "vite"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { resolve } from "path"

const pathSrc = resolve(__dirname, "src")
const envPath = resolve(__dirname, "src", ".env")
const BASE_SITE_URL = process.env.BASE_SITE_URL || "/"

const config: UserConfig = {
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
}

if (process.env.ANALYZE === "true") {
    config.plugins.push(
        visualizer({
            open: true,
        }),
    )
}

if (process.env.NODE_ENV === "production") {
    config.esbuild = {
        drop: ["console", "debugger"],
    }
}

// https://vitejs.dev/config/
export default defineConfig(config)
