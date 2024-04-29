import { Button, Space } from "antd"

function Error404() {
    return (
        <div className={"not-found flex flex-col w-full items-center pt-[50px] pb-[20px]"}>
            <h1 className={"text-center text-[#666] dark:text-[#ccc] text-8xl font-bold py-[20px]"}>404</h1>
            <h2 className={"text-2xl text-[#222] dark:text-[#aaa] font-bold mb-[10px]"}>Oops! Page not found.</h2>
            <p className={"max-w-[460px] px-[15px] text-[#777777] text-center leading-[1.8]"}>
                The page you are looking for might have been removed, had its name changed or is temporarily
                unavailable.
            </p>
            <div className={"flex items-center mt-[20px] justify-center"}>
                <Space>
                    <Button>Go back</Button>
                    <Button type={"primary"}>Go home</Button>
                </Space>
            </div>
        </div>
    )
}

export default Error404
