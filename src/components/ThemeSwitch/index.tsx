import { useAppConfig } from "@/store/config.ts"
import { IconBrightnessFilled, IconMoon, IconSun } from "@tabler/icons-react"
import { ComponentType } from "react"
import { classNames } from "fortea"

type Themes = "light" | "dark" | "system"

const IconMap = {
    system: IconBrightnessFilled,
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
    const { themeMode, update } = useAppConfig()
    const themes: Themes[] = ["light", "dark", "system"]
    const toggleTheme = () => {
        const index = themes.indexOf((themeMode || "light") as Themes)
        const nextIndex = (index + 1) % themes.length
        const next = themes[nextIndex]
        update(state => {
            state.themeMode = next
        })
    }
    const Icon = IconMap[themeMode || "light"]

    return (
        <button
            className={classNames(
                className,
                "flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36]",
            )}
            onClick={toggleTheme}
        >
            <Icon size={size} stroke={stroke} />
        </button>
    )
}

export default ThemeSwitch
