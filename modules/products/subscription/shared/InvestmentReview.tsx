import { Flex, HStack, Stack } from '@chakra-ui/layout'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Divider from 'components/divider'
import IfElse from 'components/if-else'
import LoadingSpinner from 'components/animations/loadingSpinner'
import Money from 'components/money'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import { InvestmentMixContext } from 'modules/account/types'
import React, { useContext } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import useApiInvestmentSubscription from 'modules/hooks/investment/useApiGetInvestmentMix'
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import LoadingWrapper from 'components/layout/loading-wrapper'
import { InvestmentProcessContext } from '../type'
import SubHeading from 'components/typography/SubHeading'

const MixReview = () => {
	const { mixedProducts, setCurrentMixProduct, initiateInvestmentData } = useContext(InvestmentMixContext)
	const { mixId } = useContext(InvestmentProcessContext)
	const { value, isFetching } = useApiInvestmentSubscription({ mixId })

	return (
		<StackCard background={colors.white} flex={4} spacing={8} maxH="lg" overflow="scroll">
			<LoadingWrapper isLoading={!(initiateInvestmentData || value)}>
				<Stack spacing={4}>
					<Stack spacing="4">
						<Caption letterSpacing="2px" alt>
							Your Financial Commitments
						</Caption>

						<Box>
							<Caption color="neutral.400">Invested Amount</Caption>
							{/* TODO should be users home currency */}
							<Money currency="NGN">
								{value?.customer_investment.total_investment_amount || initiateInvestmentData?.totalInvestmentAmount}
							</Money>
						</Box>
					</Stack>
					<Divider />
					<Stack spacing="4">
						<Caption alt letterSpacing="2px">
							Your Choosen Financial Solution
						</Caption>
						<LoadingWrapper isLoading={isFetching || !value?.customer_investment}>
							<IfElse
								ifOn={value?.customer_investment.investment_products?.length || mixedProducts?.length}
								elseThen={<Box>Your Solutions will appear here</Box>}
							>
								<IfElse
									ifOn={value?.customer_investment.investment_products?.length}
									elseThen={
										<Stack divider={<Divider />}>
											{mixedProducts?.map((mixProduct, i) => (
												<Stack key={i}>
													<HStack align="center" justify="space-between">
														<Caption>{mixProduct.product?.name}:</Caption>

														<Button
															border="none"
															size="xs"
															rightIcon={<BiEditAlt />}
															onClick={() => setCurrentMixProduct?.(mixProduct)}
														>
															Edit{' '}
														</Button>
													</HStack>

													<Stack direction="row" spacing={4}>
														<Money letterSpacing={0} currency={mixProduct.product?.currency.currency_code}>
															{mixProduct.amountInvested}
														</Money>
														{/* <Body variant="semibold13" letterSpacing={0}>
											{mixProduct.investedAmount}
										</Body> */}
														<Body letterSpacing={0}>{`${(
															((mixProduct?.amountInvested || 1) / (initiateInvestmentData?.totalInvestmentAmount || 1)) *
															100
														).toFixed(1)}%`}</Body>
													</Stack>
												</Stack>
											))}
										</Stack>
									}
								>
									<Table size="sm">
										<Thead>
											<Tr>
												<Th pl="0" textTransform="none">
													<Caption>Product</Caption>
												</Th>
												<Th textTransform="none">
													<Caption>Amount</Caption>
												</Th>
												{/* <Th pr="0" isNumeric textTransform="none">
													<Caption>Percentage</Caption>
												</Th> */}
											</Tr>
										</Thead>
										{value?.customer_investment?.investment_products.map(({ amount_invested, investment_percentage, product }, i) => (
											<Tbody key={i}>
												<Tr>
													<Td pl="0">
														<Body>{product.name}</Body>
													</Td>
													<Td>
														<Money
															// textAlign="center"

															currency={product.currency.currency_code}
														>
															{amount_invested}
														</Money>
													</Td>
													{/* <Td isNumeric pr='0'>
														<Body variant="semibold12" color="neutral-200">{`${investment_percentage.toFixed(1)}%`}</Body>
													</Td> */}
												</Tr>
											</Tbody>
										))}
									</Table>
								</IfElse>
							</IfElse>
						</LoadingWrapper>
					</Stack>
				</Stack>
			</LoadingWrapper>
		</StackCard>
	)
}

export default MixReview
