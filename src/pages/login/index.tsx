import { useNavigate } from "react-router-dom"
import { css, Global } from "@emotion/react"
import { classNames } from "@/utils"
import { Button, Checkbox, Form, Input, message } from "antd"
import { useState } from "react"
import workImage from "@/assets/work.png"

const inputClassNames = classNames("h-10 leading-10 px-[15px] border-2 border-[#3A83F7] rounded-[20px]")
const LoginFormDataKey = "memo_login_form_data"

type LoginFormData = {
    email: string | undefined
    password: string | undefined
    remember: boolean
}
export default function Login() {
    console.log("Login render")
    const navigate = useNavigate()
    const [messageApi, messageDom] = message.useMessage()
    const [formData, setFormData] = useState<LoginFormData>(() => {
        const dataStr = localStorage.getItem(LoginFormDataKey)
        const defaultData = {
            email: undefined,
            password: undefined,
            remember: false,
        }
        if (dataStr) {
            const data = JSON.parse(dataStr)
            if (data?.remember) {
                return data
            } else {
                return defaultData
            }
        } else {
            return defaultData
        }
    })

    const handleLogin = async () => {
        if (!formData?.email) {
            messageApi.error("请输入邮箱")
            return
        }
        if (!formData?.password) {
            messageApi.error("请输入密码")
            return
        }
        if (formData?.remember) {
            localStorage.setItem(LoginFormDataKey, JSON.stringify(formData))
        }
        navigate({
            pathname: "/",
        })
    }

    return (
        <div
            className={"login flex justify-center items-center bg-[#edf5fa] dark:bg-[#333]"}
            css={css`
                width: 100%;
                height: 100vh;
                min-height: 100vh;
                padding: 20px;
                min-height: calc(100vh - env(safe-area-inset-bottom));
            `}
        >
            {messageDom}
            <div
                className={"card shadow-xl bg-[#fff] flex rounded-xl"}
                css={css`
                    width: 100%;
                    max-width: 800px;
                    min-height: 500px;
                    overflow: hidden;
                `}
            >
                <div className={"left w-[50%] p-[10px] sm:block hidden cover-img-login"}>
                    <img style={{ objectFit: "contain" }} src={workImage} className={"w-full h-full cover"}></img>
                </div>
                <div className={"right  w-full px-[20px] pt-[40px] sm:w-[50%] bg-[#fbfdff] dark:bg-[#222]"}>
                    <h1 className={"text-center text-[24px] font-bold"}>Super Admin Login</h1>
                    <p className={"text-center text-[14px] mt-[10px] text-[#999]"}>Welcome to Super Admin</p>
                    <div className={"mt-[30px] px-[30px]"}>
                        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout={"vertical"}>
                            <Form.Item label={"账户"}>
                                <Input
                                    value={formData?.email}
                                    onChange={e => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }}
                                    placeholder={"请输入邮箱"}
                                ></Input>
                            </Form.Item>
                            <Form.Item label={"密码"}>
                                <Input.Password
                                    value={formData?.password}
                                    onChange={e => {
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }}
                                    placeholder={"请输入密码"}
                                ></Input.Password>
                            </Form.Item>
                            <Form.Item>
                                <Checkbox
                                    checked={formData?.remember}
                                    onChange={e => {
                                        setFormData({
                                            ...formData,
                                            remember: e.target.checked,
                                        })
                                    }}
                                >
                                    记住我
                                </Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    onClick={() => {
                                        handleLogin()
                                    }}
                                    type={"primary"}
                                    className={"w-full"}
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}
