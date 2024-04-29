import { useAppAuth } from "@/store/auth.ts"
import { ReactNode, useEffect, useLayoutEffect, useMemo } from "react"
import { adminRoutes, RouteConfig } from "@/router/config.tsx"
import { isArray, mergePath } from "fortea"
import { Menu } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import useSessionStorageState from "@/hooks/useSessionStorageState.ts"
import { usePageContext } from "@/components/AdminPagesProvider"

interface ItemType {
    key: string
    title: string | undefined
    icon: ReactNode
    label: ReactNode
    children?: ItemType[]
}

function RenderMenu() {
    const { open } = usePageContext()
    const { permissions } = useAppAuth()
    const [selectedKeys, setSelectedKeys] = useSessionStorageState<string[]>("_menu_selectedKeys_", ["/"])
    const [openKeys, setOpenKeys] = useSessionStorageState<string[]>("_menu_openKeys_", ["/"])

    const location = useLocation()

    const menuKey = useMemo(() => {
        return location.pathname + location.search
    }, [location])

    useEffect(() => {
        if (!selectedKeys.includes(menuKey)) {
            setSelectedKeys([menuKey])
        }
    }, [menuKey, setSelectedKeys, selectedKeys])

    const menuItems = useMemo(() => {
        function traverseRoutes(routes: RouteConfig[], upperPath: string) {
            const items: ItemType[] = []
            routes.map(route => {
                const thisPath = mergePath(upperPath, route.path)
                const hasChildren = isArray(route.children) && route.children.length > 0
                const menuItem: ItemType = {
                    key: thisPath,
                    title: route.meta?.title,
                    icon: route.icon,
                    label: hasChildren ? (
                        <span className="a-black">{route.meta?.title}</span>
                    ) : (
                        <a
                            onClick={() => {
                                console.log("open", thisPath)
                                open({
                                    label: route.meta?.title as string,
                                    url: thisPath,
                                })
                            }}
                            className="a-black select-none"
                            style={{
                                transition:
                                    "font-size 0.2s cubic-bezier(0.215, 0.61, 0.355, 1), margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.1s",
                            }}
                        >
                            {route.meta?.title}
                        </a>
                    ),
                }
                if (route.children && menuItem) {
                    menuItem.children = traverseRoutes(route.children, thisPath)
                }
                items.push(menuItem)
                return items
            })
            return items
        }

        return traverseRoutes(adminRoutes, "")
    }, [permissions])

    return (
        <div>
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
                    padding: "10px 10px",
                }}
                items={menuItems}
                mode={"inline"}
            />
        </div>
    )
}

export default RenderMenu
