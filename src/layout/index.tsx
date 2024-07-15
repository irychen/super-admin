import { Layout as ALayout, Space } from "antd"
import { Fragment, useEffect, useRef } from "react"
import PageManageProvider from "@/components/AdminPagesProvider"
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse } from "@tabler/icons-react"
import SearchMenuButton from "@/layout/components/SearchMenuButton"
import NotificationButton from "@/layout/components/NotificationButton"
import SettingsButton from "@/layout/components/SettingsButton"
import AvatarAndDropdown from "@/layout/components/AvatarAndDropdown"
import Tabs from "@/layout/components/Tabs"
import KeepAliveOutlet from "@/layout/components/KeepAliveOutlet"
import { useAppConfig } from "@/store/config.ts"
import RenderMenu from "@/layout/components/RenderMenu"
import ThemeSwitch from "@/components/ThemeSwitch"
import LanguageSelector from "@/components/LanguageSelector"
import Breadcrumbs from "@/layout/components/Breadcrumbs"
import usePageContext from "@/components/AdminPagesProvider/usePageContext"
import AdminLogo from "@/components/AdminLogo"
import { throttle } from "lodash"
import DiscordButton from "@/layout/components/DiscordButton"
import GithubButton from "@/layout/components/GithubButton"
import SideDrawerMenuButton from "@/layout/components/SideDrawerMenuButton"

function Layout() {
    const { pages, open, close, active } = usePageContext()
    const { collapsed, update, showBreadcrumb } = useAppConfig()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                update(config => {
                    config.collapsed = true
                })
            } else {
                update(config => {
                    config.collapsed = false
                })
            }
            // showBreadcrumb if screen width is greater than 768px
            if (window.innerWidth > 768) {
                update(config => {
                    config.showBreadcrumb = true
                })
            } else {
                update(config => {
                    config.showBreadcrumb = false
                })
            }
        }
        handleResize()
        const onResize = throttle(handleResize, 100)
        window.addEventListener("resize", onResize)
        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return (
        <Fragment>
            <ALayout className={"w-full h-screen"}>
                <ALayout.Sider
                    style={{
                        overflow: "auto",
                        paddingTop: "10px",
                    }}
                    className={"border-r dark:border-[#222] border-[#eee] pad:hidden"}
                    collapsed={collapsed}
                    width={260}
                    theme="light"
                >
                    <div className={"logo flex justify-center h-[30px]"}>
                        <AdminLogo colorful size={30} />
                    </div>
                    <div
                        className={
                            "px-[10px] w-full text-[--color-primary]  whitespace-nowrap overflow-hidden text-[20px] py-[10px] font-semibold text-center"
                        }
                    >
                        {collapsed ? "S" : "Super Admin"}
                    </div>
                    <div
                        className={"menu-container overflow-y-auto scrollbar"}
                        style={{
                            height: "calc(100vh - 90px)",
                        }}
                    >
                        <RenderMenu />
                    </div>
                </ALayout.Sider>
                <ALayout>
                    <div className={"body w-full h-full overflow-auto dark:bg-[#161C24] bg-white"}>
                        <header className={"h-[60px]  flex justify-between items-center px-[15px]"}>
                            <div className={"flex items-center pad:hidden"}>
                                <div
                                    className={"collapse-btn cursor-pointer text-[#637381] mr-[10px] "}
                                    onClick={() => {
                                        update(config => {
                                            config.collapsed = !config.collapsed
                                        })
                                    }}
                                >
                                    {collapsed ? (
                                        <IconLayoutSidebarRightCollapse size={20} stroke={1.2} />
                                    ) : (
                                        <IconLayoutSidebarLeftCollapse size={20} stroke={1.2} />
                                    )}
                                </div>
                                {showBreadcrumb && <Breadcrumbs />}
                            </div>
                            <div className={"side-drawer-btn pad:block hidden"}>
                                <SideDrawerMenuButton />
                            </div>
                            <div className={"flex items-center"}>
                                <Space>
                                    <LanguageSelector />
                                    <ThemeSwitch size={20} className={"text-[#637381]"} />
                                    <SearchMenuButton />
                                    <DiscordButton />
                                    <GithubButton />
                                    <NotificationButton />
                                    <SettingsButton />
                                    <AvatarAndDropdown />
                                </Space>
                            </div>
                        </header>
                        <div className={"pages-tabs h-[37px]"}>
                            <Tabs
                                active={active}
                                onChange={key => {
                                    const page = pages.find(p => p.url === key)
                                    if (page) {
                                        open(page)
                                    }
                                }}
                                onClose={key => {
                                    close(key)
                                }}
                                items={pages.map(page => {
                                    return {
                                        key: page.url,
                                        label: page.label as string,
                                    }
                                })}
                            ></Tabs>
                        </div>
                        <div
                            className={"body w-full"}
                            style={{
                                overflow: "hidden",
                                height: "calc(100vh - 97px)",
                            }}
                        >
                            <KeepAliveOutlet />
                        </div>
                    </div>
                </ALayout>
            </ALayout>
        </Fragment>
    )
}

function LayoutWrapper() {
    return (
        <PageManageProvider>
            <Layout />
        </PageManageProvider>
    )
}

export default LayoutWrapper
