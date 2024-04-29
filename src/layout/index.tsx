import KeepAliveOutlet from "@/layout/components/KeepAliveOutlet"
import { Layout as ALayout } from "antd"
import { Fragment, useState } from "react"
import RenderMenu from "@/layout/components/RenderMenu"
import ThemeSwitch from "@/components/ThemeSwitch"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import PageManageProvider, { usePageContext } from "@/components/AdminPagesProvider"
import Tabs from "@/layout/components/Tabs"
import AdminLogo from "@/components/AdminLogo"

function Layout() {
    const [collapsed, setCollapsed] = useState(false)
    const { pages, open, close, active } = usePageContext()

    return (
        <Fragment>
            <ALayout className={"w-full h-screen"}>
                <ALayout.Sider
                    style={{
                        overflow: "auto",
                        paddingTop: "10px",
                    }}
                    className={"border-r dark:border-[#222] border-[#eee]"}
                    collapsed={collapsed}
                    width={280}
                    theme="light"
                >
                    {/*<div className={"logo flex justify-center h-[30px]"}>*/}
                    {/*    <AdminLogo height={30} width={40} />*/}
                    {/*</div>*/}
                    <div
                        className={
                            "px-[10px] w-full text-[--color-primary]  whitespace-nowrap overflow-hidden pt-[5px] text-[20px] pb-0 py-[10px] font-semibold text-center"
                        }
                    >
                        {collapsed ? "S" : "Super Admin"}
                    </div>
                    <RenderMenu />
                </ALayout.Sider>
                <ALayout>
                    <div className={"body w-full h-full overflow-auto dark:bg-[#161C24] bg-white"}>
                        <header className={"h-[60px] flex justify-between items-center px-[15px]"}>
                            <div className={"flex items-center"}>
                                <div
                                    className={"cursor-pointer"}
                                    onClick={() => {
                                        setCollapsed(!collapsed)
                                    }}
                                >
                                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                </div>
                            </div>
                            <div className={"flex items-center"}>
                                <ThemeSwitch />
                            </div>
                        </header>
                        <div className={"pages-tabs h-[36px]"}>
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
                                        label: page.label,
                                    }
                                })}
                            ></Tabs>
                        </div>
                        <main
                            className={"body"}
                            style={{
                                overflow: "auto",
                                height: "calc(100vh - 96px)",
                            }}
                        >
                            <KeepAliveOutlet />
                        </main>
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
