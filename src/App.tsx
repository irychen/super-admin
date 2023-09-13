import { Fragment } from "react"
import { StyleProvider } from "@ant-design/cssinjs"
import { AppThemeProvider } from "@/providers/ThemeProvider"
import { AppRouter } from "@/router"

function App() {
    return (
        <Fragment>
            <StyleProvider hashPriority="high">
                <AppThemeProvider>
                    <AppRouter />
                </AppThemeProvider>
            </StyleProvider>
        </Fragment>
    )
}

export default App
