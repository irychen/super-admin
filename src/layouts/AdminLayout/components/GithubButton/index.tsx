import LineMdGithubTwotone from "@/components/icons/LineMdGithubTwotone"

function GithubButton() {
    const link = "https://github.com/irychen/super-admin"
    return (
        <button
            onClick={() => {
                window.open(link, "_blank")
            }}
            className={
                "text-[#637381] cursor-pointer flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36]"
            }
        >
            <LineMdGithubTwotone className={"text-[#637381]"} width={24} height={24} />
        </button>
    )
}

export default GithubButton
