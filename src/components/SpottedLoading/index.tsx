import SpinIcon from "@/assets/Spin-1s-200px.svg"
import { css } from "@emotion/react"

function SpottedLoading({
    disableAnimation = false,
    transparent = true,
    fullScreen = true,
    showMessage = true,
    message = "正在拼命加载...",
}) {
    return (
        <div
            css={css`
                position: ${fullScreen ? "fixed" : "relative"};
                top: 0;
                left: 0;
                z-index: 2000;
                width: 100%;
                height: min(100vh, 100%);
                background-color: ${transparent ? "rgba(0, 0, 0, 0.05)" : "#F0F2F5"};
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                user-select: none;
                color: #3985dc;
                // 淡入
                animation: ${disableAnimation ? "none" : "fadeIn 0.3s ease-in-out"};
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}
            className="my-loading "
        >
            <Loading />
            {showMessage && (
                <div
                    css={css`
                        margin-top: 16px;
                    `}
                >
                    {message}
                </div>
            )}
        </div>
    )
}

type LoadingProps = {
    size?: number
    className?: string
}

export function Loading(props: LoadingProps) {
    const { size = 80, className = "" } = props
    return (
        <div className={"flex justify-center items-center " + className}>
            <img src={SpinIcon} style={{ width: size, height: size }} alt="spin" />
        </div>
    )
}

export default SpottedLoading
