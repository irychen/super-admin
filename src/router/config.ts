
import type { ComponentType, LazyExoticComponent } from 'react'
export type Component = ComponentType<any> | LazyExoticComponent<any>
export interface RouteConfig {
    path: string
    models?: () => Array<PromiseLike<any>>
    component: Component
    exact?: boolean // 完全匹配 has  routes 必须false
    name: string
    icon?: Component
    noCache?: boolean // 不填默认缓存
    cache?: boolean // 不填默认缓存
    noTags?: boolean
    meta?: { title: string }
    alwaysShow?: boolean // 是否显示在导航栏 true 不显示 默认false
    children?: Array<this>
    notLogin?: boolean // 是否需要登录  默认需要登录 不需要登录设置为true
    redirect?: string // 重定向
}