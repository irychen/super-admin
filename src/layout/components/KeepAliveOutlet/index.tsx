import { useLocation, useOutlet } from "react-router-dom"
import { Fragment, Suspense, useMemo } from "react"
import KeepAlive from "keepalive-for-react"
import { usePageContext } from "@/components/AdminPagesProvider"
import Loading from "@/components/Loading";

function KeepAliveOutlet() {
    const { getKeepAliveRef } = usePageContext()
    const outlet = useOutlet()
    const location = useLocation()

    const keepAliveRef = getKeepAliveRef()
    /**
     * to distinguish different pages to cache
     */
    const active = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])
    return (
        <Suspense fallback={<Loading />}>
            <KeepAlive aliveRef={keepAliveRef} activeName={active} max={10} strategy={"LRU"}>
                {outlet}
            </KeepAlive>
        </Suspense>
    )
}

export default KeepAliveOutlet
