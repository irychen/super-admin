import { RouteConfig } from "@/router"
import { adminRoutes } from "@/router/config"
import { useAuthStore } from "@/store/auth"
import { useSettingsStore } from "@/store/settings"
import { openTabPage } from "@/store/tabs"
import { checkAuthKeys } from "@/utils/auth"
import { Menu } from "antd"
import { isArray } from "fortea"
import { memo, ReactNode, useLayoutEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

interface ItemType {
    key: string
    title: string | undefined
    icon: ReactNode
    label: ReactNode
    children?: ItemType[]
}

function SiderMenu() {
    const { t, i18n } = useTranslation()
    const userAuthKeys = useAuthStore(state => state.keys)
    const location = useLocation()

    const siderMenuSelectedKeys = useSettingsStore(state => state.siderMenuSelectedKeys)
    const siderMenuOpenKeys = useSettingsStore(state => state.siderMenuOpenKeys)
    const setSiderMenuSelectedKeys = useSettingsStore(state => state.setSiderMenuSelectedKeys)
    const setSiderMenuOpenKeys = useSettingsStore(state => state.setSiderMenuOpenKeys)

    const menuKey = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])

    useLayoutEffect(() => {
        if (!siderMenuSelectedKeys?.includes(menuKey)) {
            setSiderMenuSelectedKeys([menuKey])
        }
    }, [menuKey, setSiderMenuSelectedKeys, siderMenuSelectedKeys])

    const menuItems = useMemo(() => {
        function traverseRoutes(routes: RouteConfig[]) {
            const items: ItemType[] = []
            for (let i = 0; i < routes.length; i++) {
                const route = routes[i]
                const hasChildren = isArray(route.children) && route.children.length > 0
                const { authKeyCheckType, authKeys } = route
                const authPass = checkAuthKeys(authKeys, userAuthKeys, authKeyCheckType)
                if (!authPass) continue

                const menuItem: ItemType = {
                    key: route.absolutePath || "",
                    title: t(`layout.menu.${route.meta?.title}`),
                    icon: route.icon,
                    label: hasChildren ? (
                        <span className="a-black">{t(`layout.menu.${route.meta?.title}`)}</span>
                    ) : (
                        <a
                            onClick={() => {
                                console.log("open", route.absolutePath)
                                openTabPage({
                                    url: route.absolutePath || "",
                                    title: route.meta?.title as string,
                                })
                            }}
                            className="a-black select-none"
                            style={{
                                transition:
                                    "font-size 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.1s",
                            }}
                        >
                            {t(`layout.menu.${route.meta?.title}`)}
                        </a>
                    ),
                }
                if (route.children && menuItem) {
                    menuItem.children = traverseRoutes(route.children)
                }
                if (route.hideInMenu) {
                    continue
                }
                items.push(menuItem)
            }
            return items
        }

        return traverseRoutes(adminRoutes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAuthKeys, i18n.language])

    return (
        <Menu
            className={"!border-none"}
            selectedKeys={siderMenuSelectedKeys}
            onSelect={({ selectedKeys }) => {
                setSiderMenuSelectedKeys(selectedKeys)
            }}
            defaultSelectedKeys={siderMenuSelectedKeys}
            defaultOpenKeys={siderMenuOpenKeys}
            openKeys={siderMenuOpenKeys}
            onOpenChange={openKeys => {
                setSiderMenuOpenKeys(openKeys)
            }}
            style={{
                padding: "0px 6px",
            }}
            items={menuItems}
            mode={"inline"}
        />
    )
}

export default memo(SiderMenu)
