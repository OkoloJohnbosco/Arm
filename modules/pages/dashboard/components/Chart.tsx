import { Chart, ChartContext } from 'components/chart'
import React from 'react'

const series = [
	{ type: 'area', data: [90], name: '9kjn' },
	{ type: 'line', data: [9], name: '9kjn' },
	{ type: 'line', data: [1000], name: '9kjn' },
	{ type: 'line', data: [90], name: '9kjn' },
	{ type: 'line', data: [90], name: '9kjn' },
]

const ChartComponent = () => {
	return (
		<ChartContext.Provider
			value={{
				subTitle: 'Portfolio Performance Overtime',
				height: '280px',
				options: {
					//@ts-ignore
					series,
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
				},
			}}
		>
			<Chart />
		</ChartContext.Provider>
	)
}

export default ChartComponent
