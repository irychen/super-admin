import { ComponentType, lazy, LazyExoticComponent, ReactElement, ReactNode } from "react"
import { IconAlertOctagonFilled, IconHomeFilled, IconLayout2Filled, IconTableFilled } from "@tabler/icons-react"
import { mergePath } from "fortea"
import Layout from "@/layout"

// import pages
import WelcomePage from "@/pages/index/welcome"
import TablePage from "@/pages/index/table"
import SuperTablePage from "@/pages/index/super_table"
import Error404 from "@/pages/index/error/404"
import Error500 from "@/pages/index/error/500"

export type Component = ComponentType<any> | LazyExoticComponent<any> | LazyExoticComponent<() => ReactElement>

export interface RouteConfig {
    // 路由路径
    path: string
    // 路由组件
    component?: Component
    // 菜单图标
    icon?: ReactNode
    // 是否缓存
    cache?: boolean
    // 路由元信息
    meta?: { title: string }
    // 不在菜单显示
    hideInMenu?: boolean
    // 子路由
    children?: Array<this>
    // 是否需要验证token 默认 true
    checkToken?: boolean
    // 重定向
    redirect?: string
    // 权限
    authority?: string[]
    // 权限类型 all 全部通过 any 有一个通过 默认 all
    authorityType?: "all" | "any"
    // 是否可以被搜索到
    search?: boolean
    // 搜索关键字 用于搜索额外匹配 默认匹配 path 和 meta.title
    searchKeyWords?: string[]
    // 绝对路径
    absolutePath?: string

    // 下级路由
    subRoutes?: Array<this>

    // breadcrumb
    breadcrumbs?: Array<this>
}

export const adminRoutes: Array<RouteConfig> = [
    // welcome
    {
        path: "/",
        meta: { title: "welcome" },
        cache: true,
        component: WelcomePage,
        checkToken: true,
        search: true,
        searchKeyWords: ["欢迎页", "welcome"],
        authority: ["admin"],
        icon: <IconHomeFilled size={18} />,
    },
    // 虚拟表格
    {
        path: "/virtual-table",
        meta: { title: "virtual_table" },
        cache: true,
        component: TablePage,
        checkToken: true,
        search: true,
        authority: ["admin"],
        icon: <IconTableFilled size={18} />,
    },
    // super table
    {
        path: "/super-table",
        meta: { title: "super_table" },
        cache: true,
        component: SuperTablePage,
        checkToken: true,
        search: true,
        authority: ["admin"],
        icon: <IconTableFilled size={18} />,
    },
    // pro table
    {
        path: "/pro-table",
        meta: { title: "pro_table" },
        cache: true,
        component: lazy(() => import("@/pages/index/pro_table")),
        checkToken: true,
        search: true,
        authority: ["admin"],
        icon: <IconTableFilled size={18} />,
    },

    // 错误页
    {
        path: "/error",
        meta: { title: "error" },
        cache: true,
        checkToken: true,
        search: true,
        authority: ["admin"],
        icon: <IconAlertOctagonFilled size={18} />,
        children: [
            {
                path: "404",
                meta: { title: "error_404" },
                cache: true,
                search: true,
                component: Error404,
                checkToken: true,
                authority: ["admin"],
            },
            {
                path: "500",
                meta: { title: "error_500" },
                cache: true,
                search: true,
                component: Error500,
                checkToken: true,
                authority: ["admin"],
            },
        ],
    },

    // 嵌套
    {
        path: "/nested",
        meta: { title: "nested" },
        checkToken: true,
        authority: ["admin"],
        icon: <IconLayout2Filled size={18} />,
        children: [
            {
                path: "menu1",
                meta: { title: "nested_menu1" },
                cache: true,
                search: true,
                component: lazy(() => import("@/pages/index/nested/menu1")),
                checkToken: true,
                authority: ["admin"],
            },
            {
                path: "menu2",
                meta: { title: "nested_menu2" },
                cache: true,
                checkToken: true,
                component: lazy(() => import("@/pages/index/nested/menu2/layout")),
                authority: ["admin"],
                children: [
                    {
                        path: "menu2-1",
                        meta: { title: "nested_menu2_1" },
                        cache: false,
                        search: true,
                        component: lazy(() => import("@/pages/index/nested/menu2/menu2-1")),
                        checkToken: true,
                        authority: ["admin"],
                    },
                    {
                        path: "menu2-2",
                        meta: { title: "nested_menu2_2" },
                        component: lazy(() => import("@/pages/index/nested/menu2/menu2-2")),
                        checkToken: true,
                        search: true,
                        authority: ["admin"],
                    },
                ],
            },
        ],
    },
]

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

export const adminRoutesWithAbsolutePath = traverseRoutes(adminRoutes, "", [])

export const findAdminRouteByUrl = (url: string) => {
    function find(routes: Array<RouteConfig>): RouteConfig | undefined {
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
        checkToken: false,
        component: lazy(() => import("@/pages/login")),
    },
    // signup
    {
        path: "/signup",
        checkToken: false,
        component: lazy(() => import("@/pages/signup")),
    },
    // about
    {
        path: "/about",
        checkToken: false,
        component: lazy(() => import("@/pages/about")),
    },
    // 404
    {
        path: "/*",
        checkToken: false,
        component: lazy(() => import("@/pages/404")),
    },
]

export default routes
