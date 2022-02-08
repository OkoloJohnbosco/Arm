import { Box, Flex, Grid, Stack, StackDivider, useDisclosure } from '@chakra-ui/react'
import BackWrapper from 'components/navigation/BackWrapper'
import { Button, ButtonGroup } from 'components/button'
import { StackCard } from 'components/card'
import IfElse from 'components/if-else'
import Navigation from 'components/layout/dashboard'
import ResponsiveContainer from 'components/layout/responsive-container'
import ArrowLink from 'components/link/ArrowLink'
import NewsCard from 'components/news/NewsCard'
import TimeLine from 'components/timeline'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import SubHeading from 'components/typography/SubHeading'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import useUser from 'modules/account/hooks/useUser'
import useInvestedProducts from 'modules/hooks/investment/useApiListInvestmentsDetails'
import AddFundDrawer from 'modules/investment/funding'
import InvestmentCardSkeleton from 'modules/investment/InvestmentCardSkeleton'
import RedemptionDrawer from 'modules/investment/redemption'
import KycDrawer from 'modules/kyc/Drawer'
import React, { useMemo, useState } from 'react'
import useRecommendedProduct from '../../hooks/useRecommendedProduct'
import InvestmentSolutionCard from '../../investment/InvestmentCard'
import InvestmentCard from '../../investment/InvestmentSubsidiaryCard'
import Product from '../../products/product/Product'
import Chart from './components/Chart'
import DuoGoals from './components/DuoGoals'
import LifeGoal from './components/LifeGoals'
import PortfolioStart from './components/PortfolioStart'
import Referal from './components/Referal'
import RiskApitite from './components/RiskProfile'
import Banner1 from './components/Banner1'
import Banner2 from './components/Banner2'
import PortFolioBreakDown from './PortfolioBreakDown'
import useApiGetUserActivities from 'modules/hooks/account/useApiGetUserActivities'
import NotificationDrawer from 'modules/notification'

