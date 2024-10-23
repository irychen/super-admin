import {
    TitleComponent,
    TitleComponentOption,
    GridComponent,
    GridComponentOption,
    DataZoomComponent,
    DataZoomComponentOption,
} from "echarts/components"
import { BarChart as EBarChart, BarSeriesOption } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"

import { useSettingsStore } from "@/store/settings"
import { useEffectOnActive } from "keepalive-for-react"
import { colorSet } from "@/components/Charts"
import echarts from "@/components/Charts"
import cn from "@/utils/cn"
import { memo, useRef } from "react"
import { mergeDeepRight } from "ramda"

echarts.use([TitleComponent, GridComponent, DataZoomComponent, EBarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<
    TitleComponentOption | GridComponentOption | DataZoomComponentOption | BarSeriesOption
>

interface BarChartProps {
    className?: string
    options: EChartsOption
}

function BarChart(props: BarChartProps) {
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

    return <div className={cn("bar-chart w-full h-full", className)} ref={chartRef} />
}

export default memo(BarChart)
