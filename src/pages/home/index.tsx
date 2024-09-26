import { Button, Card, Divider, Space } from "antd"
import config from "../../config"
import { Link, useNavigate } from "react-router-dom"
import AdminLogo from "@/components/AdminLogo"
import { GITHUB_REPO_URL } from "@/constants"
import { IconBrandGithub } from "@tabler/icons-react"

function Home() {
    console.log("Home render")

    const navigate = useNavigate()
    return (
        <div className="home pt-[60px] text-[16px]">
            {/* <CommonHeader /> */}
            <div className={"min-h-[calc(100vh-60px)] px-[15px]"}>
                <div className={"w-full py-[70px]  pb-[20px]"}>
                    <div className={"w-full flex justify-center "}>
                        <AdminLogo />
                    </div>
                    <h1 className={"text-center text-4xl font-extrabold mt-5"}>{config.appTitle}</h1>
                </div>
                <p className={"text-center py-[10px] mb-[30px] text-md"}>{config.appDescription}</p>
                <div className={"flex justify-center items-center pb-[30px]"}>
                    <Space>
                        <Link to={"/signup"}>
                            <Button
                                style={{
                                    color: "#fff",
                                    backgroundImage: "linear-gradient(45deg, #de50b6, #3081f8)",
                                    border: "none",
                                }}
                                className={"w-[120px]"}
                                size={"large"}
                            >
                                Sign Up
                            </Button>
                        </Link>
                        <Link to={"/login"}>
                            <Button
                                style={{
                                    color: "#fff",
                                    backgroundImage: "linear-gradient(45deg, #48c79b, #2ab4ef)",
                                    border: "none",
                                }}
                                className={"w-[120px]"}
                                size={"large"}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to={"/admin/dashboard"}>
                            <Button
                                style={{
                                    color: "#fff",
                                    backgroundImage: "linear-gradient(45deg, #F15656, #48A39D)",
                                    border: "none",
                                }}
                                size={"large"}
                            >
                                Admin Dashboard
                            </Button>
                        </Link>
                    </Space>
                </div>
                <div
                    className={
                        "text-center relative w-full max-w-[800px] m-auto border-t border-[#eee] dark:border-[#333] py-[10px] px-[15px]"
                    }
                >
                    {/*一个五角星svg*/}
                    <div className={"absolute left-[60%]  -top-[0px] transform -translate-x-1/2 -translate-y-1/2"}>
                        <svg
                            className={"animate-spin"}
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2L14.4 8.5H21.6L15.6 13.5L17.4 20L12 15.5L6.6 20L8.4 13.5L2.4 8.5H9.6L12 2Z"
                                fill="#FFD700"
                            />
                        </svg>
                    </div>
                    <div>
                        <div className={"text-xl font-bold py-[10px] text-center"}>Building Admin Easy & Fast</div>
                    </div>
                    <div className={"flex justify-center py-[15px]"}>
                        <Link to={GITHUB_REPO_URL} target="_blank">
                            <Button
                                style={{
                                    color: "#fff",
                                    backgroundImage: "linear-gradient(45deg, #809b92, #1a1a1c)",
                                }}
                                className={"w-[120px]"}
                                size={"large"}
                            >
                                Github Repo
                            </Button>
                        </Link>
                    </div>

                    <div className={"text-center mt-[10px]"}>
                        <span className={"mr-2"}>Powered by</span>
                        <Link to={"https://reactjs.org/"} className={"mr-2"} target="_blank">
                            React
                        </Link>
                        <Link to={"https://github.com/irychen/keepalive-for-react"} className={"mr-2"} target="_blank">
                            Keepalive
                        </Link>
                        <Link to={"https://tailwindcss.com/"} target="_blank">
                            Tailwindcss
                        </Link>
                    </div>
                </div>
            </div>
            <Divider className="w-full" />
            {/* <CommonFooter /> */}
        </div>
    )
}

export default Home