const Dashboard = () => {
	const investedBusiness = useInvestedProducts()
	const userActivities = useApiGetUserActivities()
	const recommended = useRecommendedProduct()
	const [addFund, setAddFund] = useState(false)
	const [selectedBusinessId, setSelectedBusinessId] = useState<number | undefined>()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const selectedBusiness = useMemo(() => investedBusiness.value?.customer_businesses.find((business) => business.id == selectedBusinessId), [
		selectedBusinessId,
	])

	console.log(selectedBusiness, 'selectedBusiness')

	// console.log(userActivities)
	// console.log(userActivities.value, 'Activity Value')
	// console.log(investedBusiness.value?.customer_businesses, 'investedBusiness.value?.customer_businesses')
	// console.log(selectedBusiness?.products, 'selectedBusiness?.products')
	// const investments = useInvestments()

	const login = useUser()?.login
	const [isRedemption, setIsRedemption] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [isKycOpen, setIsKycOpen] = useState<boolean>(false)
	const setIsKycOpenHandler = (state?: boolean) => {
		if (state) {
			setIsKycOpen(state)
		} else {
			setIsKycOpen((prevState) => !prevState)
		}
	}
	const openKyc = () => setIsKycOpen(true)

	return (
		<Navigation onOpen={onOpen}>
			<KycDrawer enabled={true} enableMode="eager" isKycOpen={isKycOpen} setIsKycOpen={setIsKycOpenHandler}>
				<RedemptionDrawer
					onClose={() => setIsRedemption(false)}
					investmentId={useNextQueryParam('investmentRedemptionId')}
					isOpen={isRedemption}
				/>
				<NotificationDrawer openKyc={openKyc} isOpen={isOpen} onClose={onClose} />

				<AddFundDrawer
					isOpen={addFund}
					onClose={() => {
						setAddFund(false)
					}}
				/>
				<Flex sx={{ gap: '2rem' }} align="center" justify="space-between" wrap="wrap">
					<Stack>
						<SubHeading fontWeight="normal" className="playfair-header">
							Good Afternoon {login?.user_account.user.first_name} {login?.user_account.user.last_name},
						</SubHeading>
						<Body color="neutral.800">How are you feeling today? Here are your current holdings</Body>
					</Stack>
					<ButtonGroup spacing="1" flexWrap="wrap" w={{ base: 'full', md: 'auto' }}>
						<Button w={{ base: 'full', md: 'auto' }} alt size="sm" looks="primaryOutline" onClick={() => setIsRedemption(true)}>
							Reedeem Funds
						</Button>
						<Button w={{ base: 'full', md: 'auto' }} size="sm" alt onClick={() => setAddFund(true)}>
							Top Up Funds
						</Button>
					</ButtonGroup>
				</Flex>
				<Flex sx={{ gap: '2rem' }} direction="row" py={3} overflow="auto" pl="1px">
					<IfElse
						ifOn={selectedBusiness?.products?.length}
						ifOnElse={!!investedBusiness.value?.customer_businesses?.length}
						elseThen={
							<>
								{investedBusiness.value?.customer_businesses.map((productBusiness, i) => {
									return <InvestmentCard key={i} alt business={productBusiness} onClick={() => setSelectedBusinessId(productBusiness.id)} />
								})}
							</>
						}
					>
						<BackWrapper onClick={() => setSelectedBusinessId(undefined)}>
							<>
								{selectedBusiness?.products.map((product, i) => (
									<InvestmentSolutionCard key={i} alt investment={product} business={selectedBusiness} />
								))}
							</>
						</BackWrapper>
					</IfElse>
					{!investedBusiness.value && investedBusiness.isLoading && <InvestmentCardSkeleton />}
				</Flex>

				<ResponsiveContainer flexDirection={{ base: 'column', md: 'row' }} sx={{ gap: '2rem' }} breakPoint="900px">
					<Box flex="6">
						<PortFolioBreakDown />
					</Box>
					<Box flex="5">
						<RiskApitite />
					</Box>
				</ResponsiveContainer>
				{/* <Stack
					bg={{ base: 'none', md: 'white' }}
					rounded="md"
					divider={
						<StackDivider borderColor="gray.600" h="2xs" alignSelf="center" justifySelf="center" display={{ base: 'none', md: 'flex' }} />
					}
					spacing={8}
					align="center"
					justify="space-around"
					h="fit-content"
					direction={{ base: 'column', md: 'row' }}
					pl={{ base: '0', md: '1' }}
					pr={{ base: '0', md: '6' }}
					pt={{ base: '0', md: '8' }}
					pb={{ base: '0', md: '0' }}
				>
					<Box flex="2">
						<Chart />
					</Box>

					<Stack spacing={{ base: 4, md: 4 }} flex="1" w="full">
						<PortfolioStart color="purple" />
						<PortfolioStart color="blue" />
						<PortfolioStart color="cyan" />
					</Stack>
				</Stack> */}
				<Stack spacing={2}>
					<Caption alt>Recommended Investments For You</Caption>

					<Flex sx={{ gap: '2rem' }} overflowX="auto" className="hide-scroll-bar">
						{recommended?.value?.products.map((product) => {
							return (
								<Flex py="3" minWidth="320px" key={product.id}>
									<Product products={product} />
								</Flex>
							)
						})}
					</Flex>
					{/* </ScrollView> */}
				</Stack>

				<StackCard responsive spacing={4} flex="3" divider={<StackDivider />} maxH="md" overflow="auto">
					<Caption alt>Recent Activities</Caption>

					<Stack>
						{/* <TimeLine timeline={activityArr} /> */}
						<IfElse
							ifOn={!!userActivities?.value?.activities?.length}
							ifOnElse={!userActivities?.value?.activities?.length || userActivities?.isError}
							elseThen={
								<>
									<Body py={3}>No recent activity</Body>
								</>
							}
						>
							<>
								<TimeLine timeline={userActivities?.value?.activities} />
								<ArrowLink href="">View all activities</ArrowLink>
							</>
						</IfElse>
					</Stack>
				</StackCard>

				<Stack spacing={6} py={10}>
					<Banner1 />
					<Flex flexWrap="wrap" sx={{ gap: '2rem' }}>
						<Flex justify="stretch" flex="1" minW="10rem">
							<DuoGoals />
						</Flex>
						<Flex justify="stretch" flex="1" minW="10rem">
							<LifeGoal />
						</Flex>
						<Flex justify="stretch" flex="1" minW="10rem">
							<Referal />
						</Flex>
					</Flex>
					<Banner2 />
				</Stack>
				<StackCard responsive spacing={4} flex="2">
					<Caption alt>Recent News</Caption>

					<Grid gap="8" templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
						<NewsCard />
						<NewsCard />
						<NewsCard />
					</Grid>
					<Button w="fit-content" alignSelf="flex-end">
						Read More Daily News
					</Button>
				</StackCard>
			</KycDrawer>
		</Navigation>
	)
}

export default React.memo(Dashboard)
