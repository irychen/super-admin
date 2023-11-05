import { Button, Card } from "antd"
import { useEffect, useState } from "react"

function OhErr() {
    const [showErr, setShowErr] = useState(false)

    return (
        <Card title={"page err"}>
            <Button
                danger
                type={"primary"}
                onClick={() => {
                    setShowErr(true)
                }}
            >
                throw err
            </Button>
            {showErr && <ErrRender />}
        </Card>
    )
}

function ErrRender() {
    useEffect(() => {
        throw new Error("this is an err for example")
    }, [])
    return <div>err render</div>
}

export default OhErr
