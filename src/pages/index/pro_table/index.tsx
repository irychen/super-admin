import { ProColumns, ProTable } from "@ant-design/pro-components"
interface DataType {
    id: number
    name: string
    age: number
    sex: string
    address: string
}
function fetchData(params: any) {
    return new Promise<{ data: DataType[] }>(resolve => {
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
            resolve({ data })
        }, 1000)
    })
}
function ProTablePage() {
    const columns: ProColumns<any>[] = [
        {
            dataIndex: "index",
            valueType: "indexBorder",
            width: 48,
        },
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
            valueType: "select",
        },
        {
            title: "性别",
            dataIndex: "sex",
            key: "sex",
            width: 300,
            valueType: "select",
            fieldProps: {
                options: [
                    { label: "男", value: "男s" },
                    { label: "女", value: "女m" },
                ],
            },
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
        <div>
            <ProTable rowKey={"id"} request={fetchData} columns={columns}></ProTable>
        </div>
    )
}

export default ProTablePage
