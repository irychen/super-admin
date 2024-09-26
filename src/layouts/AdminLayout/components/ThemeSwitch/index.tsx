import { IconBrightness, IconMoon, IconSun } from "@tabler/icons-react"
import { ComponentType } from "react"
import { ThemeMode } from "@/types"
import { useSettingsStore } from "@/store/settings"
import cn from "@/utils/cn"

const IconMap = {
    system: IconBrightness,
    light: IconSun,
    dark: IconMoon,
} as Record<
    string,
    ComponentType<{
        size: number
        stroke: number
    }>
>

interface ThemeSwitchProps {
    className?: string
    size?: number
    stroke?: number
}

function ThemeSwitch(props: ThemeSwitchProps) {
    const { className = "", size = 18, stroke = 1.5 } = props
    const themeMode = useSettingsStore(state => state.themeMode)
    const setThemeMode = useSettingsStore(state => state.setThemeMode)

    const themes: ThemeMode[] = [ThemeMode.LIGHT, ThemeMode.DARK, ThemeMode.SYSTEM]

    const toggleTheme = async () => {
        const index = themes.indexOf((themeMode || ThemeMode.SYSTEM) as ThemeMode)
        const nextIndex = (index + 1) % themes.length
        const next = themes[nextIndex]
        setThemeMode(next)
    }

    const Icon = IconMap[themeMode || ThemeMode.SYSTEM]

    return (
        <button
            className={cn(
                className,
                "flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36]",
            )}
            onClick={() => {
                toggleTheme()
            }}
        >
            <Icon size={size} stroke={stroke} />
        </button>
    )
}

export default ThemeSwitch
