import { ComponentType, LazyExoticComponent, ReactElement, ReactNode } from "react"
import { Routes } from "react-router-dom"
import createRoutes from "./create-routes"
import routes, { ADMIN_PATH, adminRoutes } from "./config"
import PageType from "./page-type"
import { mergePath } from "fortea"

export type Component =
    | ComponentType<unknown>
    | LazyExoticComponent<ComponentType<unknown>>
    | LazyExoticComponent<() => ReactElement>

export interface BaseRouterConfig {
    path: string
    // if component is not set, the route will be treated as a default outlet
    component?: Component
    children?: Array<BaseRouterConfig> | Array<CacheRouterConfig> | Array<PageRouterConfig>
    meta?: Record<string, unknown>
    authKeys?: Array<string> | string
    authKeyCheckType?: "and" | "or"
    tokenRequired?: boolean
    redirect?: string
}

export interface CacheRouterConfig extends BaseRouterConfig {
    children?: Array<CacheRouterConfig>
}

export interface PageRouterConfig extends CacheRouterConfig {
    children?: Array<PageRouterConfig>
    icon?: ReactNode
    hideInMenu?: boolean
    menuName?: string
    types?: Array<PageType>
    search?: boolean // wether to be searchable
    searchKeys?: Array<string> // the keys to be used for searching
}

export interface RouteConfig extends PageRouterConfig {
    absolutePath?: string
    breadcrumbs?: Array<RouteConfig>
    subRoutes?: Array<RouteConfig>
    children?: Array<RouteConfig>
}

const traverseRoutes = (
    routes: Array<RouteConfig>,
    upperPath: string,
    breadcrumbs: Array<RouteConfig> = [],
    subRoutes: Array<RouteConfig> = [],
): Array<RouteConfig> => {
    const items: RouteConfig[] = []
    routes.map(route => {
        const thisPath = mergePath(upperPath, route.path)
        route.absolutePath = thisPath
        route.subRoutes = []
        const newBreadcrumbs = [...breadcrumbs, route]
        route.breadcrumbs = newBreadcrumbs
        if (route.children && route.children.length > 0) {
            route.children = traverseRoutes(route.children, thisPath, [...newBreadcrumbs], route.subRoutes)
        } else {
            subRoutes.push(route)
        }
        items.push(route)
    })
    return items
}

export const formedAdminRoutes = traverseRoutes(adminRoutes, ADMIN_PATH)

export const formedRoutes = traverseRoutes(routes, "")

export const findRouteByAbsolutePath = (absolutePath: string) => {
    function find(routes: Array<RouteConfig>): RouteConfig | undefined {
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i]
            if (route.absolutePath === absolutePath) {
                return route
            }
            if (route.children && route.children.length > 0) {
                const targetRoute = find(route.children)
                if (targetRoute) {
                    return targetRoute
                }
            }
        }
    }
    return find(formedRoutes)
}

function AppRoutes() {
    return <Routes>{createRoutes(formedRoutes)}</Routes>
}

export default AppRoutes
