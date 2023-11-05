import { Spin } from "antd"
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
