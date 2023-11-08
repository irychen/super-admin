import { useGlobalLoadingContext } from "@/providers/GlobalLoadingProvider"
import { Button, Card, Input, Spin } from "antd"
import { useRef, useState } from "react"
import { Loading } from "@/components/SpottedLoading"
import { useOnActive } from "keepalive-for-react"

function LoadingPage() {
    const { open, close } = useGlobalLoadingContext()
    const historyScrollTop = useRef(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const domRef = useOnActive(() => {
        console.log("LoadingPage onActive")
        function onScroll() {
            historyScrollTop.current = scrollContainerRef.current?.scrollTop || 0
        }
        scrollContainerRef.current?.scrollTo(0, historyScrollTop.current)
        scrollContainerRef.current?.addEventListener("scroll", onScroll)
        return () => {
            console.log("LoadingPage onInactive")
            scrollContainerRef.current?.removeEventListener("scroll", onScroll)
        }
    }, false)

    const [message, setMessage] = useState<string>("loading...")
    return (
        <Card title={"loading"} ref={domRef}>
            <div className={"flex justify-around mb-[20px]"}>
                <Card title={"全局loading"} className={"w-[400px] shadow-md"}>
                    <div className={"flex"}>
                        <Input
                            allowClear
                            value={message}
                            onChange={e => {
                                setMessage(e.target.value)
                            }}
                            placeholder={"请输入loading的文字"}
                        ></Input>
                        <Button
                            onClick={() => {
                                open(message)
                                setTimeout(() => {
                                    close()
                                }, 2000)
                            }}
                        >
                            打开loading
                        </Button>
                    </div>
                </Card>

                <Card className={"w-[200px] shadow-md h-[200px] flex justify-center items-center"}>
                    <Spin size="large" />
                </Card>

                <Card className={"w-[200px] shadow-md h-[200px] flex justify-center items-center"}>
                    <Loading />
                </Card>
            </div>

            <Card title={"滚动条复位"} className={"shadow"}>
                <div ref={scrollContainerRef} className={"h-[100px] mt-[20px] overflow-y-auto"}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                        return (
                            <div
                                className={"text-center text-[20px]"}
                                style={{
                                    height: "50px",
                                    color: "white",
                                    fontWeight: "bold",
                                    lineHeight: "50px",
                                    backgroundColor: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
                                }}
                                key={index}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
            </Card>
        </Card>
    )
}

export default LoadingPage
