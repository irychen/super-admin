import { ProTable, ProColumns } from "@ant-design/pro-components"

function DashboardUsers() {
    console.log("dashboard users render")

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

    const columns: ProColumns<(typeof dataSource)[number]>[] = [
        {
            title: "Name",
            dataIndex: "name",
            align: "center",
            width: 200,
        },
        {
            title: "Entry Time",
            dataIndex: "entryTime",
            valueType: "date",
            align: "center",
        },
        {
            title: "Sex",
            dataIndex: "sex",
            align: "center",
        },
        {
            title: "Age",
            dataIndex: "age",
            align: "center",
        },
        {
            width: 280,
            title: "Address",
            dataIndex: "address",
            align: "center",
        },
        {
            title: "Job",
            dataIndex: "job",
            align: "center",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            align: "center",
        },
    ]
    return (
        <div className="w-full h-full transition-colors duration-300 overflow-auto">
            <ProTable
                bordered
                size="small"
                scroll={{ y: 500 }}
                dataSource={dataSource}
                columns={columns}
                // virtual={true}
                pagination={{
                    defaultPageSize: 20,
                    pageSizeOptions: [15, 30, 50, 100, 200, 500, 1000, 2000, 3000, 4000, 5000, 10000],
                }}
            />
        </div>
    )
}
export default DashboardUsers
