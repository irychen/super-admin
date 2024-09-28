import { findRouteByAbsolutePath } from "@/router"
import { navigateTo } from "@/utils/navigate"
import { getKeepaliveIns } from "@/utils/keepaliveIns"
import { getLocation } from "@/utils/location"
import { messageApi } from "@/utils/message"
import { isNil } from "ramda"
import { NavigateOptions } from "react-router-dom"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface TabPageItem {
    url: string
    title?: string
    state?: unknown
    // if custom is true, title will keep immutable
    custom?: boolean
}

interface TabsStore {
    tabPages: TabPageItem[]
    getTabPages: () => TabPageItem[]
    setTabPages: (update: (prev: TabPageItem[]) => TabPageItem[]) => void
    addTabPage: (tabPage: TabPageItem) => void
    removeTabPage: (url: string) => void
}

export const useTabsStore = create<TabsStore>()(
    persist(
        (set, get) => ({
            tabPages: [],
            getTabPages: () => get().tabPages,
            setTabPages: (update: (prev: TabPageItem[]) => TabPageItem[]) => set({ tabPages: update(get().tabPages) }),
            addTabPage: (tabPage: TabPageItem) => set(state => ({ tabPages: [...state.tabPages, tabPage] })),
            removeTabPage: (url: string) => set(state => ({ tabPages: state.tabPages.filter(tab => tab.url !== url) })),
        }),
        { name: "tab", storage: createJSONStorage(() => sessionStorage) },
    ),
)

export const tabsStore = {
    getTabPages: () => useTabsStore.getState().getTabPages(),
    setTabPages: (update: (prev: TabPageItem[]) => TabPageItem[]) => useTabsStore.getState().setTabPages(update),
    addTabPage: (tabPage: TabPageItem) => useTabsStore.getState().addTabPage(tabPage),
    removeTabPage: (url: string) => useTabsStore.getState().removeTabPage(url),
}

let lastActiveKey: string

export function openTabPage(tabPage: TabPageItem, options?: NavigateOptions) {
    const location = getLocation()
    const activeKey = location.pathname + location.search
    const route = findRouteByAbsolutePath(activeKey)
    lastActiveKey = activeKey
    const tabPages = tabsStore.getTabPages()
    if (!tabPages.some(tab => tab.url === activeKey)) {
        // if route is not a layout, add it to tabPages
        if (isNil(route?.children)) {
            tabsStore.addTabPage(tabPage)
        }
    }
    if (activeKey === tabPage.url) {
        return
    }
    navigateTo(tabPage.url, {
        state: tabPage.state,
        ...options,
    })
}

export function closeTabPage(url: string) {
    let tabPages = tabsStore.getTabPages()
    const exist = tabPages.some(tab => tab.url === url)
    if (!exist) {
        return
    }
    if (tabPages.length <= 1) {
        messageApi().warning("The last tab page cannot be closed")
        return
    }
    getKeepaliveIns().removeCache(url)
    tabPages = tabPages.filter(tab => tab.url !== url)
    tabsStore.setTabPages(() => [...tabPages])
    const nextActiveItem = tabPages.find(tab => tab.url === lastActiveKey) || tabPages[tabPages.length - 1]
    navigateTo(nextActiveItem.url, {
        state: nextActiveItem.state,
        replace: true,
    })
}
