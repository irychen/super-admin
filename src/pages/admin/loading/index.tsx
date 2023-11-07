import { useGlobalLoadingContext } from "@/providers/GlobalLoadingProvider"
import { Button, Card, Input, Spin } from "antd"
import { useState } from "react"
import { Loading } from "@/components/SpottedLoading"

function LoadingPage() {
    const { open, close } = useGlobalLoadingContext()

    const [message, setMessage] = useState<string>("loading...")
    return (
        <Card title={"loading"}>
            <div className={"grid gap-2 grid-cols-3"}>
                <Card title={"全局loading"} className={"w-[400px]"}>
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

                <Card className={"w-[400px] h-[200px] flex justify-center items-center"}>
                    <Spin size="large" />
                </Card>

                <Card className={"w-[400px] h-[200px] flex justify-center items-center"}>
                    <Loading />
                </Card>
            </div>
        </Card>
    )
}

export default LoadingPage
