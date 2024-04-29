import { Outlet, useOutlet } from "react-router-dom"
import { Card } from "antd"

function Menus2Layout() {
    return (
        <div className={"w-full h-full p-[8px]"}>
            <Card bordered={false} className={"w-full h-full"} title={"Menus2 Layout"}>
                <Outlet />
            </Card>
        </div>
    )
}

export default Menus2Layout
