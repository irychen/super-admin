import { Button, Card, Input, Space } from "antd"
import { usePageContext } from "@/providers/PageManageProvider"
import { useEffect } from "react"
import { decrement, increment } from "@/features/counter/counterSlice.ts"
import { useAppDispatch, useAppSelector } from "@/hooks"

function NoCache() {
    const { closeCurrent } = usePageContext()
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log("NoCache mount")
        return () => {
            console.log("NoCache unmount")
        }
    }, [])

    return (
        <Card className={"h-full"} title={"NoCache 无缓存"} bordered={false}>
            <div className={"flex w-[400px] mb-[30px] items-center"}>
                <Button type={"link"}>Redux Example</Button>
                <Button
                    onClick={() => {
                        dispatch(decrement())
                    }}
                >
                    minus -
                </Button>
                <Input value={count}></Input>
                <Button
                    onClick={() => {
                        dispatch(increment())
                    }}
                >
                    plus +
                </Button>
            </div>
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
