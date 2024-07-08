import { Button, DatePicker, DatePickerProps, Form, Input, InputProps, Select, SelectProps, Space } from "antd"
import {
    SuperTableColumnType,
    SuperTableDatePickerColumnType,
    SuperTableDateRangePickerColumnType,
} from "@/components/SuperTable"
import { ReactNode, RefObject, useEffect, useImperativeHandle, useRef, useState } from "react"
import { isFunc, isNil, isString } from "fortea"

import { RangePickerProps } from "antd/es/date-picker"
import { SizeType } from "antd/es/config-provider/SizeContext"
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons"

export interface SearchFormRef {
    getFieldsValue: () => Record<string, any> | undefined
    resetFields: () => void
    getParams: () => Record<string, any> | undefined
    setFieldsValue: (values: Record<string, any>) => void
}

interface SearchFormProps<RecordType> {
    items?: SuperTableColumnType<RecordType>[]
    defaultExpandSearchForm?: boolean
    formGridWidth?: number
    formGridGap?: number
    onReset?: () => void
    onSearch?: () => void
    searchFormRef?: RefObject<SearchFormRef>
    size?: SizeType
    hideCollapseButton?: boolean
    hideResetButton?: boolean
    extraNodes?: ReactNode[]
}

const SearchForm = <T extends object>({ ...props }: SearchFormProps<T>) => {
    const {
        items = [],
        onReset,
        onSearch,
        searchFormRef,
        defaultExpandSearchForm = false,
        formGridGap = 16,
        formGridWidth = 280,
        hideResetButton = false,
        hideCollapseButton = false,
        size,
        extraNodes = [],
    } = props
    const initialValues: any = {}
    const formContainerRef = useRef<HTMLDivElement>(null)

    items.forEach(item => {
        if (item.dataIndex && item.initialValue) {
            initialValues[item.dataIndex] = item.initialValue
        }
    })

    const [expandSearchForm, setExpandSearchForm] = useState(hideCollapseButton ? true : defaultExpandSearchForm)
    const [maxCol, setMaxCol] = useState(1)
    const [form] = Form.useForm()

    // get max column count of search form by container width
    useEffect(() => {
        // observe container width
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width } = entry.contentRect
                const col = Math.floor(width / formGridWidth)
                setMaxCol(col)
            }
        })
        observer.observe(formContainerRef.current as Element)
        return () => {
            observer.disconnect()
        }
    }, [formGridWidth])

    useImperativeHandle(
        searchFormRef,
        () => ({
            getFieldsValue: () => form.getFieldsValue(),
            resetFields: () => form.resetFields(),
            getParams: () => {
                let params = {
                    ...form.getFieldsValue(true),
                }
                const rangePickerColumns = items.filter(column => column.valueType === "dateRange")
                rangePickerColumns?.forEach(column => {
                    const { rangeStartEndKey, transform, dataIndex, format } =
                        column as SuperTableDateRangePickerColumnType<any>
                    if (params[dataIndex]) {
                        if (isFunc(transform)) {
                            params[dataIndex] = transform(params[dataIndex])
                        } else if (format) {
                            params[dataIndex] = params[dataIndex].map((item: any) => item.format(format))
                        } else {
                            params[dataIndex] = params[dataIndex].map((item: any) => item.format("YYYY-MM-DD"))
                        }
                    }
                    const [startKey, endKey] = rangeStartEndKey || ["timeStart", "timeEnd"]
                    params[startKey] = params[dataIndex]?.[0]
                    params[endKey] = params[dataIndex]?.[1]
                    delete params[dataIndex]
                })
                // find all columns with valueType === 'date'
                const datePickerColumns = items.filter(column => column.valueType === "date")
                datePickerColumns?.forEach(column => {
                    const { transform, dataIndex, format } = column as SuperTableDatePickerColumnType<any>
                    if (params[dataIndex]) {
                        if (isFunc(transform)) {
                            const data = transform(params[dataIndex]) || {}
                            params = {
                                ...params,
                                ...data,
                            }
                            delete params[dataIndex]
                        } else if (format) {
                            params[dataIndex] = params[dataIndex].format(format)
                        } else {
                            params[dataIndex] = params[dataIndex].format("YYYY-MM-DD")
                        }
                    }
                })
                return params
            },
            setFieldsValue: (values: Record<string, any>) => {
                form.setFieldsValue(values)
            },
        }),
        [],
    )

    return (
        <div ref={formContainerRef} className="super-table-search-form">
            <Form
                size={size}
                form={form}
                layout={"inline"}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={initialValues}
            >
                <div
                    style={{
                        width: "100%",
                        display: "grid",
                        gap: formGridGap,
                        gridTemplateColumns: `repeat(${maxCol}, 1fr)`,
                    }}
                >
                    {[...items]
                        .slice(0, expandSearchForm ? items.length : maxCol - extraNodes.length - 1)
                        .map((column, index) => (
                            <Form.Item
                                style={{
                                    marginInlineEnd: 0,
                                }}
                                name={isString(column.dataIndex) ? column.dataIndex : ""}
                                label={isString(column.title) ? column.title : isFunc(column.title) ? "" : column.title}
                                {...(column?.formItemProps || {})}
                                key={column.key || index}
                            >
                                {(isNil(column.valueType) || column.valueType === "input") && (
                                    <Input
                                        placeholder={isString(column.title) ? `请输入${column.title}` : "请输入"}
                                        {...((column.fieldProps as InputProps) || {})}
                                    />
                                )}
                                {column.valueType === "select" && (
                                    <Select
                                        getPopupContainer={triggerNode => triggerNode.parentNode}
                                        options={column.selectOptions || []}
                                        placeholder={isString(column.title) ? `请选择${column.title}` : "请选择"}
                                        {...((column.fieldProps as SelectProps<T>) || {})}
                                    />
                                )}
                                {column.valueType === "date" && (
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        getPopupContainer={() => formContainerRef.current as HTMLElement}
                                        {...((column.fieldProps as DatePickerProps) || {})}
                                    />
                                )}
                                {column.valueType === "dateRange" && (
                                    <DatePicker.RangePicker
                                        getPopupContainer={() => formContainerRef.current as HTMLElement}
                                        {...((column.fieldProps as RangePickerProps) || {})}
                                    />
                                )}
                            </Form.Item>
                        ))}
                    {extraNodes}
                    <EmptyFormItemsSpace
                        maxCol={maxCol}
                        total={items.length + extraNodes.length}
                        expandSearchForm={expandSearchForm}
                    />

                    <div className={"search-form-control flex justify-end"}>
                        <Space>
                            <Button type={"primary"} onClick={onSearch} icon={<SearchOutlined />}>
                                查询
                            </Button>

                            {hideResetButton !== true && (
                                <Button
                                    type={"primary"}
                                    ghost
                                    icon={<ReloadOutlined />}
                                    onClick={() => {
                                        form.resetFields()
                                        onReset && onReset()
                                    }}
                                >
                                    重置
                                </Button>
                            )}
                            {maxCol < items.length + extraNodes.length + 1 && !hideCollapseButton && (
                                <Button
                                    type={"primary"}
                                    onClick={() => {
                                        setExpandSearchForm(!expandSearchForm)
                                    }}
                                >
                                    {expandSearchForm ? "收起" : "展开"}
                                </Button>
                            )}
                        </Space>
                    </div>
                </div>
            </Form>
        </div>
    )
}

function EmptyFormItemsSpace(props: { maxCol: number; total: number; expandSearchForm?: boolean }) {
    const { maxCol, total, expandSearchForm } = props
    if (maxCol > total + 1) {
        return (
            <div
                style={{
                    gridColumn: `span ${maxCol - total - 1}`,
                }}
            />
        )
    }

    if (expandSearchForm) {
        const emptyCount = maxCol - (total % maxCol) - 1
        if (emptyCount > 0) {
            return (
                <div
                    style={{
                        gridColumn: `span ${emptyCount}`,
                    }}
                />
            )
        }
    }

    return null
}

export default SearchForm
