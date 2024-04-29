import { APP_NAME } from "@/constants"
import { Button, Checkbox, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import AdminLogo from "@/components/AdminLogo"
import { useAppAuth } from "@/store/auth.ts"

function Login() {
    const navigate = useNavigate()
    const { update } = useAppAuth()

    return (
        <div
            className={
                "bg-[#FAFBFE] w-full mobile:block mobile:p-0 mobile:bg-transparent dark:bg-[#161C24] h-screen py-[20px] flex justify-center items-center"
            }
        >
            <div
                className={
                    "center-box w-full max-w-[800px] pad:max-w-[400px] mobile:w-full mobile:shadow-none mobile:h-full rounded-lg shadow-lg overflow-hidden min-h-[570px] bg-white flex"
                }
            >
                <div className={"w-1/2 pad:hidden dark:bg-[#999] colorful-bg flex-center px-[30px] py-[80px]"}>
                    <div
                        className={
                            "w-full h-full shadow rounded-md bg-white/[0.2] flex flex-col justify-center p-[20px]"
                        }
                    >
                        <h1 className={"text-white text-[50px] font-extrabold py-[10px]"}>{APP_NAME}</h1>
                        <p className={"text-[20px] font-extrabold text-white"}>an admin dashboard template</p>
                        <p className={"py-[20px] text-[#222]"}>easy to use, fast and reliable !</p>
                    </div>
                </div>
                <div
                    className={
                        "w-1/2 pad:w-full dark:bg-[#1F252D] p-[15px] mobile:pt-[40px] flex flex-col mobile:justify-start items-center justify-center"
                    }
                >
                    <div className={"logo flex justify-center h-[50px] my-[10px]"}>
                        <AdminLogo />
                    </div>
                    <div className={"flex text-[20px] font-bold py-[10px]"}>
                        <div className={"text-[--primary-color]"}>{APP_NAME}</div>
                        <div className={"ml-[10px]"}>Login</div>
                    </div>
                    <p className={"text-[13px] text-[#444] dark:text-[#999]"}>
                        Welcome to {APP_NAME}, please login to continue
                    </p>
                    <div className={"w-full max-w-[320px] my-[20px]"}>
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
                            {/*remember me*/}
                            <Form.Item>
                                <div className={"flex items-center"}>
                                    <Checkbox>Remember me</Checkbox>
                                </div>
                            </Form.Item>
                        </Form>
                        <div>
                            <Button
                                className={"w-full"}
                                type={"primary"}
                                onClick={() => {
                                    update(config => {
                                        config.token = "token"
                                        config.permissions = [
                                            "admin",
                                            "welcome",
                                            "table",
                                            "nested",
                                            "error",
                                            "pro_table",
                                        ]
                                    })
                                    navigate("/")
                                }}
                            >
                                Login
                            </Button>
                        </div>
                    </div>

                    <div className={"flex items-center text-[13px]"}>
                        <p className={"text-[#888]"}>{"Don't have an account?"}</p>
                        <a
                            className={"text-[#5375FE] ml-[6px] cursor-pointer"}
                            onClick={() => {
                                navigate("/signup")
                            }}
                        >
                            Create an account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
