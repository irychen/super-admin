import type { SVGProps } from "react"

function UimCircleLayer(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                d="M15 2a7 7 0 0 0-6.88 5.737a6 6 0 0 1 8.143 8.143A6.997 6.997 0 0 0 15 2"
                opacity={0.25}
            ></path>
            <circle cx={7} cy={17} r={5} fill="currentColor"></circle>
            <path
                fill="currentColor"
                d="M11 7a6 6 0 0 0-5.97 5.406a4.997 4.997 0 0 1 6.564 6.564A6 6 0 0 0 11 7"
                opacity={0.5}
            ></path>
        </svg>
    )
}

export default UimCircleLayer
