import { Spin } from "antd"
import { ReactNode, Suspense } from "react"
import { css } from "@emotion/react"

export function Loading() {
    return (
        <div
            css={css`
                text-align: center;
            `}
            style={{ paddingTop: "20vh", minHeight: "80vh" }}
        >
            <Spin size="large" />
        </div>
    )
}

interface Props {
    children: JSX.Element | ReactNode
}
export function SuspenseLoading({ children }: Props) {
    return <Suspense fallback={<Loading />}>{children}</Suspense>
}
