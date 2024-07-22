import { DatePicker, Divider, Select } from "antd"

function Menu1() {
    return (
        <div className={"p-[20px]"}>
            <h1 className={"text-center text-2xl"}>Menu1</h1>
            <Divider />
            <p className={"text-center text-[#999] dark:text-[#ccc]"}>This is a demo page for nested routing.</p>
            <div>
                <DatePicker />
                <Select
                    placeholder={"Select"}
                    style={{
                        width: 120,
                    }}
                />
            </div>
        </div>
    )
}

export default Menu1
