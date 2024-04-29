import { Fragment } from "react"
import { useRouteError } from "react-router-dom"
import { css } from "@emotion/react"
import { Button, Space } from "antd"

function ErrorBoundary() {
    // const error = useRouteError()
    // const errorInfo = error?.toString()
    // console.log("error_info", errorInfo)
    return (
        <Fragment>
            <div className={"error text-center flex flex-col items-center pt-[50px]"}>
                <h1 className={"text-center text-[#666] dark:text-[#ccc] text-8xl font-bold py-[20px]"}>500</h1>
                <h2 className={"text-2xl text-[#222] dark:text-[#aaa] font-bold mb-[10px]"}>
                    Oops! Something went wrong.
                </h2>
                <p className={"max-w-[460px] px-[15px] text-[#777777] text-center leading-[1.8]"}>
                    Please try refreshing the page or send feedback to us.
                </p>
                <div className={"mt-[30px]"}>
                    <Space>
                        <Button
                            danger
                            onClick={() => {
                                window.location.reload()
                            }}
                        >
                            REFRESH PAGE
                        </Button>
                        <Button type={"primary"} ghost>
                            SEND FEEDBACK
                        </Button>
                    </Space>
                </div>
            </div>
        </Fragment>
    )
}

function Error500() {
    return <ErrorBoundary />
}

export default Error500
