import { IconBrandDiscordFilled } from "@tabler/icons-react"

function DiscordButton() {
    const link = "https://discord.com/channels/1244927477764194384/1244927541568082041"
    return (
        <button
            onClick={() => {
                window.open(link, "_blank")
            }}
            className={
                "text-[#637381] cursor-pointer flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36]"
            }
        >
            <IconBrandDiscordFilled className={"text-[#637381]"} size={20} stroke={1.5}></IconBrandDiscordFilled>
        </button>
    )
}

export default DiscordButton
