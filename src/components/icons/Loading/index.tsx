import type { SVGProps } from "react"

function Loading(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="28"
            height="30"
            viewBox="0 0 28 20"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <style>
                {`
                    .spinner_bar {
                        animation: spinner_animation 0.8s linear infinite;
                    }
                    .spinner_bar:nth-child(1) {
                        animation-delay: -0.8s;
                    }
                    .spinner_bar:nth-child(2) {
                        animation-delay: -0.65s;
                    }
                    .spinner_bar:nth-child(3) {
                        animation-delay: -0.5s;
                    }
                    @keyframes spinner_animation {
                        0% {
                            y: 1px;
                            height: 22px;
                        }
                        93.75% {
                            y: 5px;
                            height: 14px;
                            opacity: 0.2;
                        }
                    }
                `}
            </style>
            <rect className="spinner_bar" fill="currentColor" x="1" y="1" width="6" height="22" />
            <rect className="spinner_bar" fill="currentColor" x="11" y="1" width="6" height="22" />
            <rect className="spinner_bar" fill="currentColor" x="21" y="1" width="6" height="22" />
        </svg>
    )
}

export default Loading
