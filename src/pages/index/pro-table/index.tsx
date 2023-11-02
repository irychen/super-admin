import { ProColumns, ProTable } from "@ant-design/pro-components"
import { useLocation } from "react-router-dom"

const columns: ProColumns<{
    name: string
    sex: string
    age: number
    address: string
    job: string
    phone: string
}>[] = [
    {
        title: "姓名",
        align: "center",
        dataIndex: "name",
        key: "name",
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
]

const dataSource = [
    {
        name: "张三",
        sex: "男",
        age: 18,
        address: "北京市朝阳区",
        job: "前端工程师",
        phone: "18888888888",
    },
    {
        name: "李四",
        sex: "男",
        age: 20,
        address: "北京市海淀区",
        job: "后端工程师",
        phone: "18888888888",
    },
    {
        name: "王五",
        sex: "男",
        age: 22,
        address: "北京市东城区",
        job: "测试工程师",
        phone: "18888888888",
    },
    {
        name: "赵六",
        sex: "男",
        age: 24,
        address: "北京市西城区",
        job: "运维工程师",
        phone: "18888888888",
    },
]

function ProTablePage() {
    const location = useLocation()
    const key = location.pathname + location.search
    console.log("ProTablePage render", key)
    return (
        <ProTable
            form={{}}
            columnsState={{
                persistenceKey: key,
                persistenceType: "sessionStorage",
            }}
            options={{
                fullScreen: true,
            }}
            defaultSize={"small"}
            rowKey={"name"}
            columns={columns}
            dataSource={dataSource}
        ></ProTable>
    )
}

export default ProTablePage
