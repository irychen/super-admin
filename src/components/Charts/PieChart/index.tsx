import { TooltipComponent, TooltipComponentOption, LegendComponent, LegendComponentOption } from "echarts/components"
import { PieChart as EPieChart, PieSeriesOption } from "echarts/charts"
import { LabelLayout } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

import { useSettingsStore } from "@/store/settings"
import { useEffectOnActive } from "keepalive-for-react"
import { colorSet } from "@/components/Charts"
import echarts from "@/components/Charts"
import cn from "@/utils/cn"
import { memo, useRef } from "react"
import { mergeDeepRight } from "ramda"

echarts.use([TooltipComponent, LegendComponent, EPieChart, CanvasRenderer, LabelLayout])

type EChartsOption = echarts.ComposeOption<TooltipComponentOption | LegendComponentOption | PieSeriesOption>

interface PieChartProps {
    className?: string
    options: EChartsOption
}

function PieChart(props: PieChartProps) {
    const { className, options } = props
    const chartRef = useRef<HTMLDivElement>(null)
    const theme = useSettingsStore(state => state.theme)
    const chartInstance = useRef<echarts.ECharts | null>(null)
    const layoutStretch = useSettingsStore(state => state.layoutStretch)
    useEffectOnActive(
        active => {
            if (!active) return
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
            }, 100)

            function onResize() {
                chartInstance.current?.resize()
            }

            window.addEventListener("resize", onResize)
            return () => {
                window.removeEventListener("resize", onResize)
                chartInstance.current?.dispose()
            }
        },
        false,
        [theme, options, layoutStretch],
    )

    return <div className={cn("pie-chart w-full h-full", className)} ref={chartRef} />
}

export default memo(PieChart)
