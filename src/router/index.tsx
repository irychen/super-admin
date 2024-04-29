import { BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import routes, { RouteConfig } from "@/router/config.tsx"
import { Fragment, ReactNode, useMemo } from "react"
import { useAppAuth } from "@/store/auth"
import NoAuth from "@/components/NoAuth"
import { routeAuthCheck } from "@/utils/auth"
import { isTokenExpired } from "fortea"

const isHash = import.meta.env.VITE_ROUTER_MODE === "hash"

const Router = isHash ? HashRouter : BrowserRouter

const createRoutes = (routes: RouteConfig[]) => {
    return routes.map(route => {
        const { children, path, component: Component } = route
        if (children) {
            return (
                <Route
                    key={path}
                    path={path}
                    element={
                        Component && (
                            <TokenCheck check={route.checkToken} path={path}>
                                <AuthCheck route={route}>
                                    <Component route={route} />
                                </AuthCheck>
                            </TokenCheck>
                        )
                    }
                >
                    {createRoutes(children)}
                </Route>
            )
        }
        return (
            <Route
                key={path}
                path={path}
                element={
                    Component && (
                        <TokenCheck check={route.checkToken} path={path}>
                            <AuthCheck route={route}>
                                <Component route={route} />
                            </AuthCheck>
                        </TokenCheck>
                    )
                }
            />
        )
    })
}

function AuthCheck(props: { children: ReactNode; route: RouteConfig }) {
    const { children, route } = props
    const { permissions } = useAppAuth()
    const ok = routeAuthCheck(route, permissions)
    if (!ok) return <NoAuth />
    return <Fragment>{children}</Fragment>
}

function TokenCheck(props: { children: ReactNode; check?: boolean; path?: string }) {
    const { children, check = true } = props
    const location = useLocation()
    const { token } = useAppAuth()

    const isLogin = useMemo(() => {
        return location.pathname?.includes("/login")
    }, [location.pathname])

    if (isLogin) {
        return <Fragment>{children}</Fragment>
    } else {
        // if (check && isTokenExpired(token)) {
        if (check && !token) {
            return <Navigate to={"/login"} />
        }
        return <Fragment>{children}</Fragment>
    }
}

const AppRouter = () => {
    return (
        <Router>
            <Routes>{createRoutes(routes)}</Routes>
        </Router>
    )
}

export default AppRouter
