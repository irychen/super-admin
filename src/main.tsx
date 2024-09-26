// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "@/App"
import "@/index.scss"
import "@/i18n"

async function enableMocking() {
    if (import.meta.env.MODE !== "mock") {
        return
    }
    const { worker } = await import("./mock")
    return worker.start({
        onUnhandledRequest: "bypass",
    })
}

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        // <StrictMode>
        <App />,
        // </StrictMode>,
    )
})
