import { useSettingsStore } from "@/store/settings"
import { useEffect, useMemo, useRef, ReactNode, memo } from "react"
import { useLocation } from "react-router-dom"

function MemoizedScrollTop(props: { children: ReactNode }) {
    const domRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const enableMemoizedScrollTop = useSettingsStore(state => state.enableMemoizedScrollTop)
    const scrollHistoryMap = useRef<Map<string, number>>(new Map())
    const activeKey = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])

    useEffect(() => {
        const divDom = domRef.current
        if (!divDom) return
        if (enableMemoizedScrollTop) {
            divDom.scrollTo(0, scrollHistoryMap.current.get(activeKey) || 0)
        } else {
            divDom.scrollTo(0, 0)
        }
        const onScroll = (e: Event) => {
            const target = e.target as HTMLDivElement
            if (!target) return
            scrollHistoryMap.current.set(activeKey, target?.scrollTop || 0)
        }
        divDom?.addEventListener("scroll", onScroll)
        return () => {
            divDom?.removeEventListener("scroll", onScroll)
        }
    }, [activeKey, enableMemoizedScrollTop])

    const { children } = props
    return (
        <div ref={domRef} className="animation-wrapper scrollbar w-full h-full overflow-y-auto overflow-x-hidden">
            {children}
        </div>
    )
}

export default memo(MemoizedScrollTop)
