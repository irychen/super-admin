import { ReactNode, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { findAdminRouteByUrl } from "@/router/config.tsx"
import { useTranslation } from "react-i18next"
import { classNames } from "fortea"
import { Dropdown, MenuProps } from "antd"
import usePageContext from "@/components/AdminPagesProvider/usePageContext"
import { DownOutlined } from "@ant-design/icons"

function Breadcrumbs() {
    const { open } = usePageContext()
    const location = useLocation()
    const { t, i18n } = useTranslation()
    const url = useMemo(() => {
        return location.pathname
    }, [location.pathname])

    const nodes = useMemo(() => {
        const r: ReactNode[] = []
        const route = findAdminRouteByUrl(url)
        if (route) {
            const breadcrumbs = route.breadcrumbs || []
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
                                        open({
                                            label: t(`layout.menu.${subRoute.meta?.title}`),
                                            url: subRoute.absolutePath as string,
                                        })
                                    },
                                }
                            }) as MenuProps["items"],
                        }}
                        key={item.absolutePath}
                    >
                        <span
                            className={classNames("px-[10px]", {
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
    }, [url, i18n.language])

    return <div className={"flex items-center flex-wrap"}>{nodes}</div>
}

export default Breadcrumbs
