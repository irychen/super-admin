import { createContext, MutableRefObject, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react"
import { NavigateOptions, useLocation, useNavigate } from "react-router-dom"
import { useKeepaliveRef } from "keepalive-for-react"
import { message } from "antd"
import { findAdminRouteByUrl } from "@/router/config.tsx"
import { useTranslation } from "react-i18next"
import { useAppUser } from "@/store/user.ts"
import { routeAuthCheck } from "@/utils/auth.ts"
import { useSessionStorageState } from "ahooks"

export type PageItem = {
    // 路由的名称
    label?: string
    // 路由的 path 值 例如 /home /user?id=1
    url: string
    // 路由的参数
    state?: any
}

export interface PageManage {
    active: string
    pages: PageItem[]
    close: (url: string) => void
    open: (page: PageItem) => void
    closeCurrent: () => void
    getKeepAliveRef: () => MutableRefObject<any> | undefined
    setPages: (pages: PageItem[]) => void
    closeOther: () => void
}

export const PageContext = createContext<PageManage>({
    active: "",
    pages: [],
    close: () => {},
    open: () => {},
    closeCurrent: () => {},
    getKeepAliveRef: () => {
        return undefined
    },
    closeOther: () => {},
    setPages: () => {},
})

const TabPageStorageKey = "super_admin_pages"

export function PageManageProvider(props: { children: ReactNode }) {
    const { t } = useTranslation()

    const [messageApi, messageEle] = message.useMessage()
    const keepAliveRef = useKeepaliveRef()
    const lastOpenUrl = useRef<string>("")
    const location = useLocation()
    const { children } = props
    const [pages = [], setPages] = useSessionStorageState<PageItem[]>(TabPageStorageKey, {
        defaultValue: [],
    })

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
        const route = findAdminRouteByUrl(page.url)
        if (route && !page.label) {
            page.label = t(`layout.menu.${route.meta?.title}`)
        }
        // 记住上一个打开的路由
        lastOpenUrl.current = active
        setPages((prev = []) => {
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
        console.log("close", url)
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

    const { permissions } = useAppUser()

    useEffect(() => {
        const route = findAdminRouteByUrl(active)
        if (route) {
            const authOk = routeAuthCheck(route, permissions)
            open({
                label: authOk ? t(`layout.menu.${route.meta?.title}`) : "403",
                url: active,
            })
        }
    }, [permissions])

    const closeCurrent = () => {
        return close(active)
    }

    const closeOther = () => {
        const newPages = [...pages]?.filter(item => item.url === active)
        const removeUrls = [...pages]?.filter(item => item.url !== active).map(item => item.url)
        // remove cache
        removeUrls.forEach(url => {
            keepAliveRef.current?.removeCache(url)
        })
        lastOpenUrl.current = active
        setPages(newPages)
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
                closeOther,
            }}
        >
            {messageEle}
            {children}
        </PageContext.Provider>
    )
}

export default PageManageProvider
