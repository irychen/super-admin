import { useEffect, useMemo, useRef, ReactNode, memo } from "react"
import { useLocation } from "react-router-dom"

function AnimationWrapper(props: { children: ReactNode }) {
    const domRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const scrollHistoryMap = useRef<Map<string, number>>(new Map())
    const activeKey = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])

    useEffect(() => {
        const divDom = domRef.current
        if (!divDom) return
        divDom.scrollTo(0, scrollHistoryMap.current.get(activeKey) || 0)
        const onScroll = (e: Event) => {
            const target = e.target as HTMLDivElement
            if (!target) return
            scrollHistoryMap.current.set(activeKey, target?.scrollTop || 0)
        }
        divDom?.addEventListener("scroll", onScroll)
        return () => {
            divDom?.removeEventListener("scroll", onScroll)
        }
    }, [activeKey])

    const { children } = props
    return (
        <div ref={domRef} className="animation-wrapper scrollbar w-full h-full overflow-auto">
            {children}
        </div>
    )
}

export default memo(AnimationWrapper)
