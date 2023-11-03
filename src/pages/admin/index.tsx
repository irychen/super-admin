import { Button, Card, Input, Space } from "antd"
import { useOnActive } from "keepalive-for-react"
import { useEffect, useState } from "react"
import { usePageContext } from "@/providers/PageManageProvider"
import useKeepAliveKey from "@/hooks/useKeepAliveKey.ts"

function Home() {
    const [active, setActive] = useState(false)
    const homeKey = useKeepAliveKey()
    const domRef = useOnActive(() => {
        console.log("Home onActive")
        setActive(true)
        return () => {
            console.log("Home onInactive")
        }
    }, false)

    useEffect(() => {
        // throw new Error("this is an Err")
        setTimeout(() => {
            throw new Error("this is an Err")
        }, 100)
    }, [])
    const { closeCurrent, open } = usePageContext()
    return (
        <Card title={"首页 (带缓存)"} ref={domRef}>
            <div className={"w-full h-full flex-col flex justify-center"}>
                <Space className={"mb-[20px]"}>
                    <Button
                        danger
                        type={"primary"}
                        onClick={() => {
                            closeCurrent()
                        }}
                    >
                        关闭
                    </Button>
                    <Button
                        type={"primary"}
                        onClick={() =>
                            open({
                                key: "/no-cache",
                                label: "无缓存页面",
                            })
                        }
                    >
                        打开无缓存页面
                    </Button>
                    <Button
                        type={"primary"}
                        ghost
                        onClick={() =>
                            open({
                                key: "/" + "?id=1",
                                label: "有参数页面",
                            })
                        }
                    >
                        打开有参数首页
                    </Button>
                </Space>
                <Input
                    style={{
                        marginBottom: "20px",
                    }}
                    placeholder="输入一个值 然后切换tab组件不会被销毁"
                ></Input>
                <div
                    className={"bg-amber-300 p-[20px] flex-col flex justify-center items-center w-full h-[400px]"}
                    style={{
                        backgroundColor: "#ffd81c",
                    }}
                >
                    <div className={"font-extrabold text-[40px]"}>React KeepAlive💗</div>
                    <p className={"text-2xl"}>
                        {active ? <span className={"text-red-400 font-extrabold"}>{"active 💡"}</span> : "inactive"}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default Home
