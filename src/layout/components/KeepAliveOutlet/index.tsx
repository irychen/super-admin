import { useLocation, useOutlet } from "react-router-dom"
import { Fragment, Suspense, useMemo } from "react"
import KeepAlive from "keepalive-for-react"
import Loading from "@/components/Loading"
import { findAdminRouteByUrl } from "@/router/config.tsx"
import usePageContext from "@/components/AdminPagesProvider/usePageContext"

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
                        height: "calc(100vh - 93px)",
                    }}
                >
                    {outlet}
                </div>
            </KeepAlive>
        </Suspense>
    )
}

export default KeepAliveOutlet
