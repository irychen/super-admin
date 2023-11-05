import SpinIcon from "@/assets/Spin-1s-200px.svg"
import { css } from "@emotion/react"
function SpottedLoading({ disableAnimation = false, transparent = true, fullScreen = true }) {
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
                user-select: none;
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
            <img src={SpinIcon} className={"w-[80px] h-[80px]"} alt="spin" />
        </div>
    )
}

export default SpottedLoading
