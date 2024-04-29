import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import routes, { RouteConfig } from "@/router/config.tsx"

const isHash = import.meta.env.VITE_ROUTER_MODE === "hash"

const Router = isHash ? HashRouter : BrowserRouter

const createRoutes = (routes: RouteConfig[]) => {
    return routes.map(route => {
        if (route.children) {
            return (
                <Route
                    path={route.path}
                    key={route.path}
                    element={route.component && <route.component route={route} />}
                >
                    {createRoutes(route.children)}
                </Route>
            )
        }
        return (
            <Route path={route.path} key={route.path} element={route.component && <route.component route={route} />} />
        )
    })
}

const AppRouter = () => {
    return (
        <Router>
            <Routes>{createRoutes(routes)}</Routes>
        </Router>
    )
}

export default AppRouter
