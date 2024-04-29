import SuperTable, { SuperTableColumnsType } from "@/components/SuperTable"
import { useEffect, useRef } from "react"
import { useKeepAliveContext } from "keepalive-for-react"

interface DataType {
    id: number
    name: string
    age: number
    sex: string
    address: string
}

function fetchData(params: any) {
    return new Promise<{ data: DataType[]; total: number }>(resolve => {
        setTimeout(() => {
            console.log("params", params)
            const data: DataType[] = []
            for (let i = 0; i < 10000; i++) {
                data.push({
                    id: i,
                    name: `name ${i}`,
                    age: i,
                    address: `address ${i} beijing china`,
                    sex: i % 2 === 0 ? "男" : "女",
                })
            }
            resolve({ data, total: 100 })
        }, 1000)
    })
}

function SuperTablePage() {
    const actionRef = SuperTable.useActionRef()
    const historyScrollTop = useRef(0)

    const { active } = useKeepAliveContext()

    useEffect(() => {
        if (actionRef.current && active) {
            actionRef.current.scrollTo?.({ top: historyScrollTop.current })
        }
    }, [active])

    const columns: SuperTableColumnsType<DataType> = [
        {
            title: "姓名",
            dataIndex: "name",
            key: "name",
            width: 300,
            align: "center",
            valueType: "date",
        },
        {
            title: "年龄",
            dataIndex: "age",
            key: "age",
            width: 300,
            selectOptions: [
                { label: "男", value: "男s" },
                { label: "女", value: "女m" },
            ],
        },
        {
            title: "性别",
            dataIndex: "sex",
            key: "sex",
            width: 300,
            valueType: "select",
            selectOptions: [
                { label: "男", value: "男s" },
                { label: "女", value: "女s" },
            ],
        },
        {
            title: "地址",
            dataIndex: "address",
            key: "address",
            width: 1000,
            valueType: "dateRange",
            render(_, record) {
                return (
                    <div>
                        <span>[ {record.address} ]</span>
                    </div>
                )
            },
        },
    ]

    return (
        <div className={"p-[20px]"}>
            <SuperTable<DataType>
                onScroll={e => {
                    const target = e.target as HTMLDivElement
                    if (!target) return
                    historyScrollTop.current = target?.scrollTop || 0
                }}
                defaultExpandSearchForm={true}
                virtual={true}
                scroll={{ y: 500 }}
                rowKey={"id"}
                request={fetchData}
                actionRef={actionRef}
                columns={columns}
                searchFormGridWidth={300}
                searchFormGridGap={18}
            />
        </div>
    )
}

export default SuperTablePage
