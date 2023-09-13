import { Card, Input } from "antd"
import { useOnActive } from "keepalive-for-react"
// import { useOnActive, useOnActiveByName } from "keepalive-for-react"

function Theme() {
    const domRef = useOnActive(() => {
        console.log("Theme use mount")
        return () => {
            console.log("Theme use clean")
        }
    })

    return (
        <Card ref={domRef} className={"h-full"} title={"Theme"} bordered={false}>
            <div className={"h-full"}>
                <Input placeholder="输入一个值 然后切换tab组件不会被销毁" />
            </div>
        </Card>
    )
}

export default Theme
