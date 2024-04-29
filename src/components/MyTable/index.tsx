import { Button, Form, Input, Select, Space, Table } from "antd"
import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { isFunc } from "fortea"

interface MyTableProps<T> {
    columns?: MyTableColumn<T>[]
    fetchData?: (params: any) => Promise<{
        data: T[]
        pageSize?: number
        current?: number
        total: number
        success?: boolean
    }>
    rowKey?: string
    scroll?: { x: number; y: number }
    virtual?: boolean
    pagination?: boolean
    showLoading?: boolean
    pageSizes?: number[]
}

interface MyTableColumn<T> {
    title?: string
    align?: "center" | "left" | "right"
    dataIndex?: string
    key?: string
    valueType?: "dateRange" | "select" | "text"
    valueEnum?: Record<string, { text: string }>
    options?: { value: string; label: string }[]
    render?: (text: string | number, row: T) => JSX.Element
    hideInTable?: boolean
    hideInSearch?: boolean
    fixed?: "left" | "right"
    width?: number
}

const MyTable = forwardRef(function <T>(props: MyTableProps<T>, ref: any) {
    const { columns = [], fetchData, showLoading = true } = props
    const [searchCollapsed, setSearchCollapsed] = useState<boolean>(false)
    const searchFormContainerRef = useRef<HTMLDivElement>(null)
    const [searchFormContainerWidth, setSearchFormContainerWidth] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [pageSizes, setPageSizes] = useState<number[]>([10, 20, 50, 100])
    const [total, setTotal] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [current, setCurrent] = useState<number>(1)
    const [dataSource, setDataSource] = useState<any[]>([])
    const [form] = Form.useForm()

    useEffect(() => {
        if (props.pageSizes) {
            setPageSizes(props.pageSizes)
        }
    }, [props.pageSizes])

    const formItemWidth = 260

    // observe search form container width
    useLayoutEffect(() => {
        console.log("searchFormContainerRef", searchFormContainerRef.current)
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                setSearchFormContainerWidth(entry.contentRect.width)
            }
        })
        if (!searchFormContainerRef.current) return
        observer.observe(searchFormContainerRef.current)
        return () => {
            observer.disconnect()
        }
    }, [setSearchFormContainerWidth])

    const maxColumns = useMemo(() => {
        return Math.floor((searchFormContainerWidth + 8) / (formItemWidth + 8))
    }, [searchFormContainerWidth])

    const showColumns = useMemo(() => {
        let r = columns.filter(column => !column.hideInTable)
        if (searchCollapsed) {
            r = r.slice(0, maxColumns - 1)
        }
        return r
    }, [maxColumns, columns, searchCollapsed])

    const showCollapsedBtn = useMemo(() => {
        const okColumns = columns.filter(column => !column.hideInTable)
        return maxColumns - 1 < okColumns.length
    }, [maxColumns, columns])

    const loadData = () => {
        const params = form.getFieldsValue()
        if (isFunc(fetchData)) {
            setLoading(true)
            fetchData({
                ...params,
                pageSize,
                current,
            })
                .then(res => {
                    const { data = [], total } = res
                    setDataSource(data)
                    setTotal(total || data.length || 0)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    // listen to page size and current page change
    useEffect(() => {
        loadData()
    }, [pageSize, current])

    return (
        <div className={"w-full"}>
            <div className={"mb-[10px] w-full"} ref={searchFormContainerRef}>
                <Form form={form} size={"middle"} className={"w-full"} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <div
                        className={"grid gap-[8px] w-full"}
                        style={{
                            // auto grid columns with 200px width
                            gridTemplateColumns: `repeat(auto-fill, ${formItemWidth}px)`,
                            height: searchCollapsed ? "56px" : "auto",
                            overflow: searchCollapsed ? "hidden" : "auto",
                        }}
                    >
                        {showColumns?.map(column => {
                            const { title, valueType, dataIndex, key } = column
                            if (valueType === "select") {
                                return (
                                    <Form.Item label={title} name={dataIndex} key={key || dataIndex}>
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder={`请选择`}
                                            options={column?.options || []}
                                        ></Select>
                                    </Form.Item>
                                )
                            }

                            return (
                                <Form.Item label={title} name={dataIndex} key={key || dataIndex}>
                                    <Input placeholder={`请输入`} />
                                </Form.Item>
                            )
                        })}
                        <Form.Item className={"flex justify-end"}>
                            <Space>
                                <Button type={"primary"} onClick={loadData}>
                                    查询
                                </Button>
                                <Button
                                    type={"primary"}
                                    ghost
                                    onClick={() => {
                                        form.resetFields()
                                        setCurrent(1)
                                    }}
                                >
                                    重置
                                </Button>
                                {/*展开 / 收起*/}
                                {showCollapsedBtn && (
                                    <Button
                                        onClick={() => {
                                            setSearchCollapsed(!searchCollapsed)
                                        }}
                                    >
                                        {searchCollapsed ? "展开" : "收起"}
                                    </Button>
                                )}
                            </Space>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div>
                <Table
                    size={"small"}
                    ref={ref}
                    pagination={{
                        total,
                        pageSize,
                        current,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: total => `共 ${total} 条`,
                        pageSizeOptions: pageSizes,
                        onChange: (page, pageSize) => {
                            setCurrent(page)
                            setPageSize(pageSize || 10)
                        },
                        onShowSizeChange: (current, size) => {
                            setCurrent(current)
                            setPageSize(size || 10)
                        },
                    }}
                    dataSource={dataSource}
                    loading={loading && showLoading}
                    rowKey={props.rowKey || "id"}
                    columns={columns}
                ></Table>
            </div>
        </div>
    )
})

export default MyTable
