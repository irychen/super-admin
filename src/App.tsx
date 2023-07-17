import {Fragment} from 'react'
import {StyleProvider} from "@ant-design/cssinjs"
import {AppThemeProvider} from "@/theme/ThemeProvider.tsx";

function App() {
    return (
        <Fragment>
            <StyleProvider hashPriority="high">
                <AppThemeProvider>

                </AppThemeProvider>
            </StyleProvider>
        </Fragment>
    )
}


export default App
