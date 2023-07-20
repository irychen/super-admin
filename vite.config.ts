import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
const pathSrc = resolve(__dirname, "src")
const envPath = resolve(__dirname, "src", ".env")

// https://vitejs.dev/config/
export default defineConfig({
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
