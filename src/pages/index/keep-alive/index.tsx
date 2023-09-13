import { Button, Card, Input, Space, Tabs } from "antd"
import { useMemo, useState } from "react"
import KeepAlive, { useOnActive } from "keepalive-for-react"
import { usePageContext } from "@/providers/PageManageProvider"

function KeepAliveDemo() {
    const [activeName, setActiveName] = useState("TabA")
    const showTabs = [
        {
            name: "TabA",
            component: TabA,
            cache: true,
        },
        {
            name: "TabB",
            component: TabB,
            cache: false,
        },
    ]
    const currentTab = useMemo(() => {
        return showTabs.find(item => item.name === activeName)!
    }, [activeName])

    const { closeCurrent } = usePageContext()

    return (
        <Card title={"KeepAliveDemo (无Router示例)"}>
            <Tabs
                activeKey={activeName}
                onChange={activeKey => {
                    setActiveName(activeKey)
                }}
                items={showTabs.map(item => {
                    return {
                        label: item.name,
                        key: item.name,
                    }
                })}
            ></Tabs>
            <KeepAlive activeName={activeName} cache={currentTab.cache}>
                {<currentTab.component />}
            </KeepAlive>

            <Space className={"mt-[100px]"}>
                <Button
                    type={"primary"}
                    ghost
                    onClick={() => {
                        closeCurrent()
                    }}
                >
                    关闭
                </Button>
            </Space>
        </Card>
    )
}

function TabA() {
    const domRef = useOnActive(() => {
        console.log("TabA onActive") // this will be trigger when tabA is active
    })
    return (
        <div ref={domRef}>
            <h1 className={"py-[15px] font-bold"}>TabA cached</h1>
            <Input placeholder="输入一个值 然后切换tab组件不会被销毁"></Input>
        </div>
    )
}

function TabB() {
    const domRef = useOnActive(() => {
        console.log("TabB onActive") // no cache won't trigger onActive
    })
    return (
        <div ref={domRef}>
            <h1 className={"py-[15px] font-bold"}>TabB nocache</h1>
            <Input placeholder="输入一个值 然后切换tab组件会被销毁"></Input>
        </div>
    )
}

export default KeepAliveDemo
