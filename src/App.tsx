import { Fragment } from "react"
import { StyleProvider } from "@ant-design/cssinjs"
import { AppThemeProvider } from "@/theme/ThemeProvider.tsx"
import { AppRouter } from "@/router"
import { PageManageProvider } from "@/router/PageManageProvider.tsx"

function App() {
    return (
        <Fragment>
            <StyleProvider hashPriority="high">
                <AppThemeProvider>
                    <PageManageProvider>
                        <AppRouter />
                    </PageManageProvider>
                </AppThemeProvider>
            </StyleProvider>
        </Fragment>
    )
}

export default App
