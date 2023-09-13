import type { ComponentType, LazyExoticComponent, ReactNode } from "react"
import { lazy } from "react"
import Children from "@/router/Children.tsx"
import NotFound from "@/components/NotFound"
import Layout from "@/layout"

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
    authority?: string[] // 权限
    authorityType?: "all" | "any" // 权限类型 all 全部通过 any 有一个通过 默认 all
}

const adminRoutes: Array<RouteConfig> = [
    {
        path: "",
        name: "home",
        meta: { title: "首页(带缓存)" },
        cache: true,
        component: lazy(() => import("@/pages/index/index")),
        // icon: <HomeOutlined />,
    },
    {
        path: "no-cache",
        name: "no-cache",
        meta: { title: "无缓存页面" },
        component: lazy(() => import("@/pages/index/no-cache")),
    },
    {
        path: "nested-1",
        name: "nested-1",
        meta: { title: "嵌套路由1" },
        component: Children,
        children: [
            {
                path: "nested-1-1",
                name: "nested-1-1",
                meta: { title: "嵌套路由1-1" },
                component: Children,
                children: [
                    {
                        path: "nested-1-1-1",
                        name: "nested-1-1-1",
                        meta: { title: "嵌套路由1-1-1" },
                        component: lazy(() => import("@/pages/index/nested-1-1-1")),
                    },
                ],
            },
        ],
    },
    {
        path: "keep-alive",
        name: "keep-alive",
        meta: { title: "keep-alive(无Router示例)" },
        component: lazy(() => import("@/pages/index/keep-alive")),
    },
    {
        path: "*",
        redirect: "/404",
        notMenu: true,
        component: NotFound,
        meta: { title: "404" },
        name: "404",
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
