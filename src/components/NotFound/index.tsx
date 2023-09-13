import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="哎呀，你访问的页面不存在！"
                extra={
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate("/login")
                        }}
                    >
                        返回登录页
                    </Button>
                }
            />
        </div>
    )
}

export default NotFound
