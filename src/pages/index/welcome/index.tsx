import { Button, Divider } from "antd"
import { useLocation } from "react-router-dom"
import { useAppAuth } from "@/store/auth.ts"
import usePageContext from "@/components/AdminPagesProvider/usePageContext"

function Welcome() {
    const { open } = usePageContext()
    const location = useLocation()
    const { update } = useAppAuth()
    return (
        <div className={"w-full h-full p-[20px]"}>
            <div className={"mx-auto pt-[100px]"}>
                <h1 className={"text-[#555] dark:text-white text-2xl text-center font-bold "}>
                    Welcome to the Super Admin System
                </h1>
                <Divider />
                <p className={"text-[#999] dark:text-[#ccc] text-center mt-2"}>
                    This is a simple admin system built with React, TypeScript, and Ant Design.
                </p>
                <div className={"flex justify-center mt-[20px]"}>
                    <Button
                        onClick={() => {
                            open({
                                label: "Welcome Page With Params",
                                url: "/?name=123",
                            })
                        }}
                    >
                        Open Welcome Page With Params
                    </Button>
                </div>
                <div className={"flex justify-center mt-[20px]"}>
                    <Button
                        danger
                        onClick={() => {
                            update(state => {
                                state.permissions = [...state.permissions]?.filter(item => item !== "welcome")
                            })
                        }}
                    >
                        Remove Page Auth
                    </Button>
                </div>
                <p className={"text-[#999] dark:text-[#ccc] text-center mt-2"}>{location.search}</p>
            </div>
        </div>
    )
}

export default Welcome
