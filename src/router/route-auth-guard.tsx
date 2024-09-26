import { ReactNode } from "react"
import { RouteConfig } from "@/router"
import { useAuthStore } from "@/store/auth"
import { Navigate, useLocation } from "react-router-dom"
import { useTokenStore } from "@/store/token"
import checkAuthKeys from "./checkAuthKeys"
import { Fragment } from "react"

interface RouteAuthGuardProps {
    children: ReactNode
    config: RouteConfig
}

function RouteAuthGuard(props: RouteAuthGuardProps) {
    const { children, config } = props
    const { authKeys: requiredAuthKeys, authKeyCheckType, tokenRequired } = config
    const location = useLocation()
    const authKeys = useAuthStore(state => state.keys)
    const getToken = useTokenStore(state => state.getToken)

    // check if the route is a redirect route
    if (config.redirect && config.absolutePath === location.pathname) {
        return <Navigate to={config.redirect + location.search} />
    }

    const isLoginPage = () => {
        return location.pathname.includes("login")
    }

    console.log("\x1b[36m%s\x1b[0m", `[RouteAuthGuard]: ${location.pathname} config path: ${config.absolutePath}`)

    let tokenPass = true

    // check token
    if (tokenRequired && !getToken()) {
        tokenPass = false
    }

    let authKeysPass = true

    // check auth keys
    if (Array.isArray(requiredAuthKeys) && requiredAuthKeys.length > 0) {
        authKeysPass = checkAuthKeys(requiredAuthKeys, authKeys, authKeyCheckType)
    }

    if (!tokenPass && !isLoginPage()) {
        return <Navigate to="/login" />
    }

    if (!authKeysPass) {
        return <Navigate to="/403" />
    }

    return <Fragment>{children}</Fragment>
}

export default RouteAuthGuard
