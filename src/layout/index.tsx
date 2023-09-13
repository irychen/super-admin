import { Link, NonIndexRouteObject, RouteMatch, useLocation, useNavigate, useRoutes } from "react-router-dom"
import { Fragment, JSXElementConstructor, ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { isNil, reduce, last, filter, not, isEmpty } from "ramda"
import { PageConfig, usePageContext } from "@/providers/PageManageProvider"
import { SuspenseLoading } from "@/components/Loading"
import { Button, Layout as ALayout, Menu, Tabs } from "antd"
import type { ItemType } from "antd/lib/menu/hooks/useItems"
import KeepAlive from "keepalive-for-react"

import { RouteConfig } from "@/router/config"
import { hasAllAuth, hasAnyAuth } from "@/utils/auth.ts"

function mergePath(path: string, paterPath = "") {
    path = path.startsWith("/") ? path : "/" + path
    return paterPath + path
}

function checkAuthPass(route: RouteConfig) {
    if (isNil(route.authority) || isEmpty(route.authority)) {
        return true
    }
    const type = isNil(route.authorityType) ? "all" : route.authorityType
    const authority = route.authority
    if (type === "all") {
        return hasAllAuth(authority)
    } else {
        return hasAnyAuth(authority)
    }
}

// 渲染导航栏
function renderMenuItems(data: Array<RouteConfig>, open: (info: PageConfig) => void, path?: string) {
    function renderMenu(data: Array<RouteConfig>, path?: string) {
        return reduce(
            (items, route) => {
                // 不在菜单显示
                if (route.notMenu) {
                    return items
                }
                // 权限验证 不通过不显示
                if (!checkAuthPass(route)) {
                    return items
                }
                const thisPath = mergePath(route.path, path)
                const children = filter(route => not(route.notMenu), route.children ?? [])
                const hasChildren = isNil(children) || isEmpty(children)
                items.push({
                    key: route.name,
                    title: route.meta?.title,
                    icon: route.icon,
                    label: !hasChildren ? (
                        <span className="a-black">{route.meta?.title}</span>
                    ) : (
                        <a
                            onClick={() => {
                                open({
                                    key: thisPath,
                                    label: route.meta?.title as string,
                                })
                            }}
                            className="a-black"
                        >
                            {route.meta?.title}
                        </a>
                    ),
                    children: hasChildren ? undefined : renderMenu(children, thisPath),
                })
                return items
            },
            [] as ItemType[],
            data,
        )
    }
    return renderMenu(data, path)
}

function getRouteContext(data: any): any {
    if (isNil(data.children)) {
        return null
    }
    return isNil(data.routeContext) ? getRouteContext(data.children.props) : data.routeContext
}

function getLatchRouteByEle(ele: ReactElement): RouteMatch[] | null {
    if (ele) {
        const data = getRouteContext(ele.props)
        return isNil(data?.outlet) ? (data?.matches as RouteMatch[]) : getLatchRouteByEle(data?.outlet)
    }
    return null
}

function getMatchRouteObj(ele: ReactElement | null) {
    if (isNil(ele)) {
        return null
    }
    const matchRoutes = getLatchRouteByEle(ele)
    if (isNil(matchRoutes)) {
        return null
    }
    const selectedKeys: string[] = reduce(
        (selectedKeys: string[], res) => {
            const route = res.route as RouteObjectDto
            if (route.name) {
                selectedKeys.push(route.name)
            }
            return selectedKeys
        },
        [],
        matchRoutes,
    )
    const matchRoute = last(matchRoutes)
    const data = matchRoute?.route as RouteObjectDto
    return {
        key: data.layout ? matchRoute?.pathnameBase ?? "" : matchRoute?.pathname ?? "",
        title: data?.meta?.title ?? "",
        name: data?.name ?? "",
        selectedKeys,
        cache: data.cache,
    }
}

export interface RouteObjectDto extends NonIndexRouteObject {
    name: string
    meta?: { title: string }
    cache: boolean
    layout?: boolean // 嵌套二次自定义布局
}

function makeRouteObject(routes: RouteConfig[], upperPath?: string): Array<RouteObjectDto> {
    const RouteObjectDtoList: Array<RouteObjectDto> = []
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        const fullPath = mergePath(route.path, upperPath)
        const cache = isNil(route.cache) ? false : route.cache
        // 检查权限 不通过不渲染
        if (!checkAuthPass(route)) {
            continue
        }
        const routeObjectDto: RouteObjectDto = {
            path: route.path,
            name: route.name,
            meta: route.meta,
            cache,
            element: <route.component meta={route.meta} />,
            children: isNil(route.children) ? undefined : makeRouteObject(route.children, fullPath),
        }
        RouteObjectDtoList.push(routeObjectDto)
    }
    return RouteObjectDtoList
}

