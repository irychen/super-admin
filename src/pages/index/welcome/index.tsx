import { Button, Card, Form, Input, Space, Table } from "antd"
import { map } from "ramda"
import { useMemo, useRef, useState, useEffect } from "react"
import { v4 } from "uuid"
import { DownOutlined, UpOutlined } from "@ant-design/icons"

function Welcome() {
    useEffect(() => {
        console.log("Welcome mounted")
    }, [])
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            width: 80,
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
        },
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
        },
        {
            title: "Hobby",
            key: "hobby",
            dataIndex: "hobby",
        },
        {
            title: "Phone",
            key: "phone",
            dataIndex: "phone",
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email",
        },
        {
            title: "Website",
            key: "website",
            dataIndex: "website",
        },
        {
            width: 80,
            title: "MBTI",
            key: "mbti",
            dataIndex: "mbti",
        },
        {
            title: "Languages",
            key: "languages",
            dataIndex: "languages",
        },
        {
            width: 80,
            title: "code",
            key: "code",
            dataIndex: "code",
        },
        {
            width: 80,
            title: "codex",
            key: "codex",
            dataIndex: "codex",
        },
    ]

    const dataSource = [
        {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "2",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "3",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "4",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "5",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "6",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "7",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "8",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "9",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "10",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "11",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "12",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "13",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "14",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "15",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "16",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "17",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "18",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "19",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "20",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "21",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "22",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "23",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "24",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "25",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "26",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "27",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "28",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "29",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "30",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "31",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "32",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "33",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "34",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "35",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "36",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "37",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "38",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
        {
            key: "39",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
            description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
            hobby: "basketball",
            phone: "123456789",
            email: "ssssxxxxaa@gmail.com",
            website: "https://ant.design",
            mbti: "INTJ",
            languages: "English, Chinese",
            code: "123",
            codex: "123",
        },
    ]

    const myTableRef = useRef<HTMLDivElement>(null)

    const [currentRowCols, setCurrentRowCols] = useState(0)

    useEffect(() => {
        const dom = myTableRef.current
        if (!dom) return
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { contentRect } = entry
                const { width } = contentRect
                const cols = Math.floor((width - 48) / 330)
                setCurrentRowCols(cols)
            }
        })
        observer.observe(dom)
        return () => {
            observer.disconnect()
        }
    }, [])

    const [isCollapse, setIsCollapse] = useState(true)

    const searchFormCols = useMemo(() => {
        const searchCols = columns.filter((item: any) => item.search !== false)
        if (isCollapse) {
            return searchCols.slice(0, currentRowCols - 1)
        } else {
            return searchCols
        }
    }, [currentRowCols, isCollapse])

    const shouldAppendEmptyCols = useMemo(() => {
        if (isCollapse) return []
        const cols = currentRowCols - (columns.length % currentRowCols) - 1
        const colsArr = []
        for (let i = 0; i < cols; i++) {
            colsArr.push(i)
        }
        return colsArr
    }, [currentRowCols, isCollapse])

    return (
        <div className={"my-table min-w-[720px]"} ref={myTableRef}>
            <Card title={null} bordered={false}>
                <Form
                    size={"small"}
                    layout={"inline"}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, 330px)",
                            justifyContent: "space-around",
                            paddingBottom: 10,
                        }}
                    >
                        {map(item => {
                            return (
                                <Form.Item
                                    style={{
                                        marginBottom: 10,
                                        marginRight: 0,
                                    }}
                                    label={item.title}
                                    name={item.dataIndex}
                                    key={v4()}
                                >
                                    <Input></Input>
                                </Form.Item>
                            )
                        }, searchFormCols)}
                        {map(item => {
                            return <Form.Item key={item}></Form.Item>
                        }, shouldAppendEmptyCols)}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                paddingBottom: 10,
                            }}
                        >
                            <Space>
                                <Button type={"primary"}>查询</Button>
                                <Button>重置</Button>
                                <Button
                                    type={"link"}
                                    icon={isCollapse ? <DownOutlined /> : <UpOutlined />}
                                    onClick={() => {
                                        setIsCollapse(!isCollapse)
                                    }}
                                >
                                    {isCollapse ? "展开" : "收起"}
                                </Button>
                            </Space>
                        </div>
                    </div>
                </Form>
                <Table
                    rowKey={"key"}
                    scroll={{
                        x: "max-content",
                        y: 680,
                    }}
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        defaultPageSize: 100,
                    }}
                    dataSource={dataSource}
                    bordered
                    columns={columns}
                    size={"small"}
                ></Table>
            </Card>
        </div>
    )
}

export default Welcome
