import AdminLogo from "@/components/AdminLogo"
import config from "@/config"
import { navigate } from "@/utils/navigate"
import { Button, Form, Input } from "antd"

function SignUp() {
    return (
        <div
            className={
                "min-h-screen bg-gradient-to-r from-blue-200 to-purple-200  dark:bg-gradient-to-r dark:from-[#111] dark:to-[#252B37] flex items-center justify-center p-6 mobile:p-0"
            }
        >
            <div
                className={
                    "min-w-[320px] dark:bg-[#1F252D] w-full p-[20px] rounded-lg shadow-lg max-w-[450px] min-h-[600px] mobile:h-screen bg-white mobile:rounded-none"
                }
            >
                <div className={"logo flex justify-center h-[50px] my-[10px] mt-[20px]"}>
                    <AdminLogo />
                </div>
                <div className={"flex w-full justify-center text-center text-[20px] font-bold py-[10px]"}>
                    <div className={""}>{config.appTitle}</div>
                    <div className={"ml-[10px]"}>Sign Up</div>
                </div>
                <p className={"text-[13px] text-center text-[#444] dark:text-[#999]"}>Welcome to {config.appTitle}</p>
                <div className={"w-full mx-auto max-w-[320px] my-[20px]"}>
                    <Form className={"w-full"} layout={"vertical"}>
                        <Form.Item
                            label={"Email"}
                            name={"email"}
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input autoComplete={"email"} placeholder={"Please input your email!"} />
                        </Form.Item>
                        <Form.Item
                            label={"Password"}
                            name={"password"}
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password
                                autoComplete={"current-password"}
                                placeholder={"Please input your password!"}
                            />
                        </Form.Item>
                        {/*confirm password*/}
                        <Form.Item
                            label={"Confirm Password"}
                            name={"confirm_password"}
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password
                                autoComplete={"current-password"}
                                placeholder={"Please input your password!"}
                            />
                        </Form.Item>
                    </Form>
                    <div>
                        <Button
                            className={"w-full"}
                            type={"primary"}
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <div className={"flex items-center justify-center text-[13px] py-[20px]"}>
                        <p className={"text-[#888]"}>{"Already have an account?"}</p>
                        <Button
                            type={"link"}
                            onClick={() => {
                                navigate("/login")
                            }}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
