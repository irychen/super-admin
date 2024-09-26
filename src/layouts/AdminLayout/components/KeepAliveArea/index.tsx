import LoadingArea from "@/components/LoadingArea"
import { findRouteByAbsolutePath } from "@/router"
import { useSettingsStore } from "@/store/settings"
import { openTabPage } from "@/store/tabs"
import { setKeepaliveIns } from "@/utils/keepaliveIns"
import KeepAlive, { useKeepaliveRef } from "keepalive-for-react"
import { memo, ReactNode, Suspense, useEffect, useMemo } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import AnimationWrapper from "../AnimationWrapper"

function KeepAliveArea() {
    console.log("keepalive area render")

    const location = useLocation()
    const aliveRef = useKeepaliveRef()

    const cacheKey = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])

    useEffect(() => {
        setKeepaliveIns(aliveRef.current)
        const absolutePath = location.pathname
        const route = findRouteByAbsolutePath(absolutePath)
        openTabPage({
            url: cacheKey,
            title: route?.meta?.title as string,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cacheKey])

    const outlet = useOutlet()

    const route = useMemo(() => {
        return findRouteByAbsolutePath(cacheKey)
    }, [cacheKey])

    const multiTabs = useSettingsStore(state => state.multiTabs)

    const showTabsClass = "calc(100vh - 97px)"
    const hideTabsClass = "calc(100vh - 60px)"

    return (
        <KeepAlive
            async={false}
            microAsync={true}
            aliveRef={aliveRef}
            activeName={cacheKey}
            max={18}
            cache={route?.cache}
            animationWrapper={AnimationWrapper}
        >
            <Suspense fallback={<LoadingArea height={multiTabs ? showTabsClass : hideTabsClass} />}>
                <SpreadArea>{outlet}</SpreadArea>
            </Suspense>
        </KeepAlive>
    )
}

function SpreadArea(props: { children: ReactNode }) {
    const { children } = props
    const layoutStretch = useSettingsStore(state => state.layoutStretch)

    return (
        <div
            className="layout-stretch  mx-auto"
            style={{
                maxWidth: layoutStretch ? "100%" : "1200px",
            }}
        >
            {children}
        </div>
    )
}

export default memo(KeepAliveArea)
