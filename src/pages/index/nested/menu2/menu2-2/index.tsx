import { Divider, Input } from "antd"
import { useState } from "react"
import { classNames } from "fortea"

function Menu22() {
    const [counter, setCounter] = useState(0)

    return (
        <div className={"p-[20px]"}>
            <h1 className={"text-center text-2xl"}>
                Menu2-2 with keepalive cache{" "}
                <code
                    className={classNames(
                        "text-[#1890ff] dark:text-[#0cf] px-[5px] py-[2px] rounded-md",
                        "font-bold",
                        // bg
                        "bg-[#f0f9eb] dark:bg-[#111]",
                    )}
                >
                    true
                </code>
            </h1>
            <Divider />
            <p className={"text-center text-[#999] dark:text-[#ccc]"}>This is a demo page for nested routing.</p>
            <div className={"mt-[20px]"}>
                <Input placeholder={"Please input something"}></Input>
            </div>
            <div className={"mt-[20px] text-center"}>
                <button
                    className={"px-[10px] py-[5px] bg-[#1890ff] text-white rounded"}
                    onClick={() => {
                        setCounter(counter + 1)
                    }}
                >
                    Clicked {counter} times
                </button>
            </div>
        </div>
    )
}

export default Menu22
