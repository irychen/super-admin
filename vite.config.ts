import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
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
                replacement: `${resolve(__dirname, "src")}/`,
            },
        ],
    },
})