interface Props {
    route: RouteConfig
}

function Layout({ route }: Props) {
    const eleRef = useRef<ReactElement<any, string | JSXElementConstructor<any>> | null>()
    const location = useLocation()
    const { pages, active, open, close, getKeepAliveRef } = usePageContext()
    const keepAliveRef = getKeepAliveRef()
    const routes = useMemo(() => {
        if (isNil(route.children)) {
            return [] as RouteObjectDto[]
        }
        return makeRouteObject(route.children)
    }, [route])

    const items = useMemo(() => {
        if (isNil(route.children)) {
            return [] as ItemType[]
        }
        return renderMenuItems(route.children, open)
    }, [route, routes, open])

    // 匹配 当前路径要渲染的路由
    const ele = useRoutes(routes, location)

    const matchRouteObj = useMemo(() => {
        eleRef.current = ele
        return getMatchRouteObj(ele)
    }, [routes, location])

    useEffect(() => {
        if (matchRouteObj) {
            open({
                key: matchRouteObj.key,
                label: matchRouteObj.title,
            } as PageConfig)
        }
    }, [])

    const [collapsed, setCollapsed] = useState(false)

    return (
        <ALayout className={"w-full h-screen"}>
            <ALayout>
                <ALayout.Sider collapsed={collapsed} width={260} theme="light">
                    <div
                        className={
                            "px-[10px] w-full whitespace-nowrap overflow-hidden text-[#1C80FF] text-[20px] pb-0 py-[10px] font-semibold text-center"
                        }
                    >
                        {collapsed ? "S" : "Super Admin"}
                    </div>
                    <Menu
                        style={{
                            padding: "10px 10px",
                        }}
                        selectedKeys={matchRouteObj?.selectedKeys}
                        defaultOpenKeys={matchRouteObj?.selectedKeys}
                        items={items}
                        mode={"inline"}
                    />
                </ALayout.Sider>
                <ALayout
                    style={{
                        background: "#F0F2F5",
                    }}
                >
                    <ALayout.Header
                        style={{
                            height: 50,
                            background: "#fff",
                            display: "flex",
                            padding: "0 10px",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        className="app-header"
                    >
                        <div className={"header-left"}>
                            <Button
                                onClick={() => {
                                    setCollapsed(!collapsed)
                                }}
                                type={"link"}
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            ></Button>
                        </div>
                    </ALayout.Header>
                    <Tabs
                        className="app-tabs"
                        style={{
                            margin: 5,
                        }}
                        size={"small"}
                        hideAdd
                        type="editable-card"
                        onChange={key => {
                            const page = pages.find(item => item.key === key)
                            if (page) {
                                open(page)
                            }
                        }}
                        onEdit={(targetKey, action) => {
                            if (action === "remove") {
                                close(targetKey as string)
                            }
                        }}
                        activeKey={active}
                        items={pages}
                    />
                    <ALayout.Content
                        className="app-content px-[5px]"
                        style={{
                            overflow: "auto",
                            paddingBottom: 5,
                        }}
                    >
                        <Fragment>
                            <SuspenseLoading>
                                <KeepAlive
                                    aliveRef={keepAliveRef}
                                    cache={matchRouteObj?.cache}
                                    activeName={active}
                                    maxLen={20}
                                >
                                    {eleRef.current}
                                </KeepAlive>
                            </SuspenseLoading>
                        </Fragment>
                    </ALayout.Content>
                </ALayout>
            </ALayout>
        </ALayout>
    )
}

export default Layout
