import { CSSProperties, Fragment, useState } from "react"
import {
    IconArrowsMaximize,
    IconArrowsMinimize,
    IconBrightnessFilled,
    IconCircleFilled,
    IconMoon,
    IconSun,
    IconX,
} from "@tabler/icons-react"
import { Card, Drawer, Space, Switch } from "antd"
import { classNames } from "fortea"
import { css } from "@emotion/react"
import screenfull from "screenfull"
import { useTranslation } from "react-i18next"
import Color from "color"
import { useAntdThemeToken } from "@/hooks"
import { useSettingsStore } from "@/store/settings"
import { ThemeMode } from "@/types"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import SolarSettingsBoldDuotone from "@/components/icons/SolarSettingsBoldDuotone"

function SettingsButton() {
    const { t } = useTranslation()
    const [openDrawer, setOpenDrawer] = useState(false)
    const themeMode = useSettingsStore(state => state.themeMode)
    const showBreadcrumb = useSettingsStore(state => state.showBreadcrumb)
    const setThemeMode = useSettingsStore(state => state.setThemeMode)
    const setShowBreadcrumb = useSettingsStore(state => state.setShowBreadcrumb)
    const layoutStretch = useSettingsStore(state => state.layoutStretch)
    const setLayoutStretch = useSettingsStore(state => state.setLayoutStretch)
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

    const { colorBgContainer, colorPrimary } = useAntdThemeToken()
    const style: CSSProperties = {
        backdropFilter: "blur(20px)",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundColor: Color(colorBgContainer).alpha(0.9).toString(),
        backgroundPosition: "right top, left bottom",
        backgroundSize: "50, 50%",
    }

    const colorPrimarys = ["#00a76f", "#0780EA", "#7635DC", "#2065D1", "#FDA92D", "#FF3030"]
    const setPrimaryColor = useSettingsStore(state => state.setPrimaryColor)
    const primaryColor = useSettingsStore(state => state.primaryColor)
    const enableMemoizedScollTop = useSettingsStore(state => state.enableMemoizedScollTop)
    const setEnableMemoizedScollTop = useSettingsStore(state => state.setEnableMemoizedScollTop)
    const multiTabs = useSettingsStore(state => state.multiTabs)
    const setMultiTabs = useSettingsStore(state => state.setMultiTabs)
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
                            {!isFullscreen
                                ? t("layout.settings_drawer.screen_full")
                                : t("layout.settings_drawer.screen_exit")}
                        </button>
                    </div>
                }
                styles={{
                    mask: { backgroundColor: "transparent" },
                }}
                title={t("layout.settings_drawer.settings")}
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
                {/* Theme Mode */}
                <div className={"text-[#637381] dark:text-[#DCDDDE] text-md font-bold"}>
                    {t("layout.settings_drawer.theme_mode")}
                </div>
                <div
                    className={"flex mt-[10px]"}
                    css={css`
                        ${themeMode === "light"
                            ? `.mode-item[data-mode="light"] { border-color: ${colorPrimary}; color: ${colorPrimary}; }`
                            : ""}
                        ${themeMode === "dark"
                            ? `.mode-item[data-mode="dark"] { border-color: ${colorPrimary}; color: ${colorPrimary};}`
                            : ""}
                        ${themeMode === "system"
                            ? `.mode-item[data-mode="system"] { border-color: ${colorPrimary}; color: ${colorPrimary};}`
                            : ""}
                    `}
                >
                    <Space>
                        <div
                            data-mode={"light"}
                            className={themeModeClass}
                            onClick={() => {
                                setThemeMode(ThemeMode.LIGHT)
                            }}
                        >
                            <IconSun stroke={1.2} />
                            <div className={"text-[12px] mt-[8px] text-center"}>
                                {t("layout.settings_drawer.theme_light")}
                            </div>
                        </div>
                        <div
                            data-mode={"dark"}
                            className={themeModeClass}
                            onClick={() => {
                                setThemeMode(ThemeMode.DARK)
                            }}
                        >
                            <IconMoon stroke={1.2} />
                            <div className={"text-[12px] mt-[8px] text-center"}>
                                {t("layout.settings_drawer.theme_dark")}
                            </div>
                        </div>
                        <div
                            data-mode={"system"}
                            className={themeModeClass}
                            onClick={() => {
                                setThemeMode(ThemeMode.SYSTEM)
                            }}
                        >
                            <IconBrightnessFilled stroke={1.2} />
                            <div className={"text-[12px] mt-[8px] text-center"}>
                                {t("layout.settings_drawer.theme_system")}
                            </div>
                        </div>
                    </Space>
                </div>

                {/* Layout Spread */}
                <div className={"text-[#637381] dark:text-[#DCDDDE] text-md font-bold mt-[20px]"}>
                    {t("layout.settings_drawer.layout_stretch")}
                </div>
                <Card
                    onClick={() => setLayoutStretch(!layoutStretch)}
                    className="flex h-[60px] w-full cursor-pointer items-center justify-center mt-[10px]"
                    styles={{
                        body: {
                            width: "50%",
                            padding: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        },
                    }}
                >
                    {layoutStretch ? (
                        <div
                            className="flex w-full items-center justify-between"
                            style={{
                                color: colorPrimary,
                                transition: "width 300ms 0ms",
                            }}
                        >
                            <LeftOutlined />
                            <div className="flex flex-grow border-b border-dashed" />
                            <RightOutlined />
                        </div>
                    ) : (
                        <div
                            className="flex w-1/2 items-center justify-between"
                            style={{
                                transition: "width 300ms 0ms",
                            }}
                        >
                            <RightOutlined />
                            <div className="flex-grow border-b border-dashed" />
                            <LeftOutlined />
                        </div>
                    )}
                </Card>

                {/* Primary Color */}
                <div>
                    <div className={"text-[#637381] dark:text-[#DCDDDE] text-md font-bold mt-[20px]"}>
                        {t("layout.settings_drawer.primary_color")}
                    </div>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-3 mt-[10px]">
                        {colorPrimarys.map((color, index) => (
                            <Card
                                key={index}
                                className="flex h-14 w-full cursor-pointer items-center justify-center"
                                onClick={() => {
                                    setPrimaryColor(color)
                                }}
                                style={{
                                    backgroundColor:
                                        primaryColor === color ? Color(color).alpha(0.1).toString() : undefined,
                                }}
                            >
                                <div style={{ color }}>
                                    <IconCircleFilled
                                        // css={css`
                                        //     transition: all 0.3s;
                                        // `}
                                        size={primaryColor === color ? 26 : 16}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className={"text-[#637381] dark:text-[#DCDDDE] text-md font-bold mt-[20px]"}>
                    {t("layout.settings_drawer.others")}
                </div>
                <div className={"py-[4px]"}>
                    <div className={"flex items-center justify-between text-[#999] my-[8px]"}>
                        {t("layout.settings_drawer.breadcrumb")}
                        <Switch
                            checked={showBreadcrumb}
                            onChange={checked => {
                                setShowBreadcrumb(checked)
                            }}
                            size={"small"}
                        />
                    </div>
                    <div className={"flex items-center justify-between text-[#999] my-[8px]"}>
                        {t("layout.settings_drawer.enable_memoized_scroll_top")}
                        <Switch
                            checked={enableMemoizedScollTop}
                            onChange={checked => {
                                setEnableMemoizedScollTop(checked)
                            }}
                            size={"small"}
                        />
                    </div>
                    <div className={"flex items-center justify-between text-[#999] my-[8px]"}>
                        {t("layout.settings_drawer.multi_tabs")}
                        <Switch
                            checked={multiTabs}
                            onChange={checked => {
                                setMultiTabs(checked)
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
                <SolarSettingsBoldDuotone
                    className={"text-[#637381]"}
                    width={24}
                    height={24}
                ></SolarSettingsBoldDuotone>
            </button>
        </Fragment>
    )
}

export default SettingsButton
