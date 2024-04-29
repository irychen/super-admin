import { css } from "@emotion/react"
import { IconX } from "@tabler/icons-react"
import { useEffect, useRef } from "react"
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd"
import { base64 } from "fortea"
import usePageContext from "@/components/AdminPagesProvider/usePageContext"

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
        <div className={"tabs w-full"}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tabs" direction="horizontal">
                    {provided => (
                        <div className={"w-full"} {...provided.droppableProps} ref={provided.innerRef}>
                            <div
                                className={"px-[7px]"}
                                css={css`
                                    width: 100%;
                                    display: flex;
                                    overflow-x: auto;
                                    scrollbar-width: none;
                                    border-bottom: 1px solid #eee;
                                    ::-webkit-scrollbar {
                                        display: none;
                                    }
                                    -webkit-overflow-scrolling: touch;
                                    .dark & {
                                        border-color: #303030;
                                    }
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
                                                className={"mx-[2px]"}
                                                id={`tab-${base64.encode(item.key)?.replace(/=/g, "")}`}
                                                data-key={item.key}
                                                css={css`
                                                    padding: 0 16px;
                                                    display: flex;
                                                    min-width: 70px;
                                                    align-items: center;
                                                    flex-shrink: 0;
                                                    height: 32px;
                                                    color: ${active === item.key ? "#1890ff" : "#555"};
                                                    border: 1px solid #eee;
                                                    border-bottom: 0 none;
                                                    background-color: ${active === item.key ? "#fff" : "#f8f8f8"};
                                                    border-radius: 8px 8px 0 0;
                                                    transition: background-color 0.2s;

                                                    .dark & {
                                                        border-color: #303030;
                                                        color: ${active === item.key ? "#1890ff" : "#DCDDDE"};
                                                        background-color: ${active === item.key
                                                            ? "#212B36"
                                                            : "#161C24"};
                                                    }

                                                    &:hover {
                                                        color: #1890ff;
                                                        background-color: #fff;

                                                        .dark & {
                                                            color: #1890ff;
                                                            background-color: #212b36;
                                                        }
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
                                                            className={"ml-[5px] p-[2px] flex-shrink-0 cursor-pointer"}
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
        </div>
    )
}

export default Tabs
