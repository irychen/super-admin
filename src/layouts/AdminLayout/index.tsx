import { Layout as ALayout } from "antd"
import { useSettingsStore } from "@/store/settings"
import AdminLogo from "@/components/AdminLogo"
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse } from "@tabler/icons-react"
import Breadcrumbs from "./components/Breadcrumbs"
import KeepAliveArea from "./components/KeepAliveArea"
import SiderMenu from "./components/SiderMenu"
import Tabs from "./components/Tabs"
import SideDrawerMenuButton from "./components/SideDrawerMenuButton"
import { memo } from "react"
import { useAntdThemeToken } from "@/hooks"
import HeaderControllers from "./components/HeaderControllers"

function AdminLayout() {
    const menuCollapsed = useSettingsStore(state => state.menuCollapsed)
    const showBreadcrumb = useSettingsStore(state => state.showBreadcrumb)
    const multiTabs = useSettingsStore(state => state.multiTabs)
    return (
        <ALayout className={"w-full h-screen"}>
            <ALayout.Sider
                style={{
                    overflow: "auto",
                    paddingTop: "10px",
                }}
                className={"border-r dark:border-[#222] border-[#eee] pad:hidden"}
                collapsed={menuCollapsed}
                width={260}
                theme="light"
            >
                <div className={"logo flex justify-center h-[30px]"}>
                    <AdminLogo colorful size={30} />
                </div>
                <AdminTitle />
                <div
                    className={"menu-container overflow-y-auto scrollbar"}
                    style={{
                        height: "calc(100vh - 90px)",
                    }}
                >
                    <SiderMenu />
                </div>
            </ALayout.Sider>
            <ALayout>
                <div className={"body w-full h-full overflow-auto dark:bg-[#161C24] bg-white"}>
                    <header className={"h-[60px]  flex justify-between items-center px-[15px]"}>
                        <div className={"flex items-center pad:hidden"}>
                            <AdminSiderMenuCollapseButton />
                            {showBreadcrumb && <Breadcrumbs />}
                        </div>
                        <div className={"side-drawer-btn pad:block hidden"}>{<SideDrawerMenuButton />}</div>
                        <HeaderControllers />
                    </header>
                    {multiTabs && (
                        <div className={"pages-tabs h-[37px] bg-[#fff]  dark:bg-[#161C24]  "}>
                            <Tabs />
                        </div>
                    )}
                    <div
                        className={"body w-full bg-[#fff]  dark:bg-[#161C24] "}
                        style={{
                            overflow: "hidden",
                            height: multiTabs ? "calc(100vh - 97px)" : "calc(100vh - 60px)",
                        }}
                    >
                        <KeepAliveArea />
                    </div>
                </div>
            </ALayout>
        </ALayout>
    )
}

function AdminTitle() {
    const menuCollapsed = useSettingsStore(state => state.menuCollapsed)
    const { colorPrimary } = useAntdThemeToken()
    return (
        <div
            style={{
                color: colorPrimary,
            }}
            className={
                "px-[10px] w-full  whitespace-nowrap overflow-hidden text-[20px] py-[10px] font-semibold text-center"
            }
        >
            {menuCollapsed ? "S" : "Super Admin"}
        </div>
    )
}

function AdminSiderMenuCollapseButton() {
    const menuCollapsed = useSettingsStore(state => state.menuCollapsed)
    const setMenuCollapsed = useSettingsStore(state => state.setMenuCollapsed)
    return (
        <div
            className={"collapse-btn cursor-pointer text-[#637381] mr-[10px] "}
            onClick={() => {
                setMenuCollapsed(!menuCollapsed)
            }}
        >
            {menuCollapsed ? (
                <IconLayoutSidebarRightCollapse size={20} stroke={1.2} />
            ) : (
                <IconLayoutSidebarLeftCollapse size={20} stroke={1.2} />
            )}
        </div>
    )
}

export default memo(AdminLayout)
