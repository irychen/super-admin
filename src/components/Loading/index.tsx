import { Spin } from "antd"

function Loading() {
    return (
        <div className={"w-full h-full min-h-[400px] flex justify-center items-center"}>
            <Spin size="large" />
        </div>
    )
}

export default Loading
