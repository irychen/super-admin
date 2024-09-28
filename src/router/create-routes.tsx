import { Route } from "react-router-dom"
import { RouteConfig } from "@/router"
import RouteGuard from "@/router/route-guard"
import DefaultOutlet from "@/router/default-outlet"

const createRoutes = (routes: RouteConfig[]) => {
    return routes.map(route => {
        const {
            children,
            path,
            component: Component,
            authKeys,
            authKeyCheckType,
            tokenRequired,
            redirect,
            absolutePath,
        } = route
        if (children && children.length > 0) {
            const Component = route.component || DefaultOutlet
            return (
                <Route
                    key={path}
                    path={path}
                    element={
                        <RouteGuard
                            requiredAuthKeys={authKeys}
                            authKeyCheckType={authKeyCheckType}
                            tokenRequired={tokenRequired}
                            redirect={redirect}
                            absolutePath={absolutePath}
                        >
                            <Component />
                        </RouteGuard>
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
                        <RouteGuard
                            requiredAuthKeys={authKeys}
                            authKeyCheckType={authKeyCheckType}
                            tokenRequired={tokenRequired}
                            redirect={redirect}
                            absolutePath={absolutePath}
                        >
                            <Component />
                        </RouteGuard>
                    )
                }
            />
        )
    })
}

export default createRoutes
