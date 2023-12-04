import { Fragment, useEffect, useMemo, useState } from "react"
import { DatePicker, Form, Radio, Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import * as dayjs from "dayjs"
import useLocalStorageState from "@/hooks/useLocalStorageState.ts"

const tabs = [
    // {
    //   label: "商业贷款",
    //   key: "business"
    // },
    // {
    //   label: "公积金贷款",
    //   key: "fund"
    // },
    {
        label: "组合贷款",
        key: "combination",
    },
]

function Debt() {
    const [activeKey, setActiveKey] = useState("combination")
    return (
        <Fragment>
            <div className={"flex flex-col w-full items-center p-[20px]"}>
                <Tab
                    onChange={key => {
                        setActiveKey(key)
                    }}
                    activeKey={activeKey}
                    tabs={tabs}
                />
                <div className={"p-[15px] w-full"}>
                    <div
                        style={{
                            display: activeKey === "business" ? "block" : "none",
                        }}
                    ></div>
                    <div
                        style={{
                            display: activeKey === "fund" ? "block" : "none",
                        }}
                    ></div>
                    <div
                        style={{
                            display: activeKey === "combination" ? "block" : "none",
                        }}
                    >
                        <Combination />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

function Combination() {
    const [totalPrice, setTotalPrice] = useLocalStorageState<number>("totalPrice", 0)
    const [firstPayRate, setFirstPayRate] = useLocalStorageState<number>("firstPayRate", 3)
    const firstPay = useMemo(() => {
        return (totalPrice * firstPayRate) / 10
    }, [totalPrice, firstPayRate])
    const debtTotal = useMemo(() => {
        return totalPrice - firstPay
    }, [totalPrice, firstPay])
    // 公积金贷款
    const [fundTotal, setFundTotal] = useLocalStorageState<number>("fundTotal", 0)

    const businessTotal = useMemo(() => {
        return debtTotal - fundTotal
    }, [debtTotal, fundTotal])

    // 公积金贷款利率
    const [fundRate, setFundRate] = useState<number>(3.1)
    // 商业贷款利率
    const [businessRate, setBusinessRate] = useState<number>(4.2)
    // 贷款年限
    const [loanYear, setLoanYear] = useState<number>(30)

    type DataItem = {
        // 期数
        monthNo: number
        // 月供
        monthPay: number
        // 公积金月供
        monthFundPay: number
        // 商业月供
        monthBusinessPay: number
        // 剩余公积金贷款
        surplusFundPay: number
        // 剩余商业贷款
        surplusBusinessPay: number
    }

    const [dataSource, setDataSource] = useState<DataItem[]>([])
    const columns: ColumnsType<DataItem> = [
        {
            title: "期数",
            align: "center",
            dataIndex: "monthNo",
            key: "monthNo",
        },
        // 还款时间
        {
            title: "还款时间",
            align: "center",
            dataIndex: "repaymentTime",
            render: (_, record) => {
                return <span>{dayjs(startRepaymentTime).add(record.monthNo, "month").format("YYYY-MM-DD")}</span>
            },
        },
        {
            title: "总还款金额(元)",
            align: "center",
            dataIndex: "monthPay",
            render: (_, record) => {
                return <span>{(record.monthPay * 10000).toFixed(3)}</span>
            },
        },
        // 商贷还款
        {
            title: "商贷还款(元)",
            align: "center",
            dataIndex: "monthBusinessPay",
            render: (_, record) => {
                return <span>{(record.monthBusinessPay * 10000).toFixed(3)}</span>
            },
        },
        // 公积金还款
        {
            title: "公积金还款(元)",
            align: "center",
            dataIndex: "monthFundPay",
            render: (_, record) => {
                return <span>{(record.monthFundPay * 10000).toFixed(3)}</span>
            },
        },
        // 剩余商业贷款
        {
            title: "剩余商业贷款(万元)",
            align: "center",
            dataIndex: "surplusBusinessPay",
            render: (_, record) => {
                return <span>{record.surplusBusinessPay.toFixed(3)}</span>
            },
        },
        // 剩余公积金贷款
        {
            title: "剩余公积金贷款(万元)",
            align: "center",
            dataIndex: "surplusFundPay",
            render: (_, record) => {
                return <span>{record.surplusFundPay.toFixed(3)}</span>
            },
        },
        // 剩余贷款
        {
            title: "剩余贷款(万元)",
            align: "center",
            dataIndex: "surplusFundPay",
            render: (_, record) => {
                return <span>{(record.surplusFundPay + record.surplusBusinessPay).toFixed(3)}</span>
            },
        },
    ]

    // 还款模式 1等额本息 2等额本金
    const [repaymentMode, setRepaymentMode] = useState<number>(1)
    // 开始还款时间
    const [startRepaymentTime, setStartRepaymentTime] = useState<string>(dayjs().format("YYYY-MM-DD"))
    // 每年还款总额
    const [yearPayTotal, setYearPayTotal] = useState<number>(0)

    useEffect(() => {
        const data: DataItem[] = []
        const totalMonth = loanYear * 12
        const fundMonthRate = fundRate / 100 / 12
        const businessMonthRate = businessRate / 100 / 12
        let yearPay = 0
        if (repaymentMode === 1) {
            for (let i = 0; i < totalMonth; i++) {
                // 等额本息
                const monthFundPay =
                    (fundTotal * fundMonthRate * Math.pow(1 + fundMonthRate, totalMonth)) /
                    (Math.pow(1 + fundMonthRate, totalMonth) - 1)
                const monthBusinessPay =
                    (businessTotal * businessMonthRate * Math.pow(1 + businessMonthRate, totalMonth)) /
                    (Math.pow(1 + businessMonthRate, totalMonth) - 1)
                const monthPay = monthFundPay + monthBusinessPay
                // 剩余公积金贷款
                const surplusFundPay =
                    (fundTotal * (Math.pow(1 + fundMonthRate, totalMonth) - Math.pow(1 + fundMonthRate, i))) /
                    (Math.pow(1 + fundMonthRate, totalMonth) - 1)
                // 剩余商业贷款
                const surplusBusinessPay =
                    (businessTotal *
                        (Math.pow(1 + businessMonthRate, totalMonth) - Math.pow(1 + businessMonthRate, i))) /
                    (Math.pow(1 + businessMonthRate, totalMonth) - 1)
                yearPay = monthPay * 12
                data.push({
                    monthNo: i + 1,
                    monthPay,
                    monthFundPay,
                    monthBusinessPay,
                    surplusFundPay,
                    surplusBusinessPay,
                })
            }
        } else {
            for (let i = 0; i < totalMonth; i++) {
                // 等额本金
            }
        }
        setYearPayTotal(yearPay)

        setDataSource(data)
    }, [fundTotal, businessTotal, fundRate, businessRate, loanYear, repaymentMode, setYearPayTotal])

    return (
        <Fragment>
            <div className={"w-full"}>
                <div className={"w-full flex justify-center"}>
                    <Form
                        size={"small"}
                        style={{
                            width: "100%",
                        }}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <div className={"grid-cols-2 grid  gap-0"}>
                            {/*房屋总价*/}
                            <Form.Item label={"房屋总价"}>
                                <Input
                                    value={totalPrice}
                                    onChange={value => {
                                        setTotalPrice(value as number)
                                    }}
                                    type={"number"}
                                />{" "}
                                <span className={"ml-[8px]"}>万元</span>
                            </Form.Item>
                            {/*首付几成*/}
                            <Form.Item label={"首付几成"}>
                                <Input
                                    value={firstPayRate}
                                    onChange={value => {
                                        setFirstPayRate(value as number)
                                    }}
                                    type={"number"}
                                />{" "}
                                <span className={"ml-[8px]"}>成</span>
                            </Form.Item>
                            {/*首付*/}
                            <Form.Item label={"首付"}>
                                <Input value={firstPay} type={"number"} readonly />{" "}
                                <span className={"ml-[8px]"}>万元</span>
                            </Form.Item>
                            {/*贷款总额*/}
                            <Form.Item label={"贷款总额"}>
                                <Input value={debtTotal} type={"number"} readonly />{" "}
                                <span className={"ml-[8px]"}>万元</span>
                            </Form.Item>
                            {/*公积金贷款*/}
                            <Form.Item label={"公积金贷款"}>
                                <Input
                                    value={fundTotal}
                                    onChange={value => {
                                        setFundTotal(value as number)
                                    }}
                                    type={"number"}
                                />{" "}
                                <span className={"ml-[8px]"}>万元</span>
                            </Form.Item>
                            {/*公积金贷款利率*/}
                            <Form.Item label={"公积金贷款利率"}>
                                <Input
                                    value={fundRate}
                                    onChange={value => {
                                        setFundRate(value as number)
                                    }}
                                    type={"number"}
                                />{" "}
                                <span className={"ml-[8px]"}>%</span>
                            </Form.Item>
                            {/*商业贷款*/}
                            <Form.Item label={"商业贷款"}>
                                <Input value={businessTotal} type={"number"} readonly />{" "}
                                <span className={"ml-[8px]"}>万元</span>
                            </Form.Item>
                            {/*商业贷款利率*/}
                            <Form.Item label={"商业贷款利率"}>
                                <Input
                                    value={businessRate}
                                    onChange={value => {
                                        setBusinessRate(value as number)
                                    }}
                                    type={"number"}
                                />{" "}
                                <span className={"ml-[8px]"}>%</span>
                            </Form.Item>
                            {/*贷款年限*/}
                            <Form.Item label={"贷款年限"}>
                                <Input
                                    value={loanYear}
                                    onChange={value => {
                                        setLoanYear(value as number)
                                    }}
                                    type={"number"}
                                />{" "}
                                <span className={"ml-[8px]"}>年</span>
                            </Form.Item>
                            {/*还款模式*/}
                            <Form.Item label={"还款模式"}>
                                <Radio.Group
                                    onChange={e => {
                                        setRepaymentMode(e.target.value)
                                    }}
                                    value={repaymentMode}
                                >
                                    <Radio value={1}>等额本息</Radio>
                                    <Radio value={2}>等额本金</Radio>
                                </Radio.Group>
                            </Form.Item>
                            {/*开始还款时间*/}
                            <Form.Item label={"开始还款时间"}>
                                <DatePicker
                                    value={startRepaymentTime ? dayjs(startRepaymentTime, "YYYY-MM-DD") : undefined}
                                    onChange={(_, dateString) => {
                                        setStartRepaymentTime(dateString)
                                    }}
                                />
                            </Form.Item>
                            {/*每年还款总额*/}
                            {repaymentMode === 1 && (
                                <Form.Item label={"每年还款总额"}>
                                    <Input value={yearPayTotal.toFixed(3)} type={"number"} readonly />{" "}
                                    <span className={"ml-[8px]"}>万元</span>
                                </Form.Item>
                            )}
                        </div>
                    </Form>
                </div>
                <div className={"w-full"}>
                    <Table
                        rowKey={"monthNo"}
                        bordered
                        size={"small"}
                        pagination={{
                            defaultPageSize: 400,
                        }}
                        columns={columns}
                        dataSource={dataSource}
                    ></Table>
                </div>
            </div>
        </Fragment>
    )
}

function Tab(props: { tabs?: { label: string; key: string }[]; activeKey?: string; onChange?: (key: string) => void }) {
    const { tabs, activeKey, onChange } = props
    return (
        <Fragment>
            <div className="tab flex">
                {tabs?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="tab-item min-w-[180px] px-[15px] text-center cursor-pointer py-[6px]"
                            onClick={() => {
                                onChange && onChange(item.key)
                            }}
                            style={{
                                color: activeKey === item.key ? "#fff" : "#333",
                                backgroundColor: activeKey === item.key ? "#1890ff" : "#fff",
                            }}
                        >
                            {item.label}
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

function Input(props: {
    readonly?: boolean
    value?: string | number
    onChange?: (value: string | number) => void
    type?: "text" | "number"
    placeholder?: string
}) {
    const { value, onChange, type } = props
    return (
        <input
            value={value}
            readOnly={props.readonly}
            placeholder={props.placeholder || "请输入"}
            onChange={e => {
                if (type === "number") {
                    if (e.target.value === "") {
                        onChange && onChange("")
                        return
                    }
                    const num = Number(e.target.value)
                    if (isNaN(num)) {
                        return
                    }
                    onChange && onChange(num)
                    return
                } else {
                    onChange && onChange(e.target.value)
                }
            }}
            style={{
                backgroundColor: props.readonly ? "#f5f5f5" : "transparent",
            }}
            type={type || "text"}
            className={"border w-[100px] border-gray-300 rounded h-full outline-none px-[10px] py-[6px]"}
        />
    )
}

export default Debt
