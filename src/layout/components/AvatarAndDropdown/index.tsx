import { useNavigate } from "react-router-dom"
import { Avatar, Dropdown, MenuProps } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { storageKeys } from "@/constants"
import { removeToken } from "@/utils/token.ts"

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
                window.localStorage.removeItem(storageKeys.user)
                removeToken()
                navigate("/login", { replace: true })
            },
            label: "Logout",
        },
    ]

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
                        backgroundColor: "#2872E0",
                    }}
                    icon={<UserOutlined />}
                    size={"small"}
                />
            </Dropdown>
        </div>
    )
}

export default AvatarAndDropdown
