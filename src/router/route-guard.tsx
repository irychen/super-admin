import { memo, ReactNode } from "react"
import { useAuthStore } from "@/store/auth"
import { Navigate, useLocation } from "react-router-dom"
import { useTokenStore } from "@/store/token"
import { Fragment } from "react"
import { checkAuthKeys } from "@/utils/auth"
import NoAuth from "@/components/Error/NoAuth"

interface RouteGuardProps {
    children: ReactNode
    requiredAuthKeys?: string[] | string
    authKeyCheckType?: "and" | "or"
    tokenRequired?: boolean
    redirect?: string
    absolutePath?: string
}

function RouteGuard(props: RouteGuardProps) {
    const { children, requiredAuthKeys, authKeyCheckType, tokenRequired, redirect, absolutePath } = props
    const userAuthKeys = useAuthStore(state => state.keys)
    const location = useLocation()
    const getToken = useTokenStore(state => state.getToken)

    // check if the route is a redirect route
    if (redirect && absolutePath === location.pathname) {
        return <Navigate to={redirect + location.search} replace />
    }

    const isLoginPage = () => {
        return location.pathname.includes("login")
    }

    console.log(
        "\x1b[36m%s\x1b[0m",
        `[RouteGuard]  current path: ${location.pathname} config absolutePath: ${absolutePath}`,
    )

    let tokenPass = true

    // check token
    if (tokenRequired && !getToken()) {
        tokenPass = false
    }

    const authPass = checkAuthKeys(requiredAuthKeys, userAuthKeys, authKeyCheckType)

    if (!tokenPass && !isLoginPage()) {
        return <Navigate to="/login" />
    }

    if (!authPass) {
        return <NoAuth />
    }

    return <Fragment>{children}</Fragment>
}

export default memo(RouteGuard)
