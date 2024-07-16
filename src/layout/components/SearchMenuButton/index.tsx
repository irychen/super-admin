import { Fragment, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { IconArrowDown, IconArrowUp, IconSearch } from "@tabler/icons-react"
import { Divider, Empty, Input, InputRef, Modal } from "antd"
import { adminRoutesWithAbsolutePath, RouteConfig } from "@/router/config.tsx"
import { mergePath } from "fortea"
import { useAppUser } from "@/store/user.ts"
import { routeAuthCheck } from "@/utils/auth.ts"
import { css } from "@emotion/react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

type ItemType = {
    key: string
    title: string | undefined
    icon: ReactNode
    url?: string
}

function SearchMenuButton() {
    const { t } = useTranslation()
    const inputRef = useRef<InputRef>(null)
    const { permissions } = useAppUser()
    const [showSearch, setShowSearch] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    const listRef = useRef<HTMLDivElement>(null)

    const menuItems = useMemo(() => {
        const items: ItemType[] = []

        function traverseRoutes(routes: RouteConfig[], upperPath: string) {
            for (let i = 0; i < routes.length; i++) {
                const route = routes[i]
                const thisPath = mergePath(upperPath, route.path)
                const ok = routeAuthCheck(route, permissions)
                if (!ok) continue
                const keywords = route.searchKeyWords || ([] as string[])

                const menuItem: ItemType = {
                    key: thisPath,
                    title: route.meta?.title,
                    icon: route.icon,
                    url: route.absolutePath,
                }
                if (route.children && menuItem) {
                    traverseRoutes(route.children, thisPath)
                }
                if (!route.component || !route?.search) {
                    continue
                }
                if (searchValue && Array.isArray(keywords)) {
                    const ok =
                        keywords.some(keyword => keyword.includes(searchValue)) ||
                        route.path?.includes(searchValue) ||
                        route.meta?.title?.includes(searchValue)
                    if (!ok) {
                        setSelectedIndex(0)
                        continue
                    }
                }
                items.push(menuItem)
            }
        }

        traverseRoutes(adminRoutesWithAbsolutePath, "")
        return items
    }, [permissions, searchValue])

    const keyDownDealingRef = useRef(false)

    // listen to keydown event to navigate and select when search modal is open
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (showSearch) {
                if (e.key === "ArrowDown") {
                    setSelectedIndex(prev => {
                        const next = (prev + 1) % menuItems.length
                        scrollSelectedIntoView(next)
                        return next
                    })
                    keyDownDealingRef.current = true
                }
                if (e.key === "ArrowUp") {
                    setSelectedIndex(prev => {
                        const next = (prev - 1 + menuItems.length) % menuItems.length
                        scrollSelectedIntoView(next)
                        return next
                    })
                    keyDownDealingRef.current = true
                }
                if (e.key === "Enter") {
                    const url = menuItems[selectedIndex].url
                    url && navigate(url)
                    setShowSearch(false)
                }
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [menuItems, selectedIndex, showSearch, setShowSearch])

    // scroll to selected item when selected index changes
    function scrollSelectedIntoView(index: number) {
        if (listRef.current) {
            const item = listRef.current.children[index] as HTMLElement
            item?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
        }
    }

    return (
        <Fragment>
            <Modal
                afterOpenChange={open => {
                    if (open) {
                        inputRef.current?.focus()
                    }
                }}
                styles={{
                    mask: {
                        backgroundColor: "rgba(0,0,0,.2)",
                        // blur
                        backdropFilter: "blur(1px)",
                        // safari blur fix
                        WebkitBackdropFilter: "blur(1px)",
                    } as any,
                }}
                closeIcon={null}
                open={showSearch}
                onCancel={() => {
                    setShowSearch(false)
                }}
                footer={
                    <div className={"w-full flex items-center justify-between"}>
                        <div className={"flex items-center"}>
                            <span
                                className={
                                    "flex items-center justify-center p-2 h-6 rounded-md bg-[#F3F4F5] dark:bg-[#26313C]  text-xs"
                                }
                            >
                                <IconArrowUp size={16} stroke={2.6} />
                            </span>
                            <span
                                className={
                                    "flex items-center justify-center p-2 h-6 rounded-md bg-[#F3F4F5] dark:bg-[#26313C]  text-xs ml-[10px]"
                                }
                            >
                                <IconArrowDown size={16} stroke={2.6} />
                            </span>
                            <span className={"ml-[10px]"}>{t("layout.menu.to_navigate")}</span>
                            {/*enter*/}
                            <span
                                className={
                                    "flex items-center justify-center p-2 h-6 rounded-md bg-[#F3F4F5] dark:bg-[#26313C]  text-xs ml-[10px]"
                                }
                            >
                                Enter
                            </span>
                            <span className={"ml-[10px]"}>{t("layout.menu.to_open")}</span>
                        </div>
                        <span>
                            {t("layout.menu.items_number", {
                                total: menuItems.length,
                            })}
                        </span>
                    </div>
                }
                title={
                    <div>
                        <Input
                            ref={inputRef}
                            value={searchValue}
                            onChange={e => {
                                setSearchValue(e.target.value)
                            }}
                            prefix={<IconSearch size={20} stroke={1.5} />}
                            variant={"borderless"}
                            placeholder={"Input search keywords ..."}
                            autoFocus={true}
                            className={"w-full"}
                            suffix={
                                <button
                                    onClick={() => {
                                        setShowSearch(false)
                                    }}
                                    className={
                                        "flex cursor-pointer items-center justify-center p-2 h-6 rounded-md bg-[#F3F4F5] dark:bg-[#26313C]  text-xs"
                                    }
                                >
                                    ESC
                                </button>
                            }
                        />
                    </div>
                }
            >
                <div
                    className={"py-[5px] scrollbar"}
                    style={{
                        maxHeight: 380,
                        overflowY: "auto",
                    }}
                    ref={listRef}
                    onMouseEnter={() => {
                        keyDownDealingRef.current = false
                    }}
                >
                    {menuItems.map((item, index) => {
                        return (
                            <div key={item.key} className={"search-item"}>
                                <div
                                    onClick={() => {
                                        item.url && navigate(item.url)
                                        setShowSearch(false)
                                    }}
                                    onMouseEnter={() => {
                                        !keyDownDealingRef.current && setSelectedIndex(index)
                                    }}
                                    css={css`
                                        border: ${index === selectedIndex
                                            ? "1px dashed var(--color-primary)"
                                            : "1px solid transparent"};
                                        background-color: ${index === selectedIndex ? "#f5f5f5" : "transparent"};
                                        box-shadow: ${index === selectedIndex ? "0 0 10px 0 rgba(0,0,0,.1)" : "none"};

                                        .dark & {
                                            background-color: ${index === selectedIndex ? "#161C24" : "transparent"};
                                        }
                                    `}
                                    className={
                                        "flex flex-col text-[#666] dark:text-[#eee] cursor-pointer rounded-md px-[15px] py-[12px]"
                                    }
                                >
                                    <div className={"flex items-center justify-between"}>
                                        <div className={"flex items-center"}>
                                            {item.icon && <div className={"mr-[10px]"}>{item.icon}</div>}
                                            <div className={"text-[14px]"}>{t(`layout.menu.${item?.title}`)}</div>
                                        </div>
                                        <div className={"text-[#aaa]"}>{item.url}</div>
                                    </div>
                                </div>
                                <Divider style={{ margin: 0 }} />
                            </div>
                        )
                    })}
                    {menuItems.length === 0 && (
                        <Empty description={<span>{t("layout.menu.no_search_result")}</span>}></Empty>
                    )}
                </div>
            </Modal>
            <button
                onClick={() => {
                    setShowSearch(true)
                }}
                className={
                    "text-[#637381] cursor-pointer flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36]"
                }
            >
                <IconSearch className={"text-[#637381]"} size={20} stroke={1.5}></IconSearch>
            </button>
        </Fragment>
    )
}

export default SearchMenuButton
