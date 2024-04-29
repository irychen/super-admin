import { mergePath } from "fortea"

const { VITE_API_BASE_URL } = import.meta.env

const baseUrl = VITE_API_BASE_URL || "http://localhost:3000"

export function getBaseUrl(url: string) {
    return url.startsWith("http") ? url : mergePath(baseUrl, url)
}
