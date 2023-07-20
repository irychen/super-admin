import { createContext, ReactNode, useContext, useMemo, useRef, useState } from "react"
import { message } from "antd"

export type PageConfig = {
    label: string // 路由的名称
    // 路由的 path
    key: string
    cache?: boolean
}

export interface PageManage {
    // 当前激活的路由 key 值
    active: string
    // 所有存在的路由 tabs
    pages: PageConfig[]
    close: (key: string) => string | null | undefined
    open: (info: PageConfig) => void
}

const PageContext = createContext<PageManage>({
    active: "",
    pages: [],
    close: (key: string) => {
        console.log(key)
        return key
    },
    open: (info: PageConfig) => {
        console.log(info)
    },
})

export const usePageContext = () => {
    return useContext(PageContext)
}

export function PageManageProvider(props: { children: ReactNode }) {
    const [active, setActive] = useState("")
    const [pages, setPages] = useState<PageConfig[]>([])
    const [messageApi, messageEle] = message.useMessage()
    const lastOpenKey = useRef<string>("")

    const close = (key: string) => {
        const index = pages.findIndex(item => item.key === key)
        if (index === -1) return
        const newPages = [...pages]
        if (newPages.length <= 1) {
            messageApi.error("至少保留一个标签页")
            return null
        }
        newPages.splice(index, 1)
        setPages(newPages)
        if (active === key) {
            if (lastOpenKey.current === key) {
                const activeKey = newPages[newPages.length - 1].key
                setActive(activeKey)
                return activeKey
            } else {
                setActive(lastOpenKey.current)
                return lastOpenKey.current
            }
        }
        return null
    }

    const open = (info: PageConfig) => {
        lastOpenKey.current = active
        const index = pages.findIndex(item => item.key === info.key)
        if (index !== -1) {
            setActive(info.key)
            return
        }
        const newPages = [...pages, info]
        setPages(newPages)
        setActive(info.key)
    }

    const value = useMemo(() => {
        return {
            active,
            pages,
            close,
            open,
        }
    }, [active, pages])

    return (
        <PageContext.Provider value={value}>
            {messageEle}
            {props.children}
        </PageContext.Provider>
    )
}
