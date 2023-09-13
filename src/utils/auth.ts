const localAuthStorageKey = "SUPER_ADMIN_AUTH_KEY"

/**
 * 获取权限 keys
 */
export function getAuthKeys(): string[] {
    const authStr = localStorage.getItem(localAuthStorageKey)
    if (authStr) {
        return JSON.parse(authStr)
    } else {
        return []
    }
}

/**
 * 设置权限 keys
 * @param authKeys
 */
export function setAuthKeys(authKeys: string[]) {
    localStorage.setItem(localAuthStorageKey, JSON.stringify(authKeys))
}

/**
 * 清除权限 keys 建议退出登录时调用
 */
export function clearAuthKeys() {
    localStorage.removeItem(localAuthStorageKey)
}

/**
 * 判断是否有任意权限
 * @param authKeys
 */
export function hasAnyAuth(authKeys: string[]) {
    const localAuthKeys = getAuthKeys()
    return authKeys.some(authKey => localAuthKeys.includes(authKey))
}

/**
 * 判断是否有全部权限
 * @param authKeys
 */
export function hasAllAuth(authKeys: string[]) {
    const localAuthKeys = getAuthKeys()
    return authKeys.every(authKey => localAuthKeys.includes(authKey))
}

/**
 * 判断是否有某个权限
 * @param authKey
 */
export function hasAuth(authKey: string) {
    const localAuthKeys = getAuthKeys()
    return localAuthKeys.includes(authKey)
}

const Auth = {
    getAuthKeys,
    setAuthKeys,
    clearAuthKeys,
    hasAnyAuth,
    hasAllAuth,
    hasAuth,
}

export default Auth
