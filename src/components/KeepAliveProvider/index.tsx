import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"

export interface KeepAliveContextProps {
    activeName: string | undefined
    setActiveName: (name: string) => void
}

const KeepAliveContext = createContext<KeepAliveContextProps>({
    activeName: undefined,
    setActiveName: (name: string) => {
        console.log(name)
    },
} as KeepAliveContextProps)

export const useKeepAliveContext = () => {
    return useContext(KeepAliveContext)
}

export const useOnActive = (cb: () => any, skipMount = true) => {
    const domRef = useRef<HTMLDivElement>(null)
    const { activeName } = useKeepAliveContext()
    const isMount = useRef(false)
    useEffect(() => {
        let destroyCb: any
        const parent = domRef.current?.parentElement
        const name = parent?.id
        if (parent && name) {
            if (activeName === name) {
                if (skipMount) {
                    if (isMount.current) destroyCb = cb()
                } else {
                    destroyCb = cb()
                }
                isMount.current = true
                return () => {
                    if (destroyCb && typeof destroyCb === "function") {
                        destroyCb()
                    }
                }
            }
        }
    }, [activeName])
    return domRef
}

function KeepAliveProvider(props: { children?: ReactNode; initialActiveName?: string }) {
    const { initialActiveName, children } = props
    const [activeName, setActiveName] = useState<string | undefined>(initialActiveName)
    useLayoutEffect(() => {
        setActiveName(initialActiveName)
    }, [initialActiveName])
    return <KeepAliveContext.Provider value={{ activeName, setActiveName }}>{children}</KeepAliveContext.Provider>
}

export default KeepAliveProvider
