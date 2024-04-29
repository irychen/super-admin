import {
    createContext,
    MutableRefObject,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from "react"
import useSessionStorageState from "@/hooks/useSessionStorageState.ts"
import { NavigateOptions, useLocation, useNavigate } from "react-router-dom"
import { useKeepaliveRef } from "keepalive-for-react"
import { message } from "antd"
import { findAdminRouteByUrl } from "@/router/config.tsx"

export type PageItem = {
    // 路由的名称
    label: string
    // 路由的 path 值 例如 /home /user?id=1
    url: string
    // 路由的参数
    state?: any
    reload?: boolean
}

export interface PageManage {
    active: string
    pages: PageItem[]
    close: (url: string) => void
    open: (page: PageItem) => void
    closeCurrent: () => void
    getKeepAliveRef: () => MutableRefObject<any> | undefined
    setPages: (pages: PageItem[]) => void
}

const PageContext = createContext<PageManage>({
    active: "",
    pages: [],
    close: () => {},
    open: () => {},
    closeCurrent: () => {},
    getKeepAliveRef: () => {
        return undefined
    },
    setPages: () => {},
})

export const usePageContext = () => {
    return useContext(PageContext)
}

const TabPageStorageKey = "super_admin_pages"

export function PageManageProvider(props: { children: ReactNode }) {
    const [messageApi, messageEle] = message.useMessage()
    const keepAliveRef = useKeepaliveRef()
    const lastOpenUrl = useRef<string>("")
    const location = useLocation()
    const { children } = props
    const [pages, setPages] = useSessionStorageState<PageItem[]>(TabPageStorageKey, [])
    const navigate = useNavigate()

    const active = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])

    const navigateTo = (key: string, options?: NavigateOptions) => {
        const pathname = key.indexOf("?") > -1 ? key.split("?")[0] : key
        const search = key.indexOf("?") > -1 ? key.split("?")[1] : ""
        navigate(
            {
                pathname,
                search,
            },
            options,
        )
    }

    const getKeepAliveRef = () => {
        return keepAliveRef
    }

    const open = (page: PageItem) => {
        if (!page || !page.url) {
            throw new Error(`route info error ${JSON.stringify(page)}`)
        }
        // 记住上一个打开的路由
        lastOpenUrl.current = active
        setPages(prev => {
            const existed = prev.some(item => item.url === page.url)
            if (!existed) {
                return [...prev, page]
            }
            return prev
        })
        navigateTo(page.url, {
            state: page.state,
        })
    }

    const close = (url: string) => {
        const index = pages.findIndex(item => item.url === url)
        if (index === -1) return
        const newPages = [...pages]
        if (newPages.length <= 1) {
            messageApi.error("至少保留一个标签页")
            return null
        }
        keepAliveRef.current?.removeCache(url)
        newPages.splice(index, 1)
        setPages(newPages)
        let nextActiveUrl = null
        // if close current page
        if (active === url) {
            const lastUrl = lastOpenUrl.current
            // if last open key is existed in pages
            if (lastUrl && newPages.some(item => item.url === lastUrl)) {
                // set last open key to active
                nextActiveUrl = lastUrl
            } else {
                // if last open key is not existed in pages or last open key is not existed
                // set the last page to active page
                nextActiveUrl = newPages[newPages.length - 1].url
            }
        }
        // if nextActiveUrl is existed, navigate to nextActiveUrl
        if (nextActiveUrl) {
            navigateTo(nextActiveUrl, {
                replace: true,
            })
        }
    }

    useEffect(() => {
        const route = findAdminRouteByUrl(active)
        if (route) {
            open({
                label: route.meta?.title as string,
                url: active,
            })
        }
    }, [])

    const closeCurrent = () => {
        return close(active)
    }

    return (
        <PageContext.Provider
            value={{
                setPages,
                active,
                pages,
                close,
                open,
                closeCurrent,
                getKeepAliveRef,
            }}
        >
            {messageEle}
            {children}
        </PageContext.Provider>
    )
}

export default PageManageProvider
