import { Card } from "antd"
import RichEditor from "@/components/RichEditor"

function RichEditorPage() {
    return (
        <Card className={"h-full overflow-y-auto"} title={"富文本编辑器"} bordered={false}>
            <RichEditor></RichEditor>
        </Card>
    )
}

export default RichEditorPage
