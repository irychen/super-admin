import { CSSProperties, Fragment, useState } from "react"
import { Badge, Drawer } from "antd"
import { IconX } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import SolarBellBoldDuotone from "@/components/icons/SolarBellBoldDuotone"
import { useAntdThemeToken } from "@/hooks"
import Color from "color"

function NotificationButton() {
    const { t } = useTranslation()
    const [openDrawer, setOpenDrawer] = useState(false)

    const { colorBgContainer } = useAntdThemeToken()
    const style: CSSProperties = {
        backdropFilter: "blur(20px)",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundColor: Color(colorBgContainer).alpha(0.9).toString(),
        backgroundPosition: "right top, left bottom",
        backgroundSize: "50, 50%",
    }
    return (
        <Fragment>
            <Drawer
                style={style}
                styles={{
                    mask: { backgroundColor: "transparent" },
                }}
                title={t("layout.notice.title")}
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
                    <SolarBellBoldDuotone className={"text-[#637381]"} width={24} height={24}></SolarBellBoldDuotone>
                </Badge>
            </button>
        </Fragment>
    )
}

export default NotificationButton
