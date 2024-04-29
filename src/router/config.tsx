import { ComponentType, lazy, LazyExoticComponent, ReactElement, ReactNode } from "react"
import Layout from "@/layout"

export type Component = ComponentType<any> | LazyExoticComponent<any> | LazyExoticComponent<() => ReactElement>

export interface RouteConfig {
    path: string // 路由路径
    component?: Component // 路由组件
    icon?: ReactNode // 菜单图标
    cache?: boolean // 是否缓存
    meta?: { title: string } // 路由元信息
    hideInMenu?: boolean // 不在菜单显示
    children?: Array<this> // 子路由
    checkToken?: boolean // 是否需要验证token
    redirect?: string // 重定向
    authority?: string[] // 权限
    authorityType?: "all" | "any" // 权限类型 all 全部通过 any 有一个通过 默认 all
    search?: boolean // 是否可以被搜索到
    searchKeyWords?: string[] // 搜索关键字 用于搜索额外匹配 默认匹配 name 和 meta.title
    absolutePath?: string // 绝对路径
}

import { IconAlertOctagonFilled, IconHomeFilled, IconLayout2Filled, IconTableFilled } from "@tabler/icons-react"
import { mergePath } from "fortea"

export const adminRoutes: Array<RouteConfig> = [
    // welcome
    {
        path: "/",
        meta: { title: "欢迎页" },
        cache: true,
        component: lazy(() => import("@/pages/index/welcome")),
        checkToken: true,
        authority: ["admin", "welcome"],
        icon: <IconHomeFilled size={18} />,
    },
    // table
    {
        path: "/table",
        meta: { title: "表格" },
        cache: true,
        component: lazy(() => import("@/pages/index/table")),
        checkToken: true,
        authority: ["admin", "table"],
        icon: <IconTableFilled size={18} />,
    },
    // 错误页
    {
        path: "/error",
        meta: { title: "错误页" },
        cache: true,
        checkToken: true,
        authority: ["admin", "error"],
        icon: <IconAlertOctagonFilled size={18} />,
        children: [
            {
                path: "404",
                meta: { title: "404" },
                cache: true,
                component: lazy(() => import("@/pages/index/error/404")),
                checkToken: true,
                authority: ["admin", "error"],
            },
            {
                path: "500",
                meta: { title: "500" },
                cache: true,
                component: lazy(() => import("@/pages/index/error/500")),
                checkToken: true,
                authority: ["admin", "error"],
            },
        ],
    },

    // 嵌套
    {
        path: "/nested",
        meta: { title: "嵌套" },
        checkToken: true,
        authority: ["admin", "nested"],
        icon: <IconLayout2Filled size={18} />,
        children: [
            {
                path: "menu1",
                meta: { title: "菜单1" },
                cache: true,
                component: lazy(() => import("@/pages/index/nested/menu1")),
                checkToken: true,
                authority: ["admin", "nested"],
            },
            {
                path: "menu2",
                meta: { title: "菜单2" },
                cache: true,
                checkToken: true,
                component: lazy(() => import("@/pages/index/nested/menu2/layout")),
                authority: ["admin", "nested"],
                children: [
                    {
                        path: "menu2-1",
                        meta: { title: "菜单2-1" },
                        cache: true,
                        component: lazy(() => import("@/pages/index/nested/menu2/menu2-1")),
                        checkToken: true,
                        authority: ["admin", "nested"],
                    },
                    {
                        path: "menu2-2",
                        meta: { title: "菜单2-2" },
                        cache: true,
                        component: lazy(() => import("@/pages/index/nested/menu2/menu2-2")),
                        checkToken: true,
                        authority: ["admin", "nested"],
                    },
                ],
            },
        ],
    },
]

const traverseRoutes = (routes: Array<RouteConfig>, upperPath: string) => {
    const items: RouteConfig[] = []
    routes.map(route => {
        const thisPath = mergePath(upperPath, route.path)
        route.absolutePath = thisPath
        if (route.children && route.children.length > 0) {
            route.children = traverseRoutes(route.children, thisPath)
        }
        items.push(route)
    })
    return items
}

export const adminRoutesWithAbsolutePath = traverseRoutes(adminRoutes, "")

export const findAdminRouteByUrl = (url: string) => {
    function find(routes: Array<RouteConfig>) : RouteConfig | undefined {
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i]
            if (route.absolutePath === url) {
                return route
            }
            if (route.children && route.children.length > 0) {
                const res = find(route.children)
                if (res) {
                    return res
                }
            }
        }
    }
    return find(adminRoutesWithAbsolutePath)
}

const routes: Array<RouteConfig> = [
    {
        path: "/",
        component: Layout,
        children: adminRoutes,
    },
    // login
    {
        path: "/login",
        component: lazy(() => import("@/pages/login")),
    },
    // signup
    {
        path: "/signup",
        component: lazy(() => import("@/pages/signup")),
    },
    // about
    {
        path: "/about",
        component: lazy(() => import("@/pages/about")),
    },
    // 404
    {
        path: "/*",
        component: lazy(() => import("@/pages/404")),
    },
]

export default routes
