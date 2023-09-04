import { append, equals, filter, includes, isNil, length, map, slice } from "ramda"
import type { ReactNode, RefObject } from "react"
import { Fragment, memo, useImperativeHandle, useLayoutEffect, useRef, useState } from "react"
import CacheComponent from "@/components/CacheComponent"

export interface ComponentReactElement {
    children?: ReactNode | ReactNode[]
}

export type KeepAliveRef = {
    getCaches: () => Array<{ name: string; ele?: ReactNode }>
    removeCache: (name: string) => void
    cleanCache: () => void
}

interface Props extends ComponentReactElement {
    activeName?: string
    include?: Array<string>
    exclude?: Array<string>
    maxLen?: number
    cache?: boolean
    aliveRef?: RefObject<KeepAliveRef>
}

const KeepAlive = memo(function KeepAlive({ activeName, children, exclude, include, maxLen = 10, aliveRef }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [cacheReactNodes, setCacheReactNodes] = useState<Array<{ name: string; ele?: ReactNode }>>([])

    useImperativeHandle(
        aliveRef,
        () => ({
            getCaches: () => cacheReactNodes,
            removeCache: (name: string) => {
                setTimeout(() => {
                    setCacheReactNodes(cacheReactNodes => {
                        return cacheReactNodes.filter(res => !equals(res.name, name))
                    })
                }, 0)
            },
            cleanCache: () => {
                setCacheReactNodes([])
            },
        }),
        [cacheReactNodes, setCacheReactNodes],
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
            <div ref={containerRef} className="keep-alive page-content-wrapper" />
            {map(
                ({ name, ele }) => (
                    <CacheComponent active={equals(name, activeName)} renderDiv={containerRef} name={name} key={name}>
                        {ele}
                    </CacheComponent>
                ),
                cacheReactNodes,
            )}
        </Fragment>
    )
})

export default KeepAlive
