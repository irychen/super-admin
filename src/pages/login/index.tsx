import AdminLogo from "@/components/AdminLogo"
import config from "@/config"
import { navigateTo } from "@/utils/navigate"
import { Button, Checkbox, Form, Input } from "antd"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

function Login() {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const { t } = useTranslation()
    function handleLogin() {
        console.log("login")
        navigate("/admin")
    }

    return (
        <div
            className={
                "bg-[#FAFBFE] w-full mobile:block mobile:p-0 mobile:bg-transparent dark:bg-[#161C24] min-h-screen py-[20px] flex justify-center items-center"
            }
        >
            <div
                className={
                    "center-box w-full max-w-[800px] pad:max-w-[400px] mobile:w-full mobile:shadow-none mobile:h-full rounded-lg shadow-lg overflow-hidden min-h-[570px] bg-white flex"
                }
            >
                <div
                    className={
                        "w-1/2 pad:hidden dark:bg-[#999] bg-gradient-to-tr from-blue-400 to-red-300 flex-center px-[30px] py-[80px]"
                    }
                >
                    <div
                        className={
                            "w-full h-full shadow rounded-md bg-white/[0.2] flex flex-col justify-center p-[20px]"
                        }
                    >
                        <h1 className={"text-white text-[50px] font-extrabold py-[10px]"}>{config.appTitle}</h1>
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
                        <div className={"text-[--primary-color]"}>{config.appTitle}</div>
                        <div className={"ml-[6px]"}>Login</div>
                    </div>
                    <p className={"text-[13px] text-[#444] dark:text-[#999]"}>
                        {t("pages.login.description", { title: config.appTitle })}
                    </p>
                    <div className={"w-full max-w-[320px] my-[20px]"}>
                        <Form className={"w-full"} layout={"vertical"} form={form}>
                            <Form.Item
                                label={t("pages.login.email")}
                                name={"email"}
                                rules={[{ required: true, message: t("pages.login.email_placeholder") }]}
                            >
                                <Input autoComplete={"email"} placeholder={t("pages.login.email_placeholder")} />
                            </Form.Item>
                            <Form.Item
                                label={t("pages.login.password")}
                                name={"password"}
                                rules={[{ required: true, message: t("pages.login.password_placeholder") }]}
                            >
                                <Input.Password
                                    autoComplete={"current-password"}
                                    placeholder={t("pages.login.password_placeholder")}
                                />
                            </Form.Item>
                            {/*remember me*/}
                            <Form.Item>
                                <div className={"flex items-center"}>
                                    <Checkbox>{t("pages.login.remember_me")}</Checkbox>
                                </div>
                            </Form.Item>
                        </Form>
                        <div>
                            <Button className={"w-full"} type={"primary"} onClick={handleLogin}>
                                {t("pages.login.login")}
                            </Button>
                        </div>
                    </div>

                    <div className={"flex items-center text-[13px]"}>
                        <p className={"text-[#888]"}>{t("pages.login.dont_have_account")}</p>
                        <Button
                            type={"link"}
                            onClick={() => {
                                navigateTo("/signup")
                            }}
                        >
                            {t("pages.login.create_account")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
