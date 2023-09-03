import { Fragment } from "react"
import { StyleProvider } from "@ant-design/cssinjs"
import { AppThemeProvider } from "@/providers/ThemeProvider"
import { AppRouter } from "@/router"
import { Index } from "@/providers/PageManageProvider"

function App() {
    return (
        <Fragment>
            <StyleProvider hashPriority="high">
                <AppThemeProvider>
                    <Index>
                        <AppRouter />
                    </Index>
                </AppThemeProvider>
            </StyleProvider>
        </Fragment>
    )
}

export default App
