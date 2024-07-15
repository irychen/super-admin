import { css } from "@emotion/react"
import { IconDots, IconX } from "@tabler/icons-react"
import { useEffect, useRef } from "react"
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd"
import { base64 } from "fortea"
import usePageContext from "@/components/AdminPagesProvider/usePageContext"
import { Dropdown, MenuProps } from "antd"

interface TabsProps {
    active: string
    onChange: (key: string) => void
    items: { key: string; label: string }[]
    onClose?: (key: string) => void
}

function Tabs(props: TabsProps) {
    const { active, onChange, items, onClose } = props
    const { setPages, pages } = usePageContext()

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

        const newTabs = Array.from(pages)
        const [movedTab] = newTabs.splice(source.index, 1)
        newTabs.splice(destination.index, 0, movedTab)
        setPages(newTabs)
    }

    // scroll to active tab
    useEffect(() => {
        const container = scrollContainer.current
        if (container) {
            const activeTab = container.querySelector(`#tab-${base64.encode(active)?.replace(/=/g, "")}`)
            if (activeTab) {
                activeTab.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth",
                })
            }
        }
    }, [active])

    return (
        <div
            className={"tabs w-full h-full  flex"}
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
                                width: calc(100% - 42px);
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

                                    ::-webkit-scrollbar {
                                        display: none;
                                    }

                                    -webkit-overflow-scrolling: touch;
                                `}
                                ref={scrollContainer}
                            >
                                {items.map((item, index) => (
                                    <Draggable key={item.key} draggableId={item.key} index={index}>
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                id={`tab-${base64.encode(item.key)?.replace(/=/g, "")}`}
                                                data-key={item.key}
                                                css={css`
                                                    padding: 0 16px;
                                                    padding-right: 8px;
                                                    flex-shrink: 0;
                                                    display: flex;
                                                    min-width: 70px;
                                                    align-items: center;
                                                    height: 36px;
                                                    color: ${active === item.key ? "var(--color-primary)" : "#555"};
                                                    margin-right: 4px;
                                                    background-color: ${active === item.key ? "#f5f7f8" : "#f8f8f8"};
                                                    border-radius: 4px 4px 0 0;
                                                    transition: background-color 0.2s;

                                                    .dark & {
                                                        border-color: #303030;
                                                        color: ${active === item.key
                                                            ? "var(--color-primary)"
                                                            : "#DCDDDE"};
                                                        background-color: ${active === item.key
                                                            ? "#212B36"
                                                            : "#1b232c"};
                                                    }

                                                    &:hover {
                                                        color: var(--color-primary);
                                                        background-color: #f5f7f8;

                                                        .dark & {
                                                            color: var(--color-primary);
                                                            background-color: #212b36;
                                                        }
                                                    }

                                                    &:hover {
                                                        .tab-close-btn {
                                                            opacity: 1;
                                                        }
                                                    }
                                                    &:active {
                                                        .tab-close-btn {
                                                            opacity: 1;
                                                        }
                                                    }

                                                    .tab-close-btn {
                                                        opacity: ${active === item.key ? 1 : 0};
                                                    }
                                                `}
                                                onClick={() => {
                                                    onChange(item.key)
                                                }}
                                            >
                                                <div
                                                    className={"w-full flex-shrink-0"}
                                                    css={css`
                                                        display: flex;
                                                        align-items: center;
                                                        text-align: center;
                                                        justify-content: space-between;
                                                    `}
                                                >
                                                    <div className={"flex-shrink-0 select-none"}>{item.label}</div>
                                                    {items.length > 1 && (
                                                        <div
                                                            className={
                                                                "tab-close-btn ml-[5px] p-[6px] flex-shrink-0 cursor-pointer opacity-0"
                                                            }
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                onClose && onClose(item.key)
                                                            }}
                                                        >
                                                            <IconX stroke={1.5} size={16} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className={"w-[42px] h-full flex justify-end items-center flex-shrink-0"} css={css``}>
                <PagesController />
            </div>
        </div>
    )
}

function PagesController() {
    const { closeOther } = usePageContext()

    const items: MenuProps["items"] = [
        {
            key: "close-others",
            label: "关闭其他",
            onClick: () => {
                console.log("close others")
                closeOther()
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
