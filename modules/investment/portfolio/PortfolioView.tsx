import { Stack, Box, Flex, VStack, HStack } from '@chakra-ui/react'
import BackWrapper from 'components/navigation/BackWrapper'
import { Card, StackCard } from 'components/card'
import Divider from 'components/divider'
import ResponsiveContainer from 'components/layout/responsive-container'
import Money from 'components/money'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import React, { useState } from 'react'
import { AiOutlineBank } from 'react-icons/ai'
import { BsArrowRightShort, BsPlus } from 'react-icons/bs'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Redemption from '../redemption'
import { Button as Button2, ButtonGroup } from 'components/button'
import AddFundDrawer from '../funding'
import { useRouter } from 'next/router'
import useApiListInvestmentTransaction from 'modules/hooks/investment/useApiListInvestmentTransaction'
import useApiListInvestmentTransactions from 'modules/hooks/investment/useApiListInvestmentTransactions'
import { dateToString } from 'utils/helpers'
import LoadingWrapper from 'components/layout/loading-wrapper'
import useApiGetInvestment from 'modules/hooks/investment/useApiGetInvestment'
import SubHeading from 'components/typography/SubHeading'
import useApiGetInvestmentStatement from 'modules/hooks/investment/useApiGetInvestmentStatement'
import { TransactionType } from 'modules/products/subscription/type'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import { hexToRGBA3 } from 'lib/theme/color'
import useUser from 'modules/account/hooks/useUser'
import InvestmentPrintStatementDrawer from './statement/DrawerWrapper'
import PrintStatement from './statement'
import Icon from 'components/icon'
import { IoIosArrowRoundForward } from 'react-icons/io'

const data = [
	{
		type: 'Subsciption',
		date: '15555',
		amount: '999',
		unit: 'ddd',
		balance: 'ddd',
	},
	{
		type: 'Subsciption',
		date: '15555',
		amount: '999',
		unit: 'ddd',
		balance: 'ddd',
	},
	{
		type: 'Subsciption',
		date: '15555',
		amount: '999',
		unit: 'ddd',
		balance: 'ddd',
	},
	{
		type: 'Subsciption',
		date: '15555',
		amount: '999',
		unit: 'ddd',
		balance: 'ddd',
	},
]

