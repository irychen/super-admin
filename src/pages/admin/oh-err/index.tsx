import { Button, Card } from "antd"
import { useEffect, useState } from "react"

function OhErr() {
    const [showErr, setShowErr] = useState(false)

    console.log("OhErr render")

    return (
        <Card title={"page err 渲染错误捕获"}>
            <Button
                danger
                type={"primary"}
                onClick={() => {
                    setShowErr(true)
                }}
            >
                throw err 抛出错误
            </Button>
            {showErr && <ErrRender />}
        </Card>
    )
}

function ErrRender() {
    useEffect(() => {
        throw new Error("this is an err for example")
    }, [])
    return <div>err render 抛出错误</div>
}

export default OhErr
