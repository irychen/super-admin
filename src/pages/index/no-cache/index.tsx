import { Button, Card, Input, Space } from "antd"
import { usePageContext } from "@/providers/PageManageProvider"
import { useEffect } from "react"

function NoCache() {
    const { closeCurrent } = usePageContext()

    useEffect(() => {
        console.log("NoCache mount")
        return () => {
            console.log("NoCache unmount")
        }
    }, [])

    return (
        <Card className={"h-full"} title={"NoCache 无缓存"} bordered={false}>
            <Input placeholder="输入一个值 然后切换tab组件会被销毁"></Input>

            <Space
                className={"mt-[100px]"}
                onClick={() => {
                    closeCurrent()
                }}
            >
                <Button type={"primary"} ghost>
                    关闭
                </Button>
            </Space>
        </Card>
    )
}

export default NoCache
