const { VITE_TOKEN_KEY } = import.meta.env

const tokenKey = VITE_TOKEN_KEY || "SUPER_ADMIN_TOKEN_KEY"

/**
 * 获取 token
 */
export function getToken(): string | null {
    return localStorage.getItem(tokenKey)
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
