import { Card, DatePickerProps, Form, FormItemProps, InputProps, SelectProps, Table, TableProps } from "antd"
import SearchForm, { SearchFormRef } from "./components/SearchForm"
import {
    Key,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react"
import { ColumnTitle, ColumnType } from "antd/es/table/interface"
import { isNil } from "fortea"
import { RangePickerProps } from "antd/es/date-picker"
import { Dayjs } from "dayjs"
import { SizeType } from "antd/es/config-provider/SizeContext"

export type ScrollConfig = {
    index?: number
    key?: Key
    top?: number
}

function useActionRef() {
    return useRef<Action>(null)
}

interface Action extends SearchFormRef {
    scrollTo?: (config: ScrollConfig) => void
    nativeElement?: HTMLDivElement
    reload?: (reset?: boolean) => void
}

export interface SuperTableProps<RecordType> extends TableProps<RecordType> {
    showSearchForm?: boolean
    actionRef?: RefObject<Action>
    columns?: SuperTableColumnsType<RecordType>
    request?: (params: any) => Promise<{
        data: RecordType[]
        total?: number
    }>
    /**
     * whether to expand search form by default
     * 是否默认展开搜索表单
     */
    defaultExpandSearchForm?: boolean
    /**
     * grid width for search form items in px
     * 搜索表单项的网格宽度
     * @default 280
     */
    searchFormGridWidth?: number
    /**
     * grid gap for search form items in px
     * 搜索表单项的网格间距
     * @default 16
     */
    searchFormGridGap?: number

    /**
     * 外部参数 用于传递给 request 的参数 优先级高于表单参数 字段重复时会覆盖
     */
    params?: any

    /**
     * transform pagination params before passing to request
     * 转换分页参数
     * @default { pageNoKey: 'pageNo', pageSizeKey: 'pageSize' }
     */
    paginationTransform?: {
        pageNoKey: string
        pageSizeKey: string
    }

    size?: SizeType

    tableHeadLeft?: ReactNode
    tableHeadRight?: ReactNode

    onExport?: (params: any, selectedRows: RecordType[]) => Promise<void>
}

interface SuperTableColumnTypeBase<RecordType, ValueType extends SuperTableValueType = "input">
    extends ColumnType<RecordType> {
    /**
     * whether to show search form for this column
     * 是否在搜索表单中显示
     * @default true
     */
    showSearch?: boolean
    /**
     * whether to hide in table
     * 是否在表格中隐藏
     * @default false
     */
    hideInTable?: boolean

    title?: ColumnTitle<RecordType> | string

    /*
    =========================================== for search form =================================
     */
    formItemProps?: FormItemProps
    valueType?: ValueType
    fieldProps?: ValueTypeToFieldPropsMap[ValueType]
    initialValue?: any
    formItemRender?: (
        column: SuperTableColumnTypeBase<RecordType, ValueType>,
        form: ReturnType<typeof Form.useForm>,
    ) => ReactNode
}

type SuperTableValueType = "input" | "select" | "date" | "dateRange"

export type SuperTableColumnType<RecordType> =
    | SuperTableColumnTypeBase<RecordType, "input">
    | SuperTableSelectColumnType<RecordType>
    | SuperTableDatePickerColumnType<RecordType>
    | SuperTableDateRangePickerColumnType<RecordType>

type ValueTypeToFieldPropsMap = {
    input: InputProps
    select: SelectProps
    date: DatePickerProps
    dateRange: RangePickerProps
}

export interface SuperTableSelectColumnType<RecordType> extends SuperTableColumnTypeBase<RecordType, "select"> {
    selectOptions: Array<{ label: string; value: string }>
}

export interface SuperTableDatePickerColumnType<RecordType> extends SuperTableColumnTypeBase<RecordType, "date"> {
    /**
     * transform value before passing to request
     *
     * @param value
     * @returns string
     */
    transform?: (value?: Dayjs) => Record<string, any>
    /**
     * format for date ref: https://day.js.org/docs/en/display/format
     */
    format?: string
}

export interface SuperTableDateRangePickerColumnType<RecordType>
    extends SuperTableColumnTypeBase<RecordType, "dateRange"> {
    /**
     * transform value before passing to request
     *
     * @param value
     * @returns [string, string]
     */
    transform?: (value?: [Dayjs, Dayjs]) => [string, string]
    /**
     * map key for range value
     * 例如将字段 "time" 的值转换为 ["timeStart", "timeEnd"]
     *  @default ["timeStart", "timeEnd"]
     */
    rangeStartEndKey?: [string, string]
    /**
     * format for date ref: https://day.js.org/docs/en/display/format
     */
    format?: string
}

export interface SuperTableColumnGroupType<RecordType> extends Omit<SuperTableColumnType<RecordType>, "dataIndex"> {
    children: SuperTableColumnType<RecordType>
}

export type SuperTableColumnsType<RecordType = any> = (
    | SuperTableColumnGroupType<RecordType>
    | SuperTableColumnType<RecordType>
)[]

const SuperTable = <T extends object>({ ...props }: SuperTableProps<T>) => {
    const {
        showSearchForm = true,
        actionRef,
        columns,
        request,
        defaultExpandSearchForm,
        searchFormGridWidth,
        searchFormGridGap,
        params,
        paginationTransform,
        size,
        tableHeadLeft,
        tableHeadRight,
        ...restProps
    } = props
    const superTableRef = useRef<HTMLDivElement>(null)
    const tblRef: Parameters<typeof Table>[0]["ref"] = useRef(null)
    const [dataSource, setDataSource] = useState<T[]>([])
    const [pageSize, setPageSize] = useState<number>(10)
    const [pageNo, setPageNo] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const searchFormRef = useRef<SearchFormRef>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const getData = useCallback(() => {
        const { pageNoKey, pageSizeKey } = paginationTransform || { pageNoKey: "pageNo", pageSizeKey: "pageSize" }
        const allParams = {
            [pageNoKey]: pageNo,
            [pageSizeKey]: pageSize,
            ...(searchFormRef.current?.getParams() || {}),
            ...(params || {}),
        }
        if (request) {
            setLoading(true)
            request(allParams)
                .then(res => {
                    setDataSource(res.data)
                    setTotal(res.total || res.data.length || 0)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [pageNo, pageSize, paginationTransform, params, request])

    useImperativeHandle(
        actionRef,
        () => ({
            scrollTo: tblRef.current?.scrollTo,
            nativeElement: tblRef.current?.nativeElement,
            getParams: () => searchFormRef.current?.getParams(),
            resetFields: () => searchFormRef.current?.resetFields(),
            getFieldsValue: () => searchFormRef.current?.getFieldsValue(),
            reload: (reset = false) => {
                if (reset) {
                    searchFormRef.current?.resetFields()
                    setPageNo(1)
                } else {
                    getData()
                }
            },
        }),
        [],
    )

    const showTableColumns = useMemo(() => {
        return columns?.filter(column => {
            if (isNil(column.align)) {
                column.align = "center"
            }
            if (!isNil(column?.hideInTable)) {
                return !column.hideInTable
            } else {
                return true
            }
        })
    }, [columns])
    const showSearchColumns = useMemo(() => {
        // recursively find all columns that show search form
        const searchColumns: SuperTableColumnType<T>[] = []

        function findSearchColumns(columns?: SuperTableColumnsType<T>) {
            if (!columns) return
            columns.forEach(column => {
                if ("children" in column) {
                    findSearchColumns([column.children])
                } else {
                    if (isNil(column.showSearch)) {
                        searchColumns.push(column)
                    } else {
                        if (column.showSearch) {
                            searchColumns.push(column)
                        }
                    }
                }
            })
        }

        findSearchColumns(columns)
        return searchColumns
    }, [columns])

    useEffect(() => {
        getData()
    }, [params, pageNo, pageSize])

    return (
        <div className="super-table" ref={superTableRef}>
            {showSearchForm && (
                <Card
                    bordered={false}
                    styles={{
                        body: {
                            padding: 16,
                        },
                    }}
                    style={{ marginBottom: 12 }}
                >
                    <SearchForm<T>
                        size={size}
                        searchFormRef={searchFormRef}
                        formGridGap={searchFormGridGap}
                        formGridWidth={searchFormGridWidth}
                        items={showSearchColumns}
                        defaultExpandSearchForm={defaultExpandSearchForm}
                        onSearch={() => {
                            getData()
                        }}
                        onReset={() => {
                            getData()
                        }}
                    />
                </Card>
            )}
            <Card
                bordered={false}
                styles={{
                    body: {
                        padding: 16,
                    },
                }}
            >
                {tableHeadLeft || tableHeadRight ? (
                    <div className={"flex justify-between w-full pb-[12px]"}>
                        <div>{tableHeadLeft}</div>
                        <div>{tableHeadRight}</div>
                    </div>
                ) : null}
                <Table<T>
                    showSorterTooltip={false}
                    loading={loading}
                    size={"small"}
                    ref={tblRef}
                    pagination={{
                        pageSize: pageSize,
                        total: total,
                        current: pageNo,
                        onChange: (page, pageSize) => {
                            setPageNo(page)
                            setPageSize(pageSize)
                        },
                    }}
                    {...restProps}
                    columns={showTableColumns}
                    dataSource={dataSource}
                />
            </Card>
        </div>
    )
}

SuperTable.useActionRef = useActionRef

export default SuperTable
