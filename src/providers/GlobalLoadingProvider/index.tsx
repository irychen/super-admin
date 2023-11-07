import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react"
import SpottedLoading from "@/components/SpottedLoading"

export interface AppGlobalLoading {
    open: (message?: string) => void
    close: () => void
    setLoading: (v: boolean) => void
}

const GlobalLoadingContext = createContext<AppGlobalLoading>({
    open: (message?: string) => {
        console.log("open", message)
    },
    close: () => {
        console.log("close")
    },
    setLoading: (v: boolean) => {
        console.log(v)
    },
})

export const useGlobalLoadingContext = () => {
    return useContext(GlobalLoadingContext)
}

export const GlobalLoadingProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string | undefined>("")

    const open = useCallback(
        (message?: string) => {
            setMessage(message)
            setLoading(true)
        },
        [setLoading, setMessage],
    )

    const close = useCallback(() => {
        setLoading(false)
    }, [setLoading])

    const timmer = useRef<any>()

    const memoizeValue = useMemo(() => {
        return {
            open,
            close,
            setLoading,
        }
    }, [open, close, setLoading])

    return (
        <GlobalLoadingContext.Provider value={memoizeValue}>
            {children}
            {loading && <SpottedLoading showMessage={!!message} message={message} />}
        </GlobalLoadingContext.Provider>
    )
}

export default GlobalLoadingProvider
