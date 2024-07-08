import { theme } from "antd"
import { UIEventHandler, useEffect, useMemo, useRef } from "react"
import { ScrollConfig } from "@/components/SuperTable"
import { useKeepAliveContext } from "keepalive-for-react"
import { isFunc } from "fortea"

export function useThemeToken() {
    const { token } = theme.useToken()
    return useMemo(() => token, [token])
}

export function useVirtualScrollMemo(scrollTo?: (config: ScrollConfig) => void) {
    const historyScrollTop = useRef(0)
    const { active } = useKeepAliveContext()

    useEffect(() => {
        if (active && isFunc(scrollTo)) {
            scrollTo({ top: historyScrollTop.current })
        }
    }, [active])

    const onScroll: UIEventHandler<HTMLDivElement> = e => {
        const target = e.target as HTMLDivElement
        if (!target) return
        historyScrollTop.current = target?.scrollTop || 0
    }

    return onScroll
}
