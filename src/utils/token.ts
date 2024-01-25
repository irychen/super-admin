import { isTokenExpired } from "fortea"

const { VITE_TOKEN_KEY } = import.meta.env

const tokenKey = VITE_TOKEN_KEY || "SUPER_ADMIN_TOKEN_KEY"

/**
 * 获取 token
 */
export function getToken(): string | null {
    const token = localStorage.getItem(tokenKey)
    if (!token) return null
    const isExpired = isTokenExpired(token)
    if (isExpired) {
        clearToken()
        return null
    } else {
        return token
    }
}

/**
 * 设置 token
 * @param token
 */
export function setToken(token: string) {
    return localStorage.setItem(tokenKey, token)
}

/**
 * 清除 token 建议退出登录时调用
 */
export function clearToken() {
    localStorage.removeItem(tokenKey)
}
