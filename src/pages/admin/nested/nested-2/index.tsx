import DefaultOutlet from "@/router/default-outlet"
import { Divider } from "antd"

function Nested_2() {
    return (
        <div className="w-full p-6 ">
            <div>
                <h1 className="text-xl font-bold">Nested 2</h1>
            </div>
            <Divider className="m-0 mt-4" />
            <div>
                <DefaultOutlet />
            </div>
        </div>
    )
}

export default Nested_2
