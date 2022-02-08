import { Box, ButtonGroup, Stack, StackDivider } from '@chakra-ui/react'
import Button from 'components/button/Button'
import { StackCard } from 'components/card'
import LoadingWrapper from 'components/layout/loading-wrapper'
import ArrowLink from 'components/link/ArrowLink'
import { CurrencyType } from 'components/types/type'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import React, { useEffect, useState } from 'react'
import useInvestmentBalance from '../../hooks/investment/useGetInvestmentBreakDown'
import NetWorth from './components/NetWorth2'
import PortFolioBreakDownSkeleton from './PortFolioBreakdownSkeleton'

const PortFolioBreakDown = () => {
	const investmentBalance = useInvestmentBalance()
	const [selectedCurrency, setSelectedCurrency] = useState<{ id: number; name: string; code: string }>()
	console.log(selectedCurrency)
	useEffect(() => {
		if (investmentBalance.value?.total_balance.length) {
			setSelectedCurrency(investmentBalance.value?.total_balance[0].currency)
		}
	}, [investmentBalance.value])
	return (
		<StackCard
			responsive
			divider={<StackDivider />}
			spacing={4}
			h="full"
			//w={{ md: '60%', base: 'full' }}
			//h="fit-content"
		>
			<Caption alt className="playfair-header">
				Total Networth Breakdown
			</Caption>

			<LoadingWrapper
				loader={<PortFolioBreakDownSkeleton />}
				isLoading={!investmentBalance.value?.portfolio_breakdown && investmentBalance.isFetching}
			>
				<Stack spacing={8} justify="space-between">
					<Box justifySelf="center" alignSelf="center">
						<ButtonGroup isAttached w="full" rounded="md">
							{investmentBalance.value?.total_balance.map((b, i) => {
								return i == 0 ? (
									<Button
										onClick={() => setSelectedCurrency(b.currency)}
										borderRightColor="white"
										borderRight="1px"
										rounded={3}
										alt
										size="sm"
										px="8"
									>
										{b.currency.name}
									</Button>
								) : (
									<Button size="sm" alt px="8" rounded={3} onClick={() => setSelectedCurrency(b.currency)}>
										{b.currency.name}
									</Button>
								)
							})}
						</ButtonGroup>
					</Box>
					<Box>
						<NetWorth breakdown={investmentBalance.value} currency={selectedCurrency} />
					</Box>
					<Box alignSelf="flex-end">
						<Small color="gray.400" pb={2}>
							Want to increase portfolio value ?
						</Small>
						<ArrowLink href="" isChevron={true} color="claret.500">
							Goto Investment Center
						</ArrowLink>
					</Box>
				</Stack>
			</LoadingWrapper>
		</StackCard>
	)
}

export default PortFolioBreakDown
