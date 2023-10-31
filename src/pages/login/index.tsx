import { useNavigate } from "react-router-dom"
import { css } from "@emotion/react"
import { classNames } from "@/utils"
import { Button, Checkbox, message } from "antd"
import { useState } from "react"

const inputClassNames = classNames("h-10 leading-10 px-[15px] border-2 border-[#3A83F7] rounded-[20px]")
const LoginFormDataKey = "memo_login_form_data"

type LoginFormData = {
    email: string | undefined
    password: string | undefined
    remember: boolean
}
export default function Login() {
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
        navigate("/")
    }

    return (
        <div
            css={css`
                width: 100%;
                background-color: #fafafa;
                min-height: 100vh;
                min-height: calc(100vh - env(safe-area-inset-bottom));
            `}
        >
            {messageDom}
            <div
                css={css`
                    margin: 0 auto;
                    max-width: 340px;
                    padding: 0 20px;
                    padding-top: 20vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    input {
                        background-color: #f8f8f8;

                        &:focus {
                            outline: none;
                            border-color: #2067c4;
                        }
                    }
                `}
            >
                <h2
                    className={"text-center font-extrabold text-2xl"}
                    css={css`
                        background-image: linear-gradient(to right, #39adff, #1f68ff);
                        -webkit-background-clip: text;
                        color: transparent;
                        font-size: 27px;
                    `}
                >
                    Super Admin
                </h2>
                <p
                    className={"text-center mt-[10px]"}
                    css={css`
                        color: #60a9ef;
                    `}
                >
                    A Super Admin for Anythings
                </p>
                <form className={" mt-[30px]  w-full"}>
                    <label className={"flex flex-col mb-[20px]"}>
                        <input
                            type="text"
                            value={formData?.email}
                            onChange={e => {
                                setFormData(formData => {
                                    return {
                                        ...formData,
                                        email: e.target.value,
                                    }
                                })
                            }}
                            placeholder={"Email"}
                            className={inputClassNames}
                        />
                    </label>
                    <label className={"flex flex-col mb-[20px]"}>
                        <input
                            type="password"
                            value={formData?.password}
                            onChange={e => {
                                setFormData(formData => {
                                    return {
                                        ...formData,
                                        password: e.target.value,
                                    }
                                })
                            }}
                            placeholder={"Password"}
                            className={inputClassNames}
                        />
                    </label>
                </form>
                <div className={"w-full flex justify-between items-center"}>
                    <Checkbox
                        checked={formData?.remember}
                        onChange={e => {
                            setFormData(formData => {
                                return {
                                    ...formData,
                                    remember: e.target.checked,
                                }
                            })
                        }}
                    >
                        记住密码
                    </Checkbox>

                    <Button type={"link"} href={"/#/about"}>
                        关于我们
                    </Button>
                </div>
                <button
                    onClick={handleLogin}
                    css={css`
                        width: 100%;
                        height: 46px;
                        background-image: linear-gradient(to right, #35bcf6, #4e85fc);
                        color: #fff;
                        border-radius: 20px;
                        font-weight: bold;
                        font-size: 16px;
                        max-width: 290px;
                        box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.2);
                        margin-top: 20px;

                        &:active {
                            box-shadow: none;
                        }
                    `}
                >
                    立即登录
                </button>
            </div>
        </div>
    )
}
