import React, { useState, useEffect } from 'react'
import { Flex, Avatar, Box, Stack, HStack, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import Body from 'components/typography/Body'
import Capitalize from 'components/typography/Capitalize'
import NotificationCard from './components/NotificationCard'
import KycChecker from './components/KycChecker'
import Stock from './components/stock'
import HelpCenter, { helpProps } from './components/HelpCenter'
import useGetStocks from 'modules/hooks/notification/useGetStocks'
import useApiGetKyc from 'modules/hooks/kyc/useApiGetKyc'
import { KycStageStatus } from 'modules/kyc/type'
import useUser from 'modules/account/hooks/useUser'
import Product from '../products/product/Product'
import useRecommendedProduct from '../hooks/useRecommendedProduct'
import useApiGetUserActivities, { ActivityType } from 'modules/hooks/account/useApiGetUserActivities'
// import { activityArr } from 'components/timeline'
// import { hexToRGBA3 } from 'lib/theme/color'

interface Props {
	onClose: () => void
	isOpen?: boolean
	openKyc: () => void
}

const NotificationDrawer = ({ onClose, openKyc, isOpen = true }: Props) => {
	const login = useUser()?.login
	const recommended = useRecommendedProduct()
	const getKyc = useApiGetKyc({})
	const kyc = getKyc.value

	// const kyc = data
	const userActivities = useApiGetUserActivities()

	const [notificationList, setNotificationList] = useState<ActivityType[]>([])
	const handleClose = () => {
		onClose && onClose()
	}
	const [stocksData] = useGetStocks()

	const completeKycHander = () => {
		onClose()
		openKyc()
	}

	const onCleanUpHandler = (id) => {
		const newArr = notificationList.filter((item) => item.id !== id)
		setNotificationList(newArr)
	}

	const isKycCompleted = kyc?.kyc_tier && kyc?.kyc_tier.status === KycStageStatus.Completed // kyc?.stages.some((stage) => stage.status === KycStageStatus.Pending)

	useEffect(() => {
		if (userActivities.value && userActivities.value.activities.length !== 0) {
			setNotificationList(userActivities.value.activities)
		}
	}, [userActivities.value])

	return (
		<Drawer closeOnOverlayClick={false} size="sm" isOpen={isOpen} placement="right" onClose={handleClose}>
			<DrawerOverlay background={'rgba(0, 0, 0, 0.3)'} />
			<DrawerContent bg="#F6F4F3">
				<DrawerCloseButton background="claret.500" boxSize="6" rounded="full" color="neutral.0" />

				<DrawerBody mt="12" px="7" className="drawer_boy">
					<Stack w="100%" mx="auto" spacing={8} pb={6}>
						{/* Robo Advisor */}
						<HStack>
							<Stack>
								<Box p={1} mr={1} border="2px solid rgba(0,0,0,.1)" rounded="full">
									<Avatar shadow="lg" src="/img/icons/robot.svg" />
								</Box>
							</Stack>
							<Stack spacing={1}>
								<SubHeading fontSize="16px">Investment Advisor</SubHeading>
								<Body variant="regular13" color="neutral.80">
									{login?.user_account.email}
								</Body>
							</Stack>
						</HStack>

						{/* Welcome message */}
						<Stack spacing={1}>
							<SubHeading fontSize="17px">
								Welcome <Capitalize>{login?.user_account.user.last_name}</Capitalize> to Investment Advisor
							</SubHeading>
							<Body variant="regular13">How may we assit you today?</Body>
						</Stack>

						{/* Recent Activities */}
						<Stack
							spacing={3}
							minH={notificationList?.length > 0 ? `${130 + 12 * (notificationList?.length > 5 ? 5 : notificationList?.length)}px` : 0}
						>
							<SubHeading fontSize="15px" letterSpacing={0.5} mb={2}>
								RECENT ACTIVITIES
							</SubHeading>
							<Stack>
								<Box position="relative" w="full">
									{notificationList.length !== 0 &&
										notificationList
											.reverse()
											.map((item, i) => (
												<NotificationCard
													key={item.id}
													firstName={login?.user_account.user.first_name}
													lastName={login?.user_account.user.last_name}
													left="50%"
													transform="translateX(-50%)"
													position="absolute"
													zIndex={30 - i}
													onCleanUp={() => onCleanUpHandler(item.id)}
													activity={item}
													display={i > 4 ? 'none' : 'block'}
													w={100 - 7 * i + '%'}
													top={3 * i}
													_hover={{ shadow: 'xl', left: '50%', transform: 'scaleY(1.03) translateX(-50%)' }}
												/>
											))}
									{notificationList.length === 0 && (
										<Box textAlign="center" py={5} mb={2} bg="#fff" shadow="sm">
											<Body>No recent activity</Body>
										</Box>
									)}
								</Box>
							</Stack>
						</Stack>

						{/* Account Completion */}
						{kyc && !isKycCompleted && (
							<KycChecker
								onClick={completeKycHander}
								kycStages={kyc.kyc_tier?.account_holders_stages[0]?.stages}
								priority={kyc.kyc_tier?.priority}
							/>
						)}
						{/* Boss */}
						<Stack
							spacing={3}
							minH={
								recommended?.value?.products && recommended?.value?.products?.length > 0
									? `${280 + 15 * recommended?.value?.products?.length}px`
									: 9
							}
						>
							<SubHeading fontSize="15px" textTransform="uppercase" letterSpacing={0.5}>
								recommendation
							</SubHeading>
							<Stack>
								<Stack direction="row" w="full" overflowX="auto" pr={2} spacing={4} className="recommended-products">
									{recommended?.value?.products.map((product) => {
										return (
											<Flex key={product.id} w={100 + '%'} py="3">
												<Product products={product} transition="ease 0.2s 0.2s" minWidth="300px" />
											</Flex>
										)
									})}
								</Stack>
							</Stack>
						</Stack>

						{/* Stock Alert */}
						{stocksData && (
							<Stack spacing={3}>
								<SubHeading textTransform="uppercase" fontSize="14px" letterSpacing={0.5}>
									Stock alert
								</SubHeading>

								<Stack
									spacing={4}
									border="1px solid rgba(0,0,0,.1)"
									py="3"
									px="5"
									shadow="md"
									bg="#fff"
									w="full"
									rounded={6}
									overflowX="hidden"
								>
									{/* <Stock /> */}
									{stocksData.map((stock) => (
										<Stock key={stock.name} name={stock.name} openPrice={stock.o} price={stock.c} />
									))}
									<Stock key={'Apple'} name={'Apple'} openPrice={800} price={850.75} />
								</Stack>
							</Stack>
						)}
						{/* Help Center */}
						<Stack direction="row" py={2} overflowX="auto" spacing={0} className="recommended-products">
							{helpProps.map((item, i) => (
								<HelpCenter {...item} key={i} />
							))}
						</Stack>
					</Stack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default React.memo(NotificationDrawer)
