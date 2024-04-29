import { Outlet, useOutlet } from "react-router-dom"
import { Card } from "antd"

function Menus2Layout() {
    return (
        <Card className={"w-full h-full"} title={"Menus2 Layout"}>
            <Outlet />
        </Card>
    )
}

export default Menus2Layout
