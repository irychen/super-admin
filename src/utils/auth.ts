import { RouteConfig } from "@/router/config.tsx"
import { useAppUser } from "@/store/user.ts"
import { useEffect, useState } from "react"

export function routeAuthCheck(route: RouteConfig, permissions: string[]): boolean {
    const { authority = [], authorityType = "all" } = route
    return authCheck(authority, permissions, authorityType)
}

/**
 * @param authority 需要的权限
 * @param permissions 用户的权限
 * @param type 权限判断类型 all: 所有权限都需要通过 any: 只要有一个权限通过即可 默认为 all
 */
export function authCheck(authority: string[], permissions: string[], type?: "all" | "any"): boolean {
    type = type || "all"
    let ok = true
    if (Array.isArray(authority) && authority.length > 0) {
        if (type === "any") {
            ok = authority.some(authKey => permissions.includes(authKey))
        }
        if (type === "all") {
            ok = authority.every(authKey => permissions.includes(authKey))
        }
    }
    return ok
}

export function useAuthCheck(authority: string[], type?: "all" | "any"): boolean {
    const [ok, setOk] = useState(false)
    const { permissions } = useAppUser()
    useEffect(() => {
        setOk(authCheck(authority, permissions, type))
    }, [permissions, authority, type])
    return ok
}
