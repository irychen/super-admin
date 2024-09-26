import { Space } from "antd"
import LanguageSelector from "../LanguageSelector"
import NotificationButton from "../NotificationButton"
import SearchMenuButton from "../SearchMenuButton"
import ThemeSwitch from "../ThemeSwitch"
import GithubButton from "../GithubButton"
import DiscordButton from "../DiscordButton"
import AvatarAndDropdown from "../AvatarAndDropdown"
import SettingsButton from "../SettingsButton"
import { memo } from "react"

function HeaderControllers() {
    console.log("header controllers render")
    return (
        <div className={"flex items-center"}>
            <Space>
                <SearchMenuButton />
                <NotificationButton />
                <LanguageSelector />
                <ThemeSwitch size={20} className={"text-[#637381]"} />
                <GithubButton />
                <DiscordButton />
                <SettingsButton />
                <AvatarAndDropdown />
            </Space>
        </div>
    )
}

export default memo(HeaderControllers)
