import { useNavigate } from "react-router-dom"
import { Avatar, Dropdown, MenuProps } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useAntdThemeToken } from "@/hooks"

function AvatarAndDropdown() {
    const navigate = useNavigate()

    const items: MenuProps["items"] = [
        {
            key: "account",
            label: "Account",
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            danger: true,
            onClick: () => {
                navigate("/login", { replace: true })
            },
            label: "Logout",
        },
    ]
    const { colorPrimary } = useAntdThemeToken()
    return (
        <div className={"avatar-container"}>
            <Dropdown
                overlayStyle={{
                    minWidth: "200px",
                }}
                trigger={["click"]}
                menu={{ items }}
            >
                <Avatar
                    className={"cursor-pointer"}
                    style={{
                        backgroundColor: colorPrimary,
                    }}
                    icon={<UserOutlined />}
                    size={"small"}
                />
            </Dropdown>
        </div>
    )
}

export default AvatarAndDropdown
