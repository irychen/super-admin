import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Divider, Form, Input, Space } from "antd"
import { useEffect } from "react"

function DashboardUserInfo() {
    const [form] = Form.useForm()
    console.log("render userinfo")

    const initialValues = {
        address: "Wolf Street 1234, New York, USA",
        email: "superadmin@gmail.com",
        username: "superadmin",
    }

    useEffect(() => {
        form.setFieldsValue(initialValues)
        console.log("useEffect userinfo")

        return () => {
            console.log("unmount userinfo")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-full h-full overflow-auto p-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">User Info</div>
                    <div className="text-sm text-gray-500">This is your user info. You can change your info here.</div>
                </div>
            </div>
            <Divider />
            <div className="mt-4">
                <Form layout="vertical" form={form}>
                    <div className="mb-4">
                        {/* avatar */}
                        <div className="">
                            <Avatar size={100} icon={<UserOutlined />} />
                        </div>
                    </div>
                    <div className="grid pad:grid-cols-1 desktop:grid-cols-2 grid-cols-4 gap-x-[20px]">
                        <Form.Item label="Username" name="username">
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item label="Address" name="address">
                            <Input.TextArea rows={4} value={"Wolf Street 1234, New York, USA"} />
                        </Form.Item>
                    </div>
                    <div className="flex justify-start">
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                    form.validateFields().then(values => {
                                        console.log(values)
                                    })
                                }}
                            >
                                Save
                            </Button>
                            <Button type="default" htmlType="reset">
                                Reset
                            </Button>
                        </Space>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default DashboardUserInfo
