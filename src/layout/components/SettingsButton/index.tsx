import { CSSProperties, Fragment, useState } from "react"
import {
    IconArrowsMaximize,
    IconArrowsMinimize,
    IconBrightnessFilled,
    IconMoon,
    IconSettings,
    IconSun,
    IconX,
} from "@tabler/icons-react"
import { Drawer, Space, Switch } from "antd"
import { classNames } from "fortea"
import { useAppConfig } from "@/store/config.ts"
import { css } from "@emotion/react"
import screenfull from "screenfull"
import { useTranslation } from "react-i18next"
import { useThemeToken } from "@/hooks"
import Color from "color"

function SettingsButton() {
    const { t } = useTranslation()
    const [openDrawer, setOpenDrawer] = useState(false)
    const { themeMode, update, showBreadcrumb } = useAppConfig()
    const themeModeClass = classNames(
        "w-[80px] flex flex-col justify-center items-center text-md font-bold cursor-pointer",
        "text-[#637381] h-[80px] border rounded dark:border-[#555] dark:text-[#666]",
        "mode-item",
    )

    const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen)
    const toggleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle()
            setIsFullscreen(!isFullscreen)
        }
    }

    const { colorBgContainer } = useThemeToken()
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
                footer={
                    <div>
                        <button
                            className={
                                "w-full h-[36px] flex items-center justify-center text-[#637381] dark:text-[#aaa] text-md font-bold  border dark:border-[#555] dark:bg-[#161C24] cursor-pointer"
                            }
                            onClick={toggleFullScreen}
                        >
                            {!isFullscreen ? (
                                <IconArrowsMaximize className={"mr-[8px]"} stroke={1.2} size={18} />
                            ) : (
                                <IconArrowsMinimize className={"mr-[8px]"} size={18} stroke={1.2} />
                            )}
                            {!isFullscreen ? t("layout.drawer.screen_full") : t("layout.drawer.screen_exit")}
                        </button>
                    </div>
                }
                styles={{
                    mask: { backgroundColor: "transparent" },
                }}
                title={t("layout.drawer.settings")}
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
                width={300}
            >
                <div className={"text-[#637381] dark:text-[#DCDDDE] text-md font-bold"}>
                    {t("layout.drawer.theme_mode")}
                </div>
                <div
                    className={"flex mt-[10px]"}
                    css={css`
                        ${themeMode === "light"
                            ? `.mode-item[data-mode="light"] { border-color: var(--color-primary); color: var(--color-primary); }`
                            : ""}
                        ${themeMode === "dark"
                            ? `.mode-item[data-mode="dark"] { border-color: var(--color-primary); color: var(--color-primary);}`
                            : ""}
                        ${themeMode === "system"
                            ? `.mode-item[data-mode="system"] { border-color: var(--color-primary); color: var(--color-primary);}`
                            : ""}
                    `}
                >
                    <Space>
                        <div
                            data-mode={"light"}
                            className={themeModeClass}
                            onClick={() => {
                                update(state => {
                                    state.themeMode = "light"
                                })
                            }}
                        >
                            <IconSun stroke={1.2} />
                            <div className={"text-[12px] mt-[8px] text-center"}>{t("layout.drawer.theme_light")}</div>
                        </div>
                        <div
                            data-mode={"dark"}
                            className={themeModeClass}
                            onClick={() => {
                                update(state => {
                                    state.themeMode = "dark"
                                })
                            }}
                        >
                            <IconMoon stroke={1.2} />
                            <div className={"text-[12px] mt-[8px] text-center"}>{t("layout.drawer.theme_dark")}</div>
                        </div>
                        <div
                            data-mode={"system"}
                            className={themeModeClass}
                            onClick={() => {
                                update(state => {
                                    state.themeMode = "system"
                                })
                            }}
                        >
                            <IconBrightnessFilled stroke={1.2} />
                            <div className={"text-[12px] mt-[8px] text-center"}>{t("layout.drawer.theme_system")}</div>
                        </div>
                    </Space>
                </div>
                <div className={"text-[#637381] dark:text-[#DCDDDE] text-md font-bold mt-[20px]"}>
                    {t("layout.drawer.others")}
                </div>
                <div className={"py-[4px]"}>
                    <div className={"flex items-center justify-between text-[#999] my-[8px]"}>
                        {t("layout.drawer.breadcrumb")}{" "}
                        <Switch
                            checked={showBreadcrumb}
                            onChange={checked => {
                                update(state => {
                                    state.showBreadcrumb = checked
                                })
                            }}
                            size={"small"}
                        />
                    </div>
                </div>
            </Drawer>
            <button
                onClick={() => {
                    setOpenDrawer(true)
                }}
                className={
                    "text-[#637381] cursor-pointer flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36]"
                }
            >
                <IconSettings className={"text-[#637381]"} size={20} stroke={1.5}></IconSettings>
            </button>
        </Fragment>
    )
}

export default SettingsButton
