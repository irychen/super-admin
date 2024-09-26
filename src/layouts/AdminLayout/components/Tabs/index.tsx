import { css } from "@emotion/react"
import { IconDots, IconRefresh, IconX } from "@tabler/icons-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd"
import { base64 } from "fortea"
import { Dropdown, MenuProps } from "antd"
import { closeTabPage, openTabPage, useTabsStore } from "@/store/tabs"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import qs from "qs"
import { getKeepaliveIns } from "@/utils/keepaliveIns"
import { useAntdThemeToken } from "@/hooks"

function Tabs() {
    const tabPages = useTabsStore(state => state.tabPages)
    const { t } = useTranslation()
    const { colorPrimary } = useAntdThemeToken()
    const setTabPages = useTabsStore(state => state.setTabPages)
    const location = useLocation()

    const active = useMemo(() => {
        return location.pathname + location.search
    }, [location.pathname, location.search])

    const scrollContainer = useRef<HTMLDivElement>(null)
    // listen wheel event to scroll
    useEffect(() => {
        const container = scrollContainer.current
        if (container) {
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault()
                const x_abs = Math.abs(e.deltaX)
                const y_abs = Math.abs(e.deltaY)
                container.scrollLeft += x_abs > y_abs ? e.deltaX : e.deltaY
            }
            container.addEventListener("wheel", handleWheel)
            return () => {
                container.removeEventListener("wheel", handleWheel)
            }
        }
    }, [])

    const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
        // 拖拽到非法非 droppable区域
        if (!destination) {
            return
        }
        // 原地放下
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        const newTabs = Array.from(tabPages)
        const [movedTab] = newTabs.splice(source.index, 1)
        newTabs.splice(destination.index, 0, movedTab)
        setTabPages(() => {
            return newTabs
        })
    }

    // scroll to active tab
    useEffect(() => {
        const container = scrollContainer.current
        if (container) {
            const activeTab = container.querySelector(`#tab-${base64.encode(active)?.replace(/=/g, "")}`)
            if (activeTab) {
                activeTab.scrollIntoView()
            }
        }
    }, [active])

    return (
        <div
            className={"tabs w-full h-full flex"}
            css={css`
                border-bottom: 1px solid #eee;
                .dark & {
                    border-color: #303030;
                }
            `}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tabs" direction="horizontal">
                    {provided => (
                        <div
                            className={"w-full flex-shrink-1"}
                            css={css`
                                width: calc(100% - 84px);
                            `}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div
                                className={""}
                                css={css`
                                    display: flex;
                                    overflow-x: auto;
                                    scrollbar-width: none;
                                    padding-left: 8px;
                                    ::-webkit-scrollbar {
                                        display: none;
                                    }

                                    -webkit-overflow-scrolling: touch;
                                `}
                                ref={scrollContainer}
                            >
                                {tabPages.map((item, index) => (
                                    <Draggable key={item.url} draggableId={item.url} index={index}>
                                        {provided => {
                                            const search = item.url.split("?")[1]
                                            const params = search ? qs.parse(search) : {}
                                            const suffix = params.type ? t(`pageType.${params.type}`) : ""

                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    id={`tab-${base64.encode(item.url)?.replace(/=/g, "")}`}
                                                    data-key={item.url}
                                                    css={css`
                                                        padding: 0 16px;
                                                        flex-shrink: 0;
                                                        display: flex;
                                                        min-width: 90px;
                                                        align-items: center;
                                                        height: 36px;
                                                        color: ${active === item.url ? colorPrimary : "#555"};
                                                        margin-right: 4px;
                                                        background-color: ${active === item.url
                                                            ? "#f5f7f8"
                                                            : "#F7F7F7"};
                                                        border-radius: 8px 8px 0 0;
                                                        transition: background-color 0.2s;

                                                        .dark & {
                                                            border-color: #303030;
                                                            color: ${active === item.url ? colorPrimary : "#DCDDDE"};
                                                            background-color: ${active === item.url
                                                                ? "#212B36"
                                                                : "#1b232c"};
                                                        }

                                                        &:hover {
                                                            color: ${colorPrimary};
                                                            background-color: #f5f7f8;

                                                            .dark & {
                                                                color: ${colorPrimary};
                                                                background-color: #212b36;
                                                            }
                                                        }

                                                        &:hover {
                                                            .tab-close-btn {
                                                                opacity: 1;
                                                                width: 20px;
                                                                padding-left: 6px;
                                                            }
                                                        }
                                                        &:active {
                                                            .tab-close-btn {
                                                                opacity: 1;
                                                                width: 20px;
                                                                padding-left: 6px;
                                                            }
                                                        }

                                                        .tab-close-btn {
                                                            transition:
                                                                opacity 0.2s,
                                                                width 0.2s,
                                                                padding-left 0.2s;
                                                            opacity: ${active === item.url ? 1 : 0};
                                                            width: ${active === item.url ? 20 : 0}px;
                                                            padding-left: ${active === item.url ? 6 : 0}px;
                                                        }
                                                    `}
                                                    onClick={() => {
                                                        openTabPage(item)
                                                    }}
                                                >
                                                    <div
                                                        className={"w-full flex-shrink-0"}
                                                        css={css`
                                                            display: flex;
                                                            align-items: center;
                                                            text-align: center;
                                                            justify-content: center;
                                                        `}
                                                    >
                                                        <div
                                                            className={"flex-shrink-0 select-none"}
                                                            data-title={item.title}
                                                        >
                                                            {item.custom
                                                                ? item.title
                                                                : t(`layout.menu.${item.title}`) + suffix}
                                                        </div>
                                                        {tabPages.length > 1 && (
                                                            <div
                                                                className={
                                                                    "tab-close-btn pr-0 flex-shrink-0 cursor-pointer opacity-0 overflow-hidden w-[0px]"
                                                                }
                                                                onClick={e => {
                                                                    e.stopPropagation()
                                                                    closeTabPage(item.url)
                                                                }}
                                                            >
                                                                <IconX stroke={1.5} size={16} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className={"w-[84px] h-full flex justify-around items-center flex-shrink-0"} css={css``}>
                <PagesController />
                <PageRefreshButton />
            </div>
        </div>
    )
}

function PageRefreshButton() {
    const [animate, setAnimate] = useState(false)
    return (
        <div
            className={
                "w-[36px] h-[34px] rounded bg-[#FDFCFC] dark:bg-[#161C24] flex items-center justify-center cursor-pointer"
            }
            onClick={() => {
                const keepaliveIns = getKeepaliveIns()
                keepaliveIns?.refresh()
                setAnimate(true)
                setTimeout(() => {
                    setAnimate(false)
                }, 1000)
            }}
        >
            <IconRefresh stroke={1.5} size={16} className={animate ? "animate-spin" : ""} />
        </div>
    )
}

function PagesController() {
    const { t } = useTranslation()

    const location = useLocation()
    const activeKey = location.pathname + location.search
    const setTabPages = useTabsStore(state => state.setTabPages)

    const items: MenuProps["items"] = [
        {
            key: "close-others",
            label: t("layout.tabs_function.close_other"),
            onClick: () => {
                setTabPages(tabPages => {
                    return tabPages.filter(tab => tab.url === activeKey)
                })
            },
        },
        {
            key: "close-left",
            label: t("layout.tabs_function.close_left"),
            onClick: () => {
                setTabPages(tabPages => {
                    const currentIndex = tabPages.findIndex(tab => tab.url === activeKey)
                    // check if currentIndex is 0
                    if (currentIndex === 0) {
                        return tabPages
                    } else {
                        return tabPages.slice(currentIndex)
                    }
                })
            },
        },
        {
            key: "close-right",
            label: t("layout.tabs_function.close_right"),
            onClick: () => {
                setTabPages(tabPages => {
                    const currentIndex = tabPages.findIndex(tab => tab.url === activeKey)
                    if (currentIndex === tabPages.length - 1) {
                        return tabPages
                    } else {
                        return tabPages.slice(0, currentIndex + 1)
                    }
                })
            },
        },
    ]

    return (
        <Dropdown
            menu={{
                items,
            }}
        >
            <div
                className={
                    "w-[36px] h-[34px] rounded bg-[#FDFCFC] dark:bg-[#161C24] flex items-center justify-center cursor-pointer"
                }
            >
                <IconDots stroke={1.5} size={16} />
            </div>
        </Dropdown>
    )
}

export default Tabs
