import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { StackCard, Card } from 'components/card'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'
import { colors } from 'lib/theme'
import React from 'react'
import Money from 'components/money'
import { Button } from 'components/button'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import useInvestmentMix from 'modules/hooks/investment/useApiGetInvestmentMix'
import Body from 'components/typography/Body'
import LoadingWrapper from 'components/layout/loading-wrapper'

const Summary = () => {
	const mixId = useNextQueryParam('mixId')
	const { value, isFetching } = useInvestmentMix({ mixId })

	return (
		<StackCard shadow="md" flex={4}>
			<Box h="24" bg="claret.500" borderTopRadius="3xl" />

			<StackCard zIndex="popover" alignSelf="center" w="90%" rounded="xl" shadow="md" position="relative" transform="translateY(-40%)">
				<Small color="grey.500" variant="semibold12">
					Total Amount
				</Small>
				<Money currency="NGN" variant="semibold16">
					{value?.customer_investment.total_investment_amount}
				</Money>
				<Button isLoading={isFetching} looks="primary" loadingText="Checking Status" w="fit-content" size="xs">
					Investment Status
				</Button>
			</StackCard>
			<LoadingWrapper isLoading={!value?.customer_investment}>
				<Table size="sm" variant="unstyled" position="relative" bottom="3rem">
					<Thead>
						<Tr>
							<Th textTransform="none">
								<Caption>Product</Caption>
							</Th>
							<Th textTransform="none">
								<Caption>Amount</Caption>
							</Th>
							{/* <Th isNumeric textTransform="none">
								<Caption>Percentage</Caption>
							</Th> */}
						</Tr>
					</Thead>
					{value?.customer_investment?.investment_products.map(({ amount_invested, investment_percentage, product }) => (
						<Tbody key={product.name}>
							<Tr>
								<Td>
									<Body variant="semibold12" color="neutral-200">
										{product.name}
									</Body>
								</Td>
								<Td isNumeric>
									<Money
										textAlign="center"
										color="neutral-200"
										variant="semibold12"
										letterSpacing={0}
										currency={product.currency.currency_code}
									>
										{amount_invested}
									</Money>
								</Td>
								{/* <Td isNumeric>
									<Body variant="semibold12" color="neutral-200">{`${investment_percentage.toFixed(1)}%`}</Body>
								</Td> */}
							</Tr>
						</Tbody>
					))}
				</Table>
			</LoadingWrapper>
		</StackCard>
	)
}

export default Summary
