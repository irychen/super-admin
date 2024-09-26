import { memo, ReactNode, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Dropdown, MenuProps } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { findRouteByAbsolutePath } from "@/router"
import { openTabPage } from "@/store/tabs"
import cn from "@/utils/cn"

function Breadcrumbs() {
    console.log("Breadcrumbs render")

    const location = useLocation()
    const { t, i18n } = useTranslation()
    const url = useMemo(() => {
        return location.pathname
    }, [location.pathname])

    const nodes = useMemo(() => {
        const r: ReactNode[] = []
        const route = findRouteByAbsolutePath(url)
        if (route) {
            const breadcrumbs = [...(route.breadcrumbs || [])]
            breadcrumbs.shift()
            for (let i = 0; i < breadcrumbs.length; i++) {
                const item = breadcrumbs[i]
                const isLast = i === breadcrumbs.length - 1
                const subRoutes = item.subRoutes || []
                r.push(
                    <Dropdown
                        trigger={["click"]}
                        menu={{
                            items: subRoutes.map(subRoute => {
                                return {
                                    key: subRoute.absolutePath,
                                    label: t(`layout.menu.${subRoute.meta?.title}`),
                                    onClick: () => {
                                        openTabPage({
                                            url: subRoute.absolutePath!,
                                            title: subRoute.meta?.title as string,
                                        })
                                    },
                                }
                            }) as MenuProps["items"],
                        }}
                        key={item.absolutePath}
                    >
                        <span
                            className={cn("px-[10px]", {
                                "text-[#222] dark:text-[#ccc]": isLast,
                                "text-[#888] dark:text-[#999]": !isLast,
                                "cursor-pointer": !isLast && subRoutes.length > 0,
                            })}
                            key={item.absolutePath}
                        >
                            {t(`layout.menu.${item.meta?.title}`)}
                            {!isLast && subRoutes.length > 0 && <DownOutlined className={"ml-[6px]"} />}
                        </span>
                    </Dropdown>,
                )
                if (i < breadcrumbs.length - 1) {
                    r.push(
                        <span className={"text-[#888]"} key={"divider_" + i}>
                            /
                        </span>,
                    )
                }
            }
        }
        return r
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, i18n.language])

    return <div className={"flex items-center flex-wrap"}>{nodes}</div>
}

export default memo(Breadcrumbs)
