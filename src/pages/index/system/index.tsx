import { ProTable } from "@ant-design/pro-components"
import { memo } from "react"

function System() {
    const dataSource = [
        {
            id: 1,
            name: "张三",
            age: 18,
            address: "北京市朝阳区芍药居",
            sex: "男",
            work: "前端工程师",
            skills: "JavaScript",
        },
        {
            id: 2,
            name: "李四",
            age: 25,
            address: "北京市海淀区西二旗",
            sex: "女",
            work: "后端工程师",
            skills: "Java",
        },
        {
            id: 3,
            name: "王五",
            age: 30,
            address: "上海市浦东新区世纪大道",
            sex: "男",
            work: "测试工程师",
            skills: "Python",
        },
        {
            id: 4,
            name: "赵六",
            age: 26,
            address: "上海市黄浦区南京东路",
            sex: "女",
            work: "运维工程师",
            skills: "Shell",
        },
        {
            id: 5,
            name: "孙七",
            age: 22,
            address: "深圳市罗湖区科技路",
            sex: "男",
            work: "产品经理",
            skills: "PPT",
        },
    ]
    const columns = [
        {
            title: "用户姓名",
            dataIndex: "name",
        },
        // age
        {
            title: "用户年龄",
            dataIndex: "age",
        },
        // address
        {
            title: "用户地址",
            dataIndex: "address",
        },
        // sex
        {
            title: "用户性别",
            dataIndex: "sex",
        },
        // work
        {
            title: "用户工作",
            dataIndex: "work",
        },
        // skills
        {
            title: "用户技能",
            dataIndex: "skills",
        },
        {
            title: "操作",
            valueType: "option",
        },
    ]

    return (
        <div>
            <ProTable
                rowKey={"id"}
                scroll={{
                    x: "max-content",
                }}
                dataSource={dataSource}
                bordered
                form={{}}
                columns={columns}
                size={"small"}
            ></ProTable>
        </div>
    )
}

export default memo(System)
