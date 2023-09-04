import { Fragment, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import { ComponentReactElement } from "@/components/KeepAlive"
import { createPortal } from "react-dom"

/*
  这个组件的作用是将页面渲染到内存中的div中
  activatedRef.current = activatedRef.current || active 用来保证组件在激活时才渲染

  再根据active: 是否激活决定是否将内存中的div
  渲染到renderDiv中 或者 从renderDiv中移除
 */

interface CacheComponentProps extends ComponentReactElement {
    active: boolean
    name: string
    renderDiv: RefObject<HTMLDivElement>
}

function CacheComponent({ active, children, name, renderDiv }: CacheComponentProps) {
    const [targetElement] = useState(() => document.createElement("div"))
    const activatedRef = useRef(false)
    activatedRef.current = activatedRef.current || active
    useLayoutEffect(() => {
        if (active) {
            renderDiv.current?.appendChild(targetElement)
        } else {
            try {
                renderDiv.current?.removeChild(targetElement)
            } catch (e) {
                console.log(e, "removeChild error")
            }
        }
    }, [active, renderDiv, targetElement])
    useEffect(() => {
        targetElement.setAttribute("id", name)
        targetElement.className = "page-content page-content-animate"
    }, [name, targetElement])
    return <Fragment>{activatedRef.current && createPortal(children, targetElement)}</Fragment>
}

export default CacheComponent
