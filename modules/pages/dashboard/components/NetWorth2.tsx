import Body from 'components/typography/Body'
import dynamic from 'next/dynamic'
import React from 'react'
import Money from 'components/money'
// const Chart = dynamic(() => import('chart.js'), { ssr: false })
// import { Doughnut } from 'react-chartjs-2'
import { useEffect } from 'react'
import useInvestmentBalance, { InvestmentBreakDownType } from 'modules/hooks/investment/useGetInvestmentBreakDown'
import LoadingWrapper from 'components/layout/loading-wrapper'
import { Doughnut, Chart, defaults } from 'react-chartjs-2'
import { Box, Circle, Divider, Flex, HStack, Stack } from '@chakra-ui/react'
import Small from 'components/typography/Small'
import ResponsiveContainer from 'components/layout/responsive-container'
import Caption from 'components/typography/Caption'
import { hexToRGBA3 } from 'lib/theme/color'
import { CurrencyType } from 'components/types/type'

type Props = {
	breakdown?: InvestmentBreakDownType
	currency?: { id: number; code: string; name: string }
}

const backgroundColor = [hexToRGBA3('claret', 100, 1), 'black', 'rgb(255, 205, 86)']

const NetWorth = ({ breakdown, ...others }: Props) => {
	//const investmentBalance = useInvestmentBalance()
	// const position = useBreakpointValue({base:'top',md:'right'})
	console.log(others.currency)

	const data = {
		labels: breakdown?.portfolio_breakdown.map((a) => a.name) || [],
		datasets: [
			{
				data: breakdown?.portfolio_breakdown.map((v) => 900) || [],
				backgroundColor,
				hoverOffset: 1,
				cutout: '70%',
			},
		],
	}

	const data2 = (canvas) => {
		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
		const gradient = ctx?.createLinearGradient(0, 0, 100, 0)
		// if (ctx?.font && ctx.textAlign && ctx.fillStyle) {
		// 	//@ts-ignore
		// 	ctx.font = '30px sans'
		// 	//@ts-ignore
		// 	ctx.textAlign = 'center'
		// 	//@ts-ignore
		// 	ctx.fillStyle = 'red'
		// 	// ctx?.fillText('jjjihuiu', 90, 90)

		// 	ctx?.save()
		// }
		return {
			...data,
		}
	}

	// useEffect(() => {
	// 	if (typeof document !== 'undefined' && !investmentBalance.isFetching) {
	// 		const canvas = document.getElementsByTagName('canvas')[0]
	// 		const ctx = canvas.getContext('2d')
	// 		if (ctx?.font && ctx.textAlign && ctx.fillStyle) {
	// 			//@ts-ignore
	// 			ctx.font = '30px sans'
	// 			//@ts-ignore
	// 			ctx.textAlign = 'center'
	// 			//@ts-ignore
	// 			ctx.fillStyle = 'red'
	// 			// ctx?.fillText('jjjihuiu', 90, 90)
	// 			ctx?.save()
	// 		}
	// 	}
	// }, [investmentBalance.isFetching])
	return (
		<Stack
			align="center"
			direction={{ base: 'column', md: 'row' }}
			sx={{ gap: '0.5rem' }}
			breakPoint="580px"
			justify={{ md: 'space-between', base: 'center' }}
		>
			<Box width={180} height={180} position="relative">
				<Doughnut
					redraw={false}
					width={180}
					height={180}
					type="doughnut"
					// data={data2}
					data={data2}
					options={{
						responsive: true,
						cutout: 50,
						maintainAspectRatio: false,
						elements: {
							center: {
								text: 'Red is 2/3 the total numbers',
								color: '#FF6384', // Default is #000000
								fontStyle: 'Arial', // Default is Arial
								sidePadding: 20, // Default is 20 (as a percentage)
								minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
								lineHeight: 25, // Default is 25 (in px), used for when text wraps
							},
						},
						plugins: {
							legend: {
								display: false,
								//position: isSmall ? 'right' : 'top',
							},
						},
					}}
				/>
				<Stack position="absolute" align="center" top="50%" left="50%" transform="translate(-50%, -50%)">
					<Body fontSize="0.8rem" m={0} mb={-2} color="gray.400">
						Total Interest
					</Body>
					{breakdown?.portfolio_breakdown.map((portfolio, i) => {
						const currency = portfolio.balance.find((v, i) => v.currency.code === others.currency?.code)
						return (
							<Money currency={currency?.currency.code} key={i} fontSize="0.8rem">
								{currency?.amount}
							</Money>
						)
					})}
				</Stack>
			</Box>
			<Stack>
				{breakdown?.portfolio_breakdown.map((portfolio, i) => {
					const currency = portfolio.balance.find((v, i) => v.currency.code === others.currency?.code)
					return (
						<Stack direction="row" key={i} justify="space-between" spacing="2" align="baseline">
							<HStack align="center">
								<Box boxSize="2" backgroundColor={backgroundColor[i]} rounded="full" />

								<Body alignSelf="flex-start" variant="regular13">
									{portfolio.name}
								</Body>
							</HStack>
							<Money variant="semibold13" currency={currency?.currency.code}>
								{currency?.amount}
							</Money>
						</Stack>
					)
				})}
				{/* <Divider />
				<Stack direction="row" align="center" justify="space-between">
					<Caption alt>Total Balance</Caption>
					<Money variant="semibold18" currency={others.currency?.code}>
						{breakdown?.total_balance.find((v) => v.currency.code === others.currency?.code)?.amount}
					</Money>
				</Stack> */}
			</Stack>
		</Stack>
	)
}

export default React.memo(NetWorth)
