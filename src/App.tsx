import { Fragment } from "react"
import { StyleProvider } from "@ant-design/cssinjs"
import { AppThemeProvider } from "@/providers/ThemeProvider"
import { AppRouter } from "@/router"
import GlobalLoadingProvider from "@/providers/GlobalLoadingProvider"
import { Provider } from "react-redux"
import store from "@/store"

import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")

function App() {
    return (
        <Fragment>
            <Provider store={store}>
                <StyleProvider hashPriority="high">
                    <AppThemeProvider>
                        <GlobalLoadingProvider>
                            <AppRouter />
                        </GlobalLoadingProvider>
                    </AppThemeProvider>
                </StyleProvider>
            </Provider>
        </Fragment>
    )
}

export default App
