import { IconArrowLeft, IconHome } from "@tabler/icons-react"
import { Button, Space } from "antd"
import { Link, useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className={"not-found flex flex-col w-full items-center pt-[50px] pb-[20px]"}>
            <h1 className={"text-center text-8xl font-bold py-[20px] dark:text-stone-200 text-stone-700"}>403</h1>
            <h2 className={"text-2xl font-bold mb-[10px] dark:text-stone-200 text-stone-700"}>
                {"Oops! Forbidden Page".toUpperCase()}
            </h2>
            <p className={"max-w-[460px] px-[15px] text-[#777777] text-center leading-[1.8]"}>
                The page you are looking for should be authenticated first.
            </p>
            <div className={"flex items-center mt-[20px] justify-center"}>
                <Space>
                    <Button
                        type="primary"
                        ghost
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        <IconArrowLeft size={20} strokeWidth={1.5} className={"mr-[5px]"} />
                        {"Go back".toUpperCase()}
                    </Button>
                    <Link to={"/admin"}>
                        <Button type="primary">
                            {"Go home".toUpperCase()}
                            <IconHome size={20} strokeWidth={1.5} className={"ml-[5px]"} />
                        </Button>
                    </Link>
                </Space>
            </div>
        </div>
    )
}

export default NotFound
