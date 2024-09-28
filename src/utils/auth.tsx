import { useAuthStore } from "@/store/auth"
import { isNil, isString } from "fortea"
import { Fragment, ReactNode } from "react"

export const defaultAuthKeyCheckType = "or"

/**
 * check if the user has the required auth keys
 * @param required auth keys
 * @param type auth key check type, "and" or "or" (default defaultAuthKeyCheckType)
 * @returns if the user has the required auth keys
 */
export function useAuth(required?: Array<string> | string, type?: "and" | "or") {
    const keys = useAuthStore(state => state.keys)
    return checkAuthKeys(required, keys, type)
}

/**
 * check if the user has the required auth keys
 * @param required required auth keys
 * @param keys auth keys that the user has
 * @param type auth key check type, "and" or "or" (default defaultAuthKeyCheckType)
 * @returns if the user has the required auth keys
 */
export function checkAuthKeys(
    required?: Array<string> | string,
    keys: Array<string> = [],
    type: "and" | "or" = defaultAuthKeyCheckType,
) {
    if (isNil(required)) return true
    required = isString(required) ? [required] : required
    return type === "and" ? required.every(key => keys.includes(key)) : required.some(key => keys.includes(key))
}

interface AuthCheckProps {
    required?: Array<string> | string
    type?: "and" | "or"
    fallback?: ReactNode
    children?: ReactNode
}

/**
 * check if the user has the required auth keys
 * @param required auth keys
 * @param type auth key check type, "and" or "or" (default defaultAuthKeyCheckType)
 * @returns if the user has the required auth keys and render the children, otherwise render the fallback
 */
export function AuthCheck({ required, type, fallback, children }: AuthCheckProps) {
    const ok = useAuth(required, type)
    return <Fragment>{ok ? children : fallback}</Fragment>
}
