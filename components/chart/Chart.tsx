import { Box, Flex } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import { fontFamily } from 'components/typography/config'
import { colors } from 'lib/theme'
import dynamic from 'next/dynamic'
import React, { useContext } from 'react'
import { truncateDecimals } from 'utils/helpers'
import ChartContext from './ChartContext'
import { GraphType } from './types'
// import { Bar } from 'react-chartjs-2'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Chart = () => {
	const { options, widgetComp: Widget, title, subTitle, height } = useContext(ChartContext)
	const _options: {
		series: {}[]
		labels: string[]
	} = options
	const { series, ...others } = options
	//@ts-ignore
	const state: GraphType = {
		chart: {
			toolbar: {
				show: false,
				tools: {
					show: false,
				},
			},
		},
		legend: {
			show: false,
			position: 'top',
		},
		dataLabels: {
			enabled: false,
			style: {
				fontSize: '12px',
				colors: [null],
			},
		},
		stroke: {
			width: 1.5,
			curve: 'smooth',
		},

		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.7,
				opacityTo: 0.9,
				stops: [0, 90, 100],
			},
		},
		yaxis: {
			// title: {
			// 	text: 'Transaction Amount'
			// },
			labels: {
				formatter: function (val) {
					return truncateDecimals(val)
				},
				style: {
					fontSize: '10px',
					fontFamily: fontFamily.SFProDisplay,
					color: colors['neutral-500'],
				},
			},
			opposite: false,
		},

		tooltip: {
			followCursor: true,

			// y: {
			// 	formatter: function(val) {
			// 		return val
			// 	}
			// }
			custom: function ({ series, seriesIndex, dataPointIndex, w }) {
				return '<div class="arrow_box">' + '<span>' + series[seriesIndex][dataPointIndex] + '</span>' + '</div>'
			},
		},
		xaxis: {
			show: true,
			labels: {
				rotate: -95,
			},
		},

		...others,
	}

	return (
		<Box id="chart" maxW="full">
			<Flex
				border="none"
				p="none"
				//@ts-ignore
				direction={{ sm: 'row', base: 'column' }}
				justify="space-between"
				spacing={4}
				//	h='full'
			>
				<Caption ml={4} alt color="blue-600">
					{subTitle}
				</Caption>

				<Box zIndex={40}>{Widget}</Box>
			</Flex>

			<ApexChart options={state} series={series} type="area" width="100%" height={height || '350px'} />
		</Box>
	)
}

export default React.memo(Chart)
