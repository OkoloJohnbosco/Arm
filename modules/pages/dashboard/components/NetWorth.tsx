import { Chart, ChartContext } from 'components/chart'
import Body from 'components/typography/Body'
import dynamic from 'next/dynamic'
import React from 'react'
import Money from 'components/money'
import { CustomerBusinessType } from 'modules/account/types'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
	business?: CustomerBusinessType[]
}

const NetWorth = (props: Props) => {
	const values = props.business?.reduce(
		(accum, business) => {
			//@ts-ignore
			accum.labels.push(business.name)
			//@ts-ignore
			accum.series.push(business.total_balance)
			return accum
		},
		{ labels: [], series: [] }
	)

	return (
		<ChartContext.Provider
			value={{
				subTitle: 'Portfolio Performance Overtime',

				// @ts-ignore
				options: {
					//series,
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
				},
			}}
		>
			<ApexChart
				// series={[90, 30, 50]}
				series={values?.series || []}
				options={{
					plotOptions: {
						pie: {
							donut: {
								labels: {
									//	position:'botto',
									show: true,
									total: {
										show: true,
										label: 'Total',
										formatter: () =>
											`
												NGN 23000
											`,
									},
								},
							},
						},
					},
					labels: values?.labels, //['Retirement Savings Account', 'Money Market Fund', 'Discovery Balanced Fund', 'Treasury Bills'],
				}}
				type="donut"
				height="250px"
			/>
		</ChartContext.Provider>
	)
}

export default NetWorth
