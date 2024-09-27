import type { SVGProps } from "react"

function IconParkTwotoneTable(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}>
            <defs>
                <mask id="ipTTable0">
                    <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}>
                        <rect width={32} height={40} x={8} y={4} fill="#555" rx={2}></rect>
                        <path d="M14 16h20m-20 8h20m-20 8h20M18 12v24"></path>
                    </g>
                </mask>
            </defs>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTTable0)"></path>
        </svg>
    )
}

export default IconParkTwotoneTable
