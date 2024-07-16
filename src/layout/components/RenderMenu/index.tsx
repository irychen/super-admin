import { useAppUser } from "@/store/user.ts"
import { ReactNode, useLayoutEffect, useMemo } from "react"
import { adminRoutes, RouteConfig } from "@/router/config.tsx"
import { isArray, mergePath } from "fortea"
import { Menu } from "antd"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSessionStorageState } from "ahooks"
import usePageContext from "@/components/AdminPagesProvider/usePageContext"

interface ItemType {
    key: string
    title: string | undefined
    icon: ReactNode
    label: ReactNode
    children?: ItemType[]
}

function RenderMenu() {
    const { t, i18n } = useTranslation()
    const { open } = usePageContext()
    const { permissions } = useAppUser()
    const [selectedKeys, setSelectedKeys] = useSessionStorageState<string[]>("_menu_selectedKeys_", {
        defaultValue: ["/"],
    })
    const [openKeys, setOpenKeys] = useSessionStorageState<string[]>("_menu_openKeys_", {
        defaultValue: [],
    })

    const location = useLocation()

    const menuKey = useMemo(() => {
        return location.pathname + location.search
    }, [location])

    useLayoutEffect(() => {
        if (!selectedKeys?.includes(menuKey)) {
            setSelectedKeys([menuKey])
        }
    }, [menuKey, setSelectedKeys, selectedKeys])

    const menuItems = useMemo(() => {
        function traverseRoutes(routes: RouteConfig[], upperPath: string) {
            const items: ItemType[] = []
            for (let i = 0; i < routes.length; i++) {
                const route = routes[i]
                const thisPath = mergePath(upperPath, route.path)
                const hasChildren = isArray(route.children) && route.children.length > 0
                const { authority, authorityType = "all" } = route
                if (isArray(authority) && authority.length > 0 && authorityType) {
                    if (authorityType === "any") {
                        const ok = authority.some(authKey => permissions.includes(authKey))
                        if (!ok) {
                            continue
                        }
                    }
                    if (authorityType === "all") {
                        const ok = authority.every(authKey => permissions.includes(authKey))
                        if (!ok) {
                            continue
                        }
                    }
                }
                const menuItem: ItemType = {
                    key: thisPath,
                    title: t(`layout.menu.${route.meta?.title}`),
                    icon: route.icon,
                    label: hasChildren ? (
                        <span className="a-black">{t(`layout.menu.${route.meta?.title}`)}</span>
                    ) : (
                        <a
                            onClick={() => {
                                console.log("open", thisPath)
                                open({
                                    label: t(`layout.menu.${route.meta?.title}`),
                                    url: thisPath,
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
                    menuItem.children = traverseRoutes(route.children, thisPath)
                }
                if (route.hideInMenu) {
                    continue
                }
                items.push(menuItem)
            }
            return items
        }

        return traverseRoutes(adminRoutes, "")
    }, [permissions, i18n.language])

    return (
        <Menu
            className={"!border-none"}
            selectedKeys={selectedKeys}
            onSelect={({ selectedKeys }) => {
                setSelectedKeys(selectedKeys)
            }}
            defaultSelectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
            openKeys={openKeys}
            onOpenChange={openKeys => {
                setOpenKeys(openKeys)
            }}
            style={{
                padding: "0px 6px",
            }}
            items={menuItems}
            mode={"inline"}
        />
    )
}

export default RenderMenu
