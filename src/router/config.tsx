import type { ComponentType, LazyExoticComponent, ReactNode } from "react"
import { lazy, ReactElement } from "react"
import Children from "@/components/Children"
import NotFound from "@/components/NotFound"
import Layout from "@/layout"
import {
    ApartmentOutlined,
    BarChartOutlined,
    ClearOutlined,
    FileTextOutlined,
    HomeOutlined,
    LoadingOutlined,
    PlaySquareOutlined,
    SoundOutlined,
    TableOutlined,
} from "@ant-design/icons"

export type Component = ComponentType<any> | LazyExoticComponent<any> | LazyExoticComponent<() => ReactElement>

export interface RouteConfig {
    path: string // 路由路径
    component: Component // 路由组件
    name: string // 唯一key
    icon?: ReactNode // 菜单图标
    cache?: boolean // 不填默认缓存
    meta?: { title: string } // 路由元信息
    notMenu?: boolean // 不在菜单显示
    children?: Array<this> // 子路由
    checkToken?: boolean // 是否需要验证token
    redirect?: string // 重定向
    authority?: string[] // 权限
    authorityType?: "all" | "any" // 权限类型 all 全部通过 any 有一个通过 默认 all
    search?: boolean // 是否可以被搜索到
    searchParam?: string // 用于搜索跳转携带的参数 例如 type=search 会跳转到 /xxx?type=search
    searchKeyWords?: string[] // 搜索关键字 用于搜索额外匹配 默认匹配 name 和 meta.title
}

import Home from "@/pages/admin"

const adminRoutes: Array<RouteConfig> = [
    {
        path: "",
        name: "home",
        meta: { title: "首页(带缓存)" },
        search: true,
        cache: true,
        component: lazy(() => import("@/pages/admin")),
        icon: <HomeOutlined />,
        searchKeyWords: ["首页"],
    },
    {
        path: "no-cache",
        name: "no-cache",
        search: true,
        meta: { title: "无缓存页面" },
        component: lazy(() => import("@/pages/admin/no-cache")),
        icon: <ClearOutlined />,
    },
    {
        path: "nested-1",
        name: "nested-1",
        meta: { title: "嵌套路由1" },
        component: Children,
        icon: <ApartmentOutlined />,
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
                        search: true,
                        component: lazy(() => import("@/pages/admin/nested-1-1-1")),
                    },
                ],
            },
        ],
    },
    {
        path: "pro-table",
        name: "pro-table",
        cache: true,
        meta: { title: "Pro Table 表格" },
        search: true,
        component: lazy(() => import("@/pages/admin/pro-table")),
        icon: <TableOutlined />,
    },
    {
        path: "keep-alive",
        name: "keep-alive",
        meta: { title: "keep-alive(无Router示例)" },
        search: true,
        icon: <PlaySquareOutlined />,
        component: lazy(() => import("@/pages/admin/keep-alive")),
        searchParam: "type=search",
    },
    {
        path: "rich-editor",
        name: "rich-editor",
        meta: { title: "富文本编辑器" },
        search: true,
        icon: <FileTextOutlined />,
        component: lazy(() => import("@/pages/admin/rich-editor")),
    },
    {
        path: "oh-err",
        name: "oh-err",
        meta: { title: "页面错误" },
        search: true,
        icon: <SoundOutlined />,
        component: lazy(() => import("@/pages/admin/oh-err")),
    },
    {
        path: "loading",
        name: "loading",
        meta: { title: "全局loading" },
        icon: <LoadingOutlined />,
        search: true,
        cache: true,
        component: lazy(() => import("@/pages/admin/loading")),
    },
    {
        path: "debt",
        component: lazy(() => import("@/pages/debt")),
        name: "debt",
        icon: <BarChartOutlined />,
        search: true,
        cache: true,
        meta: { title: "房贷计算器" },
    },
    {
        path: "-404",
        meta: { title: "404" },
        name: "404",
        component: lazy(() => import("@/pages/admin/404")),
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
    },
    {
        path: "/login",
        component: lazy(() => import("@/pages/login")),
        name: "login",
        meta: { title: "登录" },
    },
    {
        path: "/about",
        component: lazy(() => import("@/pages/about")),
        name: "about",
        meta: { title: "关于" },
    },
    {
        path: "/*",
        component: Layout,
        name: "admin",
        meta: { title: "admin" },
        children: adminRoutes,
    },
]
