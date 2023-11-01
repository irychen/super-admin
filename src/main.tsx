import { createRoot } from "react-dom/client"
import App from "@/App.tsx"
import "@/style/global.scss"
import { StrictMode } from "react"

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
    // <StrictMode>
    <App />,
    // </StrictMode>
)
