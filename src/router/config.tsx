import type { ComponentType, LazyExoticComponent, ReactNode } from "react"
import { lazy } from "react"
import Children from "@/router/Children.tsx"
import NotFound from "@/components/NotFound"
import Layout from "@/layout"
import { HomeOutlined } from "@ant-design/icons"
import Login from "@/pages/login";

export type Component = ComponentType<any> | LazyExoticComponent<any> | LazyExoticComponent<() => JSX.Element>

export interface RouteConfig {
    path: string
    models?: () => Array<PromiseLike<any>>
    component: Component
    exact?: boolean // 完全匹配 has  routes 必须false
    name: string
    icon?: ReactNode
    cache?: boolean // 不填默认缓存
    noTags?: boolean
    meta?: { title: string }
    notMenu?: boolean // 不在菜单显示
    children?: Array<this>
    checkToken?: boolean // 是否需要验证token
    redirect?: string // 重定向
}

const adminRoutes: Array<RouteConfig> = [
    {
        path: "",
        name: "home",
        meta: { title: "首页" },
        cache: true,
        component: lazy(() => import("@/pages/index/index")),
        icon: <HomeOutlined />,
    },
    {
        path: "welcome",
        name: "welcome",
        component: lazy(() => import("@/pages/index/welcome")),
        meta: { title: "欢迎页" },
        icon: <HomeOutlined />,
    },
    {
        path: "system",
        name: "system",
        cache: true,
        component: lazy(() => import("@/pages/index/system")),
        meta: { title: "系统管理" },
        icon: <HomeOutlined />,
    },
    {
        path: "settings",
        name: "settings",
        meta: { title: "设置" },
        component: Children,
        icon: <HomeOutlined />,
        children: [
            {
                path: "theme",
                name: "theme",
                // alwaysShow: true,
                cache: true,
                meta: { title: "主题设置" },
                component: lazy(() => import("@/pages/index/settings/theme")),
            },
        ],
    },

]

export const routes: Array<RouteConfig> = [
    {
        path: "/404",
        component: NotFound,
        name: "404",
        meta: { title: "404" },
        checkToken: false,
    },
    {
        path: "/login",
        component: lazy(() => import("@/pages/login")),
        name: "login",
        meta: { title: "登录" },
        checkToken: false,
    },
    {
        path: "/*",
        component: Layout,
        name: "admin",
        meta: { title: "admin" },
        children: adminRoutes,
    },
]
