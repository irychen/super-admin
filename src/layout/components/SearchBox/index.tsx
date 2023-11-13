import { Fragment, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { RouteConfig } from "@/router/config.tsx"
import { filter, isNil } from "ramda"
import mergePath from "@/utils/mergePath.ts"
import { Divider, Input, InputRef, Modal } from "antd"
import { classNames } from "@/utils"
import { PageConfig, usePageContext } from "@/providers/PageManageProvider"
import { css } from "@emotion/react"

export type SearchBoxListItemType = {
    name: string
    title: string
    path: string
    icon?: ReactNode | null
    keys: string[]
    crumbs: string[]
}

function getSearchMap(route: RouteConfig) {
    const searchList: SearchBoxListItemType[] = []
    function getSearchList(routes: RouteConfig[], path?: string, upperCrumbs?: string[]) {
        for (let i = 0; i < routes.length; i++) {
            const crumbs = upperCrumbs ? [...upperCrumbs] : []
            const route = routes[i]
            crumbs.push(route.meta?.title as string)
            const thisPath = mergePath(route.path, path)
            if (route.search && isNil(route.children)) {
                const keys = route.searchKeyWords ?? []
                keys.push(route.name)
                !isNil(route.meta?.title) && keys.push(route.meta?.title as string)
                searchList.push({
                    name: route.name,
                    title: route.meta?.title ?? "",
                    path: thisPath + (route.searchParam ? "?" + route.searchParam : ""),
                    icon: route.icon,
                    keys: keys,
                    crumbs,
                })
            }
            if (!isNil(route.children)) {
                getSearchList(route.children, thisPath, crumbs)
            }
        }
    }

    getSearchList(route.children || [])
    return searchList
}

type SearchBoxProps = {
    open?: boolean
    onSearch?: (value: string) => void
    onClose?: () => void
    route: RouteConfig
}

function SearchBox(props: SearchBoxProps) {
    const { route } = props
    const { open } = usePageContext()
    const [searchKeyWord, setSearchKeyWord] = useState<string | undefined>(undefined)
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined)
    const searchMap = useMemo(() => {
        return getSearchMap(route)
    }, [route])

    const showSearchResult = useMemo(() => {
        if (!searchKeyWord) {
            return []
        }
        return filter(item => {
            for (let i = 0; i < item.keys.length; i++) {
                const key = item.keys[i]
                if (key.includes(searchKeyWord)) {
                    return true
                }
            }
            return false
        }, searchMap)
    }, [searchKeyWord, searchMap])

    const setSelectedIndexByOffset = useCallback(
        (offset: number) => {
            if (showSearchResult.length === 0) {
                return
            }
            if (selectedIndex === undefined) {
                setSelectedIndex(0)
                return
            }
            let index = selectedIndex + offset
            if (index < 0) {
                index = showSearchResult.length - 1
            }
            if (index >= showSearchResult.length) {
                index = 0
            }
            setSelectedIndex(index)
        },
        [selectedIndex, setSelectedIndex, showSearchResult],
    )

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                setSelectedIndexByOffset(-1)
            }
            if (e.key === "ArrowDown") {
                setSelectedIndexByOffset(1)
            }
            if (e.key === "Enter") {
                if (selectedIndex !== undefined) {
                    const target = showSearchResult[selectedIndex]
                    if (target) {
                        open({
                            key: target.path,
                            label: target.title,
                        } as PageConfig)
                    }
                    props.onClose && props.onClose()
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [setSelectedIndexByOffset, selectedIndex])

    // auto focus
    const inputRef = useRef<InputRef>(null)

    useEffect(() => {
        if (props.open) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        } else {
            inputRef.current?.blur()
        }
    }, [props.open, inputRef])

    return (
        <Modal
            width={580}
            title="搜索"
            open={props.open}
            onCancel={() => {
                props.onClose && props.onClose()
            }}
            footer={null}
            styles={{
                body: {
                    padding: 0,
                    paddingTop: 10,
                },
            }}
        >
            <div className={"query-input"}>
                <Input
                    ref={inputRef}
                    allowClear
                    size={"large"}
                    value={searchKeyWord}
                    onChange={e => {
                        setSearchKeyWord(e.target.value)
                    }}
                    placeholder={"请输入关键字, 支持路由名称和路由标题"}
                />
            </div>
            <div className={"query-result mt-[20px] max-h-[300px] overflow-y-auto"}>
                {showSearchResult.map((item, index) => {
                    return (
                        <Fragment key={item.path}>
                            <div
                                key={item.path}
                                className={classNames(
                                    "flex  items-center query-result-item justify-between cursor-pointer  px-[10px] py-[8px] ",
                                    "rounded-md",
                                    "transition duration-200 ease-in-out mb-2",
                                    {
                                        "bg-[#2571D2] active:bg-[#2571D2] shadow-md": selectedIndex === index,
                                        "hover:bg-[#f1f1f1] active:bg-[#f1f1f1] bg-[#f9f9f9]": selectedIndex !== index,
                                        "dark:bg-[#2571D2] dark:active:bg-[#2571D2]  text-white":
                                            selectedIndex === index,
                                        "dark:hover:bg-[#303133] dark:active:bg-[#303133]": selectedIndex !== index,
                                    },
                                )}
                                onClick={() => {
                                    open({
                                        key: item.path,
                                        label: item.title,
                                    } as PageConfig)
                                    props.onClose && props.onClose()
                                }}
                            >
                                <div className={"flex items-center"}>
                                    {item.icon && <div className={"query-result-item-icon mr-[10px]"}>{item.icon}</div>}
                                    <div className={"query-result-item-title"}>{item.title}</div>
                                </div>
                                <div className={"text-[12px] inline-block"}>{item.crumbs.join(" / ")}</div>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </Modal>
    )
}

export default SearchBox
