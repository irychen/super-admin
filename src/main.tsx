import ReactDOM from "react-dom"
import App from "@/App.tsx"
import "@/style/global.scss"
import { StrictMode } from "react"

ReactDOM.render(
    // <StrictMode>
    <App />,
    // </StrictMode>,
    document.getElementById("root") as HTMLElement,
)
