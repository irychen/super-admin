import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { css } from "@emotion/react"
import { Dropdown } from "antd"
import EmojioneFlagForUsOutlyingIslands from "@/components/icons/EmojioneFlagForUsOutlyingIslands"
import EmojioneFlagForChina from "@/components/icons/EmojioneFlagForChina"

const languageMap = [
    {
        value: "en-US",
        label: (
            <div className={"flex items-center"}>
                <EmojioneFlagForUsOutlyingIslands className={"mr-[8px]"} />
                <span>English</span>
            </div>
        ),
        short: <EmojioneFlagForUsOutlyingIslands />,
    },
    {
        value: "zh-CN",
        label: (
            <div className={"flex items-center"}>
                <EmojioneFlagForChina className={"mr-[8px]"} />
                <span>中文</span>
            </div>
        ),
        short: <EmojioneFlagForChina />,
    },
]

function LanguageSelector() {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        // window.sessionStorage.clear()
        // window.location.reload()
        i18n.changeLanguage(lng)
    }

    const currentLang = useMemo(() => {
        return languageMap.find(item => item.value === i18n.language)
    }, [i18n.language])

    return (
        <div
            css={css`
                display: flex;
                justify-content: center;

                .language-selector {
                    padding: 5px 10px;
                    margin: 0 5px;
                    cursor: pointer;
                    border-radius: 5px;
                    color: #333;
                    background-color: #f5f5f5;

                    &.active {
                        background-color: #1890ff;
                        color: #fff;
                    }
                }
            `}
        >
            <Dropdown
                trigger={["click"]}
                menu={{
                    items: languageMap.map(item => {
                        return {
                            key: item.value,
                            label: item.label,
                            onClick: () => {
                                changeLanguage(item.value)
                            },
                        }
                    }),
                    activeKey: i18n.language,
                }}
            >
                <button
                    className={
                        "text-[#637381] cursor-pointer flex items-center justify-center p-[8px] hover:bg-[#f5f5f5] rounded-[50%] dark:hover:bg-[#212B36] w-[36px] h-[36px] "
                    }
                >
                    <div className={"flex items-center justify-center text-[22px]"}>{currentLang?.short}</div>
                </button>
            </Dropdown>
        </div>
    )
}

export default LanguageSelector
