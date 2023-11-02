import { NonIndexRouteObject, RouteMatch, useLocation, useNavigate, useRoutes } from "react-router-dom"
import {
    Fragment,
    JSXElementConstructor,
    memo,
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined, SearchOutlined } from "@ant-design/icons"
import { isNil, reduce, last, filter, not, isEmpty } from "ramda"
import { PageConfig, usePageContext } from "@/providers/PageManageProvider"
import { SuspenseLoading } from "@/components/Loading"
import { Breadcrumb, Button, Divider, Input, Layout as ALayout, Menu, Modal, Space, Tabs } from "antd"
import type { ItemType } from "antd/lib/menu/hooks/useItems"
import KeepAlive from "keepalive-for-react"

import { RouteConfig } from "@/router/config"
import { hasAllAuth, hasAnyAuth } from "@/utils/auth.ts"
import { classNames } from "@/utils"
import { primaryColor } from "@/config"

// to prevent re-rendering when user input a new url to navigate
const MemoizedKeepAlive = memo(KeepAlive, (prev, next) => {
    return prev.activeName === next.activeName
})

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

type SearchListItemType = {
    name: string
    title: string
    path: string
    icon?: ReactNode | null
    keys: string[]
}

function getSearchMap(route: RouteConfig) {
    const searchList: SearchListItemType[] = []
    function getSearchList(routes: RouteConfig[], path?: string) {
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i]
            const thisPath = mergePath(route.path, path)
            if (route.search && isNil(route.children)) {
                const keys = route.searchKeyWords ?? []
                keys.push(route.name)
                !isNil(route.meta?.title) && keys.push(route.meta?.title as string)
                searchList.push({
                    name: route.name,
                    title: route.meta?.title ?? "",
                    path: thisPath + (route.searchParam ? "?" + route.searchParam : ""),
                    icon: route.icon,
                    keys: keys,
                })
            }
            if (!isNil(route.children)) {
                getSearchList(route.children, thisPath)
            }
        }
    }
    getSearchList(route.children || [])
    return searchList
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
    const crumbs = reduce(
        (
            crumbs: {
                name: string
                title: string
            }[],
            res,
        ) => {
            const route = res.route as RouteObjectDto
            if (route.name && route.meta?.title) {
                crumbs.push({
                    name: route.name,
                    title: route.meta?.title,
                })
            }
            return crumbs
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
        crumbs,
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
    console.log("Layout render")
    const eleRef = useRef<ReactElement<any, string | JSXElementConstructor<any>> | null>()
    const location = useLocation()
    const [showSearch, setShowSearch] = useState(false)
    const [searchKeyWord, setSearchKeyWord] = useState<string | undefined>(undefined)
    const { pages, active, open, close, getKeepAliveRef } = usePageContext()
    const keepAliveRef = getKeepAliveRef()
    const navigate = useNavigate()
    const routes = useMemo(() => {
        if (isNil(route.children)) {
            return [] as RouteObjectDto[]
        }
        return makeRouteObject(route.children)
    }, [route])

    const searchMap = useMemo(() => {
        return getSearchMap(route)
    }, [route])

    const showSearchResult = useMemo(() => {
        if (!searchKeyWord) {
            return []
        }
        return filter(item => {
            for (let i = 0; i < item.keys.length; i++) {
                const key = item.keys[i]
                if (key.includes(searchKeyWord)) {
                    return true
                }
            }
            return false
        }, searchMap)
    }, [searchKeyWord, searchMap])

    const items = useMemo(() => {
        if (isNil(route.children)) {
            return [] as ItemType[]
        }
        return renderMenuItems(route.children, open)
    }, [route, routes, open])

    // 匹配 当前路径要渲染的路由
    const ele = useRoutes(routes, location)

    const matchRouteObj = useMemo(() => {
        console.log("matchRouteObj render")
        eleRef.current = ele
        return getMatchRouteObj(ele)
    }, [routes, location])

    const routerPathKey = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])

    useEffect(() => {
        if (matchRouteObj) {
            open({
                key: routerPathKey,
                label: matchRouteObj.title,
            } as PageConfig)
        }
    }, [routerPathKey])

    const [collapsed, setCollapsed] = useState(false)

    return (
        <Fragment>
            <Modal
                title="搜索"
                open={showSearch}
                onCancel={() => {
                    setShowSearch(false)
                }}
                footer={null}
                styles={{
                    body: {
                        padding: 0,
                        paddingTop: 10,
                    },
                }}
            >
                <div className={"query-input px-[10px]"}>
                    <Input
                        allowClear
                        size={"large"}
                        value={searchKeyWord}
                        onChange={e => {
                            setSearchKeyWord(e.target.value)
                        }}
                        placeholder={"请输入关键字, 支持路由名称和路由标题"}
                    />
                </div>
                <div className={"query-result mt-[20px] max-h-[300px] overflow-y-auto"}>
                    {showSearchResult.map(item => {
                        return (
                            <Fragment key={item.path}>
                                <div
                                    key={item.path}
                                    className={classNames(
                                        "query-result-item cursor-pointer flex px-[10px] py-[8px] ",
                                        "hover:bg-[#F0F2F5] active:bg-[#F0F2F5] rounded-md",
                                        "transition duration-200 ease-in-out",
                                    )}
                                    style={{}}
                                    onClick={() => {
                                        open({
                                            key: item.path,
                                            label: item.title,
                                        } as PageConfig)
                                        setShowSearch(false)
                                    }}
                                >
                                    {item.icon && <div className={"query-result-item-icon mr-[10px]"}>{item.icon}</div>}
                                    <div className={"query-result-item-title"}>{item.title}</div>
                                </div>
                                <Divider
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                    }}
                                ></Divider>
                            </Fragment>
                        )
                    })}
                </div>
            </Modal>
            <ALayout className={"w-full h-screen"}>
                <ALayout>
                    <ALayout.Sider
                        style={{
                            overflow: "auto",
                        }}
                        collapsed={collapsed}
                        width={240}
                        theme="light"
                    >
                        <div
                            className={
                                "px-[10px] w-full whitespace-nowrap overflow-hidden text-[20px] pb-0 py-[10px] font-semibold text-center"
                            }
                            style={{
                                color: primaryColor,
                            }}
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
                            <div className={"header-left flex items-center"}>
                                <Button
                                    onClick={() => {
                                        setCollapsed(!collapsed)
                                    }}
                                    type={"link"}
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                ></Button>
                                <div className={"crumbs pb-[2px] ml-[10px]"}>
                                    <Breadcrumb items={matchRouteObj?.crumbs}></Breadcrumb>
                                </div>
                            </div>
                            <div>
                                <Space size={1}>
                                    {/*search*/}
                                    <Button
                                        type={"link"}
                                        icon={<SearchOutlined />}
                                        onClick={() => {
                                            setShowSearch(true)
                                        }}
                                    >
                                        搜索
                                    </Button>
                                    <Button
                                        type={"link"}
                                        danger
                                        icon={<PoweroffOutlined />}
                                        onClick={() => {
                                            navigate("/login")
                                        }}
                                    >
                                        退出
                                    </Button>
                                </Space>
                            </div>
                        </ALayout.Header>
                        <Tabs
                            className="app-tabs"
                            style={{
                                margin: 5,
                            }}
                            destroyInactiveTabPane
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
                                    <MemoizedKeepAlive
                                        aliveRef={keepAliveRef}
                                        cache={matchRouteObj?.cache}
                                        activeName={active}
                                        maxLen={20}
                                    >
                                        {eleRef.current}
                                    </MemoizedKeepAlive>
                                </SuspenseLoading>
                            </Fragment>
                        </ALayout.Content>
                    </ALayout>
                </ALayout>
            </ALayout>
        </Fragment>
    )
}

export default Layout
