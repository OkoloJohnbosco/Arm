import { ColorProps } from 'lib/theme/type'

type SeriesType =
	| 'line'
	| 'area'
	| 'bar'
	| 'histogram'
	| 'pie'
	| 'donut'
	| 'rangeBar'
	| 'radialBar'
	| 'scatter'
	| 'bubble'
	| 'heatmap'
	| 'candlestick'
	| 'radar'
	| 'polarArea'

export type GraphSeriesType = { name: string; type?: SeriesType; data: any[] }

type Yaxis = {
	title?: {
		text: string
	}
	labels?: {
		formatter: (v) => any
		style: {
			fontSize: string
			fontFamily: string
			color: string
		}
	}
	opposite?: boolean
}
type Xaxis = {
	show?: boolean
	labels?: {
		rotate?: number
	}
	type?: 'datetime'
	title?: {
		text: string
	}
}

type ToolTip = {
	followCursor?: boolean
	y?: {
		formatter: (value) => string
	}
	custom?: (props: { series; seriesIndex; dataPointIndex; w }) => any
}

type Chart = {
	toolbar: {
		show: boolean
		tools: {
			show: boolean
		}
	}
}
type DataLabels = {
	enabled: boolean
	style: {
		fontSize: string
		colors: Array<any>
	}
}

type Stroke = {
	width: number
	curve: 'smooth'
}
type Fill = {
	type: 'gradient'
	gradient: {
		shadeIntensity: number
		opacityFrom: number
		opacityTo: number
		stops: Array<number>
	}
}
export interface GraphType {
	chart: Chart
	legend: {
		show: boolean
		position: 'top' | 'bottom' | 'left' | 'right'
	}
	dataLabels: DataLabels
	stroke: Stroke
	fill: Fill
	labels: string[]
	colors?: ColorProps[]

	xaxis?: Xaxis
	yaxis: Yaxis
	tooltip: ToolTip
	series: GraphSeriesType[]
	title: {
		text: string
	}
	subtitle: {
		text: string
	}
}

export type ChartContextType = {
	height?: string
	title?: string
	subTitle?: string

	widgetComp?: JSX.Element
	options: { series: GraphSeriesType[]; labels: any[] } //GraphType
}
