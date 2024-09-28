import { BrowserRouter, HashRouter, useLocation, useNavigate } from "react-router-dom"
import config from "@/config"
import { Fragment, ReactNode } from "react"
import { notification, message } from "antd"
import { setNotificationApi } from "@/utils/notification"
import { setMessageApi } from "@/utils/message"
import AppRoutes from "@/router"
import AntdConfigWrapper from "./components/AntdConfigWrapper"
import BaseLayout from "@/layouts/BaseLayout"
import { setNavigate } from "./utils/navigate"
import { setLocation } from "./utils/location"

const { useNotification } = notification

const Router = config.hashRouter ? HashRouter : BrowserRouter

const App = () => {
    console.log("App render")

    const [notificationApi, notificationContextHolder] = useNotification()
    setNotificationApi(notificationApi)

    const [messageApi, messageContextHolder] = message.useMessage()
    setMessageApi(messageApi)

    logInfo()

    return (
        <Fragment>
            <AntdConfigWrapper>
                {notificationContextHolder}
                {messageContextHolder}
                <BaseLayout>
                    <Router>
                        <FunctionRegistry>
                            <AppRoutes />
                        </FunctionRegistry>
                    </Router>
                </BaseLayout>
            </AntdConfigWrapper>
        </Fragment>
    )
}

function FunctionRegistry({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const location = useLocation()
    setNavigate(navigate)
    setLocation(location)
    return children
}

function logInfo() {
    console.groupCollapsed("\x1b[35m%s\x1b[0m", `[App Info]`)
    console.log(
        "\x1b[35m%s\x1b[0m",
        `[App]: run mode: ${config.mode}, isDev: ${config.isDev}, baseUrl: ${config.baseUrl} `,
    )
    // config
    console.log("\x1b[36m%s\x1b[0m", `[App]: config: `, config)
    console.groupEnd()
}

export default App
