import { Route } from "react-router-dom"
import { RouteConfig } from "@/router"
import RouteAuthGuard from "@/router/route-auth-guard"
import DefaultOutlet from "@/router/default-outlet"

const createRoutes = (routes: RouteConfig[]) => {
    return routes.map(route => {
        const { children, path, component: Component } = route
        if (children) {
            const Component = route.component || DefaultOutlet
            return (
                <Route
                    key={path}
                    path={path}
                    element={
                        <RouteAuthGuard config={route}>
                            <Component />
                        </RouteAuthGuard>
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
                        <RouteAuthGuard config={route}>
                            <Component />
                        </RouteAuthGuard>
                    )
                }
            />
        )
    })
}

export default createRoutes
