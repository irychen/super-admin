import {Card, Input} from "antd"
import useOnActive from "@/hooks/useOnActive"

function Theme() {
    const domRef = useOnActive(() => {
        console.log("active Theme")
        return () => {
            console.log("clean Theme")
        }
    })
    return (

        <Card  ref={domRef}  className={"h-full"} title={"Theme"} bordered={false}>
            <div className={"h-full"}>
                <Input placeholder="输入一个值 然后切换tab组件不会被销毁" />
            </div>
        </Card>
    )
}

export default Theme
