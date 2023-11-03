import "@wangeditor/editor/dist/css/style.css" // 引入 css

import React, { useState, useEffect, Fragment, memo } from "react"
import { Editor, Toolbar } from "@wangeditor/editor-for-react"
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor"
import { classNames } from "@/utils"

type Props = {
    value?: string
    onChange?: (value: string) => void
    showHtml?: boolean
    className?: string
}

function RichEditor(props: Props) {
    const { value, onChange, showHtml } = props
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法

    // 编辑器内容
    const [html, setHtml] = useState(value || "")

    useEffect(() => {
        setHtml(value || "")
    }, [value])

    useEffect(() => {
        onChange && onChange(html)
    }, [html])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        // excludeKeys: ["group-image", "group-video", "fullScreen"],
    } // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: "请输入内容...",
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <Fragment>
            <div
                className={classNames("rich-editor", props.className)}
                style={{ border: "1px solid #ccc", zIndex: 100 }}
            >
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: "1px solid #ccc" }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: "500px", overflowY: "hidden" }}
                />
            </div>
            {showHtml && <div style={{ marginTop: "15px" }}>{html}</div>}
        </Fragment>
    )
}

export default memo(RichEditor)
