const localAuthStorageKey = 'SUPER_ADMIN_AUTH_KEY'

export function getAuthKeys() {
    const authStr = localStorage.getItem(localAuthStorageKey)
    if (authStr) {
        return JSON.parse(authStr)
    } else {
        return []
    }
}

// 保存权限 keys 建议登录成功后调用
export function setAuthKeys(authKeys: string[]) {
    localStorage.setItem(localAuthStorageKey, JSON.stringify(authKeys))
}

export function clearAuthKeys() {
    localStorage.removeItem(localAuthStorageKey)
}


export function hasAnyAuth(authKeys: string[]) {
    const localAuthKeys = getAuthKeys()
    return authKeys.some(authKey => localAuthKeys.includes(authKey))
}

export function hasAllAuth(authKeys: string[]) {
    const localAuthKeys = getAuthKeys()
    return authKeys.every(authKey => localAuthKeys.includes(authKey))
}

export function hasAuth(authKey: string) {
    const localAuthKeys = getAuthKeys()
    return localAuthKeys.includes(authKey)
}