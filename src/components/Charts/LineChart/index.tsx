import {
    TitleComponent,
    TitleComponentOption,
    ToolboxComponent,
    ToolboxComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    GridComponent,
    GridComponentOption,
    LegendComponent,
    LegendComponentOption,
} from "echarts/components"

import { LineChart as ELineChart, LineSeriesOption } from "echarts/charts"
import { UniversalTransition } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

import { useSettingsStore } from "@/store/settings"
import { useEffectOnActive } from "keepalive-for-react"
import { colorSet } from "@/components/Charts"
import echarts from "@/components/Charts"
import cn from "@/utils/cn"
import { memo, useRef } from "react"
import { mergeDeepRight } from "ramda"

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ELineChart,
    CanvasRenderer,
    UniversalTransition,
])

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | LineSeriesOption
>

interface LineChartProps {
    className?: string
    options: EChartsOption
}

function LineChart(props: LineChartProps) {
    const { className, options } = props
    const chartRef = useRef<HTMLDivElement>(null)
    const theme = useSettingsStore(state => state.theme)
    const chartInstance = useRef<echarts.ECharts | null>(null)
    const layoutStretch = useSettingsStore(state => state.layoutStretch)
    useEffectOnActive(
        () => {
            const color = colorSet[theme]

            const defaultOptions: EChartsOption = {
                backgroundColor: "transparent",
                tooltip: {
                    trigger: "axis",
                },
                color: color,
            }

            const mergedOptions = mergeDeepRight(defaultOptions, options)
            if (chartInstance.current && !chartInstance.current.isDisposed) {
                chartInstance.current.dispose()
            }
            const container = chartRef.current
            if (!container) return

            setTimeout(() => {
                chartInstance.current = echarts.init(container, theme)
                chartInstance.current.setOption(mergedOptions)
            }, 200)

            function onResize() {
                chartInstance.current?.resize()
            }

            window.addEventListener("resize", onResize)
            return () => {
                window.removeEventListener("resize", onResize)
                chartInstance.current?.dispose()
            }
        },
        [theme, options, layoutStretch],
        false,
    )

    return <div className={cn("line-chart w-full h-full", className)} ref={chartRef} />
}

export default memo(LineChart)
