import { useLocation, useOutlet } from "react-router-dom"
import { Suspense, useMemo } from "react"
import KeepAlive from "keepalive-for-react"
import Loading from "@/components/Loading"
import { findAdminRouteByUrl } from "@/router/config.tsx"
import usePageContext from "@/components/AdminPagesProvider/usePageContext"
import SubpageErrorBoundary from "@/components/SubpageErrorBoundary"

function KeepAliveOutlet() {
    const { getKeepAliveRef } = usePageContext()
    const location = useLocation()
    const keepAliveRef = getKeepAliveRef()
    const outlet = useOutlet()
    /**
     * to distinguish different pages to cache
     */
    const active = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])

    const currentRoute = useMemo(() => {
        return findAdminRouteByUrl(active)
    }, [active])

    return (
        <Suspense fallback={<Loading />}>
            <KeepAlive
                errorElement={SubpageErrorBoundary}
                onBeforeActive={() => {
                    const dropdowns = document.querySelectorAll(".ant-select-dropdown")
                    dropdowns.forEach(dropdown => {
                        if (dropdown) {
                            dropdown.setAttribute("style", "")
                        }
                    })
                    const pickerDropdowns = document.querySelectorAll(".ant-picker-dropdown")
                    pickerDropdowns.forEach(pickerDropdown => {
                        if (pickerDropdown) {
                            pickerDropdown.setAttribute("style", "")
                        }
                    })
                    // ant-dropdown
                    const dropdowns2 = document.querySelectorAll(".ant-dropdown")
                    dropdowns2.forEach(dropdown => {
                        if (dropdown) {
                            dropdown.setAttribute("style", "")
                        }
                    })
                }}
                aliveRef={keepAliveRef}
                cache={currentRoute?.cache}
                activeName={active}
                max={10}
                strategy={"LRU"}
            >
                <div
                    className={"main scroll scrollbar"}
                    style={{
                        overflow: "auto",
                        height: "calc(100vh - 97px)",
                    }}
                >
                    {outlet}
                </div>
            </KeepAlive>
        </Suspense>
    )
}

export default KeepAliveOutlet