const Portfolio = () => {
	const [isAddFund, setIsAddFund] = useState(false)
	const [openRedemption, setOpenRedemption] = useState<boolean>()
	const investmentId = useRouter().query.investmentId as string
	const [openPrintDrawer, setOpenPrintDrawer] = useState(false)

	const transactionHistory = useApiListInvestmentTransactions({ investmentId })
	const investment = useApiGetInvestment(investmentId)

	return (
		<BackWrapper href={PAGES.DASHBOARD.PORTFOLIO} label="View Portfolio">
			<Redemption
				investmentId={investmentId as string}
				isOpen={openRedemption}
				enableInvestment={false}
				onClose={() => setOpenRedemption(false)}
			/>
			<InvestmentPrintStatementDrawer enabled={openPrintDrawer} onClose={() => setOpenPrintDrawer(false)}>
				<PrintStatement investment={investment.value} />
			</InvestmentPrintStatementDrawer>
			<AddFundDrawer investmentId={investmentId as string} enableInvestment={false} isOpen={isAddFund} onClose={() => setIsAddFund(false)} />

			<Stack spacing="10">
				<Flex justify="space-between" wrap="wrap">
					<SubHeading>{investment.value?.summary.product_name}</SubHeading>

					<ButtonGroup spacing="1" flexWrap="wrap" alignSelf="right">
						<Button2
							w={{ base: 'full', md: 'auto' }}
							alt
							//size="md"
							looks="primaryOutline"
							onClick={() => setIsAddFund(true)}
							leftIcon={<BsPlus size="24px" />}
						>
							Add Fund
						</Button2>
						<Button2
							w={{ base: 'full', md: 'auto' }}
							//size="md"
							alt
							onClick={() => setOpenRedemption(true)}
							leftIcon={<AiOutlineBank />}
						>
							Redemption
						</Button2>
					</ButtonGroup>
				</Flex>

				<ResponsiveContainer
					breakPoint="300px"
					sx={{ gap: '1rem' }}
					color="neutral.0"
					//align="center"
					justify="space-between"
				>
					<Flex
						shadow="float"
						rounded="md"
						//background="claret.500"
						background={`linear-gradient(to right , ${hexToRGBA3('claret', 500, 1)},${hexToRGBA3('black', 500, 0.8)})`}
						px={{ md: '20', base: '8' }}
						py="8"
						position="relative"
						justify="space-between"
						//align="center"
						wrap="wrap"
					>
						<VStack>
							<Small>Total Units</Small>
							<Money variant="semibold18" currency={investment.value?.currency.currency_code}>
								{investment.value?.summary.units}
							</Money>
						</VStack>

						<VStack>
							<Small>Interest Rate</Small>
							<Caption variant="semibold18">28%</Caption>
						</VStack>

						<VStack>
							<Small>Returns</Small>
							<Money variant="semibold18" currency={investment.value?.currency.currency_code}>
								{investment.value?.summary.accrued_interest}
							</Money>
						</VStack>
					</Flex>
				</ResponsiveContainer>

				<Box mt="10">
					<ResponsiveContainer sx={{ gap: '2rem' }} breakPoint="650px">
						<Card px="0" flex="7">
							<Body px="6" pb="4">
								<Caption alt>Your Transactions</Caption>
								<Small>Showing your transaction for last 14 days</Small>
							</Body>
							{/* <LoadingWrapper isLoading={!transactionHistory.value?.transaction_history.length && transactionHistory.isFetching}> */}
							<Box maxH="md" overflowY="scroll">
								<Table
									p="0"
									//	mt="8"
									size="md"
									//variant='striped'
									bottom="3rem"
								>
									<Thead bg="neutral.50" position="sticky" top="0" willChange="auto" zIndex="sticky">
										<Tr>
											<Th textTransform="none">
												<Caption>Type</Caption>
											</Th>
											<Th textTransform="none">
												<Caption>Date</Caption>
											</Th>
											<Th textTransform="none">
												<Caption>Amount</Caption>
											</Th>
											{/* <Th textTransform="none">
												<Caption>Unit</Caption>
											</Th> */}
											<Th textTransform="none">
												<Caption>Unit Price</Caption>
											</Th>
											<Th textTransform="none">
												<Caption>Market Value</Caption>
											</Th>
										</Tr>
									</Thead>

									<Tbody bg="none" maxH="3xl" overflow="auto">
										{transactionHistory.value?.transaction_history.map((transaction, i) => (
											<Tr key={i}>
												<Td>
													<HStack>
														<Icon
															color={transaction.transaction_type === TransactionType.Redemption ? '	#FF5630' : '#36B37E'}
															iconComp={BsArrowRightShort}
															boxSize="6"
															fontWeight="2px"
															transform={
																transaction.transaction_type === TransactionType.Redemption ? 'rotate(135deg)' : 'rotate(-35deg)'
															}
															bg={
																transaction.transaction_type === TransactionType.Redemption
																	? 'rgba(255, 86, 48, 0.15035)'
																	: 'rgba(54, 179, 126, 0.152043)'
															}
															rounded="full"
														/>
														<Body variant="regular13">{transaction.transaction_type}</Body>
													</HStack>
												</Td>
												<Td>
													<Body color="neutral-200" variant="regular13">
														{dateToString(transaction.transaction_date)}
													</Body>
												</Td>
												<Td>
													<Money color="neutral-200" variant="regular13" currency={investment.value?.currency.currency_code}>
														{transaction.amount}
													</Money>
												</Td>

												{/* <Td>
													<Body color="neutral-200" variant="regular13">
														{transaction.units}
													</Body>
												</Td> */}
												<Td>
													<Body color="neutral-200" variant="regular13">
														{transaction.unit_price}
													</Body>
												</Td>
												<Td>
													<Body color="neutral-200" variant="regular13">
														{transaction.market_value}
													</Body>
												</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</Box>
							{/* </LoadingWrapper> */}
						</Card>
						<Stack flex="3" h="fit-content" spacing="8">
							<StackCard divider={<Divider />} spacing="4">
								<Caption alt>Direct Debit</Caption>
								<Stack spacing="8">
									<SubHeading color="claret.500">{investment.value?.summary.account_status}</SubHeading>
									<Small>Change Status</Small>
								</Stack>
							</StackCard>
							<StackCard divider={<Divider />} spacing="6">
								<Box>
									<Caption alt>Total Accured Interest</Caption>
									<Money currency={investment.value?.currency.currency_code}>{investment.value?.summary.accrued_interest}</Money>
								</Box>

								<Box>
									<Caption alt>Total Units</Caption>
									<Money currency={investment.value?.currency.currency_code}>{investment.value?.summary.units}</Money>
								</Box>
							</StackCard>

							<Button2
								disabled={!investment.value}
								w="full"
								mt="8"
								onClick={() => {
									setOpenPrintDrawer(true)
								}}
							>
								Generate Statement
							</Button2>
						</Stack>
					</ResponsiveContainer>
				</Box>
			</Stack>
		</BackWrapper>
	)
}
export default Portfolio
