import { useTranslation } from "react-i18next"
import Loading from "../icons/Loading"
import { useAntdThemeToken } from "@/hooks"
import { memo } from "react"
import cn from "@/utils/cn"

function LoadingArea(props: { className?: string; height?: string }) {
    const { className, height } = props
    const { t } = useTranslation()
    const themeToken = useAntdThemeToken()
    return (
        <div
            className={cn("layout-area w-full flex flex-col items-center justify-center", className)}
            style={{
                color: themeToken.colorPrimary,
                height: height || "100%",
            }}
        >
            <Loading />
            <div className="mt-4 text-[12px] text-gray-500 dark:text-gray-400">{t("loading")}</div>
        </div>
    )
}

export default memo(LoadingArea)
