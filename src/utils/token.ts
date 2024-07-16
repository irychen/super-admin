const TOKEN_KEY = "token"

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}
