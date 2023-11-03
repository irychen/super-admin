import { Card } from "antd"

function Welcome() {
    return (
        <Card className={"h-full"} title={"Welcome"} bordered={false}>
            <div className={"h-full min-h-[500px] flex-col flex items-center justify-center"}>
                <h1 className={"text-2xl text-blue-700 text-center"}>欢迎页</h1>
                <p className={"text-center text-blue-700"}>welcome to use super-antd-admin</p>
            </div>
        </Card>
    )
}

export default Welcome
