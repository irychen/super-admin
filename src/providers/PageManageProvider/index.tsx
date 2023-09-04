import { createContext, ReactNode, useContext, useMemo, useRef, useState } from "react"
import { message } from "antd"
import useSessionStorageState from "@/hooks/useSessionStorageState.ts"

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
    close: (key: string, cb?: () => void) => string | null | undefined
    open: (info: PageConfig) => void
}

const PageContext = createContext<PageManage>({
    active: "",
    pages: [],
    close: (key: string, cb?: () => void) => {
        cb && cb()
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

const TabPageStorageKey = "admin_pages"

export function Index(props: { children: ReactNode }) {
    const [active, setActive] = useState("")
    const [pages, setPages] = useSessionStorageState<PageConfig[]>(TabPageStorageKey, [])
    const [messageApi, messageEle] = message.useMessage()
    const lastOpenKey = useRef<string>("")
    /**
     * 关闭一个标签页
     * @param key 路由的 key
     * @param cb 关闭后成功的回调
     * @returns 返回下一个激活的路由 key
     */
    const close = (key: string, cb?: () => void) => {
        const index = pages.findIndex(item => item.key === key)
        if (index === -1) return
        const newPages = [...pages]
        if (newPages.length <= 1) {
            messageApi.error("至少保留一个标签页")
            return null
        }
        cb && cb()
        newPages.splice(index, 1)
        setPages(newPages)
        if (active === key) {
            if (lastOpenKey.current) {
                if (lastOpenKey.current === key) {
                    const activeKey = newPages[newPages.length - 1].key
                    setActive(activeKey)
                    return activeKey
                } else {
                    setActive(lastOpenKey.current)
                    return lastOpenKey.current
                }
            } else {
                const activeKey = newPages[newPages.length - 1].key
                setActive(activeKey)
                return activeKey
            }
        }
        return null
    }

    const open = (info: PageConfig) => {
        // 记住上一个打开的路由
        lastOpenKey.current = active
        const newPages = [...pages]
        // 如果已经存在，就不再添加
        const existed = newPages.some(item => item.key === info.key)
        if (!existed) newPages.push(info)
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
