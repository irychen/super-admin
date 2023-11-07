import { Fragment } from "react"
import { StyleProvider } from "@ant-design/cssinjs"
import { AppThemeProvider } from "@/providers/ThemeProvider"
import { AppRouter } from "@/router"
import GlobalLoadingProvider from "@/providers/GlobalLoadingProvider"

function App() {
    return (
        <Fragment>
            <StyleProvider hashPriority="high">
                <AppThemeProvider>
                    <GlobalLoadingProvider>
                        <AppRouter />
                    </GlobalLoadingProvider>
                </AppThemeProvider>
            </StyleProvider>
        </Fragment>
    )
}

export default App
