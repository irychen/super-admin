import { Table } from "antd"
import { useEffect, useRef, useState } from "react"
import { useKeepAliveContext } from "keepalive-for-react"

function TablePage() {
    const divRef = useRef<HTMLDivElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const historyTop = useRef(0)
    const [tableY, setTableY] = useState(0)

    const [mounted, setMounted] = useState(false)

    //  10000 条数据
    const dataSource = Array.from({ length: 10000 }, (_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        entryTime: `2021-09-${index}`,
        sex: index % 2 === 0 ? "男" : "女",
        age: 32,
        address: `London, Park Lane no. ${index}`,
        job: "前端工程师",
        phone: "1234567890",
    }))

    const { active } = useKeepAliveContext()

    useEffect(() => {
        if (tableRef.current && active) {
            tableRef.current?.scrollTo({
                top: historyTop.current,
            })
        }
    }, [active])

    useEffect(() => {
        const div = divRef.current
        if (div) {
            const resize = () => {
                const { height } = div.getBoundingClientRect() || {}
                setTableY(height)
            }
            window.addEventListener("resize", resize)
            resize()
            return () => window.removeEventListener("resize", resize)
        }
    }, [setTableY, active])

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div ref={divRef} className={"w-full h-full p-[8px]"}>
            {mounted && (
                <Table
                    ref={tableRef as any}
                    size={"small"}
                    virtual
                    onScroll={e => {
                        const target = e.target as HTMLDivElement
                        if (!target) return
                        historyTop.current = target?.scrollTop || 0
                    }}
                    rowKey={row => row.name}
                    dataSource={dataSource}
                    scroll={{ x: 2000, y: tableY - 54 }}
                    pagination={false}
                    columns={[
                        {
                            title: "姓名",
                            align: "center",
                            dataIndex: "name",
                            key: "name",
                        },
                        // 入职时间
                        {
                            title: "入职时间",
                            align: "center",
                            dataIndex: "entryTime",
                            key: "entryTime",
                            render: (_, row) => <span>{row.entryTime}</span>,
                        },
                        {
                            title: "性别",
                            align: "center",
                            dataIndex: "sex",
                            key: "sex",
                        },
                        {
                            title: "年龄",
                            align: "center",
                            dataIndex: "age",
                            key: "age",
                        },
                        {
                            title: "地址",
                            align: "center",
                            dataIndex: "address",
                            key: "address",
                        },
                        {
                            title: "工作",
                            align: "center",
                            dataIndex: "job",
                            key: "job",
                        },
                        {
                            title: "电话",
                            align: "center",
                            dataIndex: "phone",
                            key: "phone",
                        },
                    ]}
                ></Table>
            )}
        </div>
    )
}

export default TablePage
