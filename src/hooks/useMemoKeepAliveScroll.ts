import { RefObject, useRef } from "react"
import { useOnActiveByRef } from "keepalive-for-react"

function useMemoKeepAliveScroll(ref: RefObject<HTMLDivElement>) {
    const hTop = useRef(0)
    useOnActiveByRef(
        ref,
        () => {
            function onScroll() {
                const targetDom = getTargetDom()
                hTop.current = targetDom?.scrollTop || 0
            }
            const targetDom = getTargetDom()
            targetDom?.scrollTo(0, hTop.current)
            targetDom?.addEventListener("scroll", onScroll)
            return () => {
                targetDom?.removeEventListener("scroll", onScroll)
            }
        },
        false,
    )
}

function getTargetDom() {
    return document.querySelector(".cache-component") as HTMLDivElement
}

export default useMemoKeepAliveScroll
