import { Fragment, useState } from "react"
import { Badge, Drawer } from "antd"
import { IconBell, IconX } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

function NotificationButton() {
    const { t } = useTranslation()
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <Fragment>
            <Drawer
                styles={{
                    mask: { backgroundColor: "transparent" },
                }}
                title={t("layout.drawer.notifications")}
                placement="right"
                extra={
                    <button
                        onClick={() => {
                            setOpenDrawer(false)
                        }}
                        className={
                            "text-[#637381] hover:scale-105 cursor-pointer flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36]"
                        }
                    >
                        <IconX className={"text-[#637381]"} size={20} stroke={1.5}></IconX>
                    </button>
                }
                closable={false}
                onClose={() => {
                    setOpenDrawer(false)
                }}
                open={openDrawer}
                width={400}
            ></Drawer>
            <button
                onClick={() => {
                    setOpenDrawer(true)
                }}
                className={
                    "text-[#637381] cursor-pointer flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36]"
                }
            >
                <Badge count={5} size={"default"}>
                    <IconBell className={"text-[#637381]"} size={20} stroke={1.5}></IconBell>
                </Badge>
            </button>
        </Fragment>
    )
}

export default NotificationButton
