import ReactDOM from "react-dom"
import { equals, isNil, map, filter, includes, length, append, slice } from "ramda"
import { useEffect, useRef, useState, Fragment, useLayoutEffect, useImperativeHandle } from "react"
import type { ReactNode, RefObject } from "react"

export interface ComponentReactElement {
    children?: ReactNode | ReactNode[]
}

export type KeepAliveRef = {
    getCaches: () => Array<{ name: string; ele?: ReactNode }>
    removeCache: (name: string) => void
}

interface Props extends ComponentReactElement {
    activeName?: string
    include?: Array<string>
    exclude?: Array<string>
    maxLen?: number
    cache?: boolean
    aliveRef?: RefObject<KeepAliveRef>
}
// name === key

function KeepAlive({ activeName, children, exclude, include, maxLen = 10, aliveRef }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [cacheReactNodes, setCacheReactNodes] = useState<Array<{ name: string; ele?: ReactNode }>>([])
    useEffect(() => {
        console.log("cacheReactNodes", cacheReactNodes)
    }, [cacheReactNodes])

    useImperativeHandle(
        aliveRef,
        () => ({
            getCaches: () => cacheReactNodes,
            removeCache: (name: string) => {
                setCacheReactNodes(cacheReactNodes => {
                    return filter(({ name: cacheName }) => !equals(cacheName, name), cacheReactNodes)
                })
            },
        }),
        [cacheReactNodes],
    )

    useLayoutEffect(() => {
        if (isNil(activeName)) {
            return
        }
        setCacheReactNodes(cacheReactNodes => {
            if (length(cacheReactNodes) >= maxLen) {
                cacheReactNodes = slice(1, length(cacheReactNodes), cacheReactNodes)
            }
            const cacheReactNode = cacheReactNodes.find(res => equals(res.name, activeName))
            if (isNil(cacheReactNode)) {
                cacheReactNodes = append(
                    {
                        name: activeName,
                        ele: children,
                    },
                    cacheReactNodes,
                )
            } else {
                cacheReactNodes = map(res => {
                    return equals(res.name, activeName) ? { ...res, ele: children } : res
                }, cacheReactNodes)
            }
            return isNil(exclude) && isNil(include)
                ? cacheReactNodes
                : filter(({ name }) => {
                      if (exclude && includes(name, exclude)) {
                          return false
                      }
                      if (include) {
                          return includes(name, include)
                      }
                      return true
                  }, cacheReactNodes)
        })
    }, [children, activeName, exclude, maxLen, include])

    return (
        <Fragment>
            <div ref={containerRef} className="keep-alive" />
            {map(
                ({ name, ele }) => (
                    <Component active={equals(name, activeName)} renderDiv={containerRef} name={name} key={name}>
                        {ele}
                    </Component>
                ),
                cacheReactNodes,
            )}
        </Fragment>
    )
}

export default KeepAlive

interface ComponentProps extends ComponentReactElement {
    active: boolean
    name: string
    renderDiv: RefObject<HTMLDivElement>
}

/*
  这个组件的作用是将页面渲染到内存中的div中
  activatedRef.current = activatedRef.current || active 用来保证组件在激活时才渲染

  再根据active: 是否激活决定是否将内存中的div
  渲染到renderDiv中 或者 从renderDiv中移除
 */
function Component({ active, children, name, renderDiv }: ComponentProps) {
    const [targetElement] = useState(() => document.createElement("div"))
    const activatedRef = useRef(false)
    activatedRef.current = activatedRef.current || active
    useEffect(() => {
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
    }, [name, targetElement])
    return <Fragment>{activatedRef.current && ReactDOM.createPortal(children, targetElement)}</Fragment>
}
