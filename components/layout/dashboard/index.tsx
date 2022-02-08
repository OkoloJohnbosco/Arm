import { Box, Input, Stack, Flex } from '@chakra-ui/react'
import React from 'react'
import Header from './header'
import { NavItemType } from './navigation/type'
import Navigations from './navigation/Navigation'
import { RiHome4Line, RiStockLine, RiStore3Line } from 'react-icons/ri'
import { IoBriefcaseOutline, IoSettingsOutline, IoWalletOutline } from 'react-icons/io5'
import { GiJumpAcross, GiOrganigram } from 'react-icons/gi'
import { GrTransaction } from 'react-icons/gr'
import { AiOutlineGift } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { BiTransfer } from 'react-icons/bi'
import Small from 'components/typography/Small'
import { HiChevronDown } from 'react-icons/hi'
import Body from 'components/typography/Body'
import { getLogin } from 'modules/account/helper'
import $ from 'jquery'
import { useEffect } from 'react'
import { StackCard } from 'components/card'
import { colors } from 'lib/theme'
import { PAGES } from 'constant'
import Caption from 'components/typography/Caption'
import NameAvatar from 'components/name-avatar'
import { hexToRGBA3 } from 'lib/theme/color'

const configs: NavItemType[] = [
	{
		type: 'section',
		label: 'Home',
	},
	{
		type: 'item',
		label: 'Dashboard',
		icon: RiHome4Line,
		url: PAGES.DASHBOARD.HOME,
	},
	{
		type: 'section',
		label: 'INVESTMENTS',
	},
	{
		type: 'item',
		label: 'My Portfolio',
		icon: IoBriefcaseOutline,
		url: PAGES.DASHBOARD.PORTFOLIO,
	},
	{
		type: 'item',
		label: 'Investment Catalogue',
		icon: RiStore3Line,
		url: PAGES.DASHBOARD.PRODUCT_CATALOGUE,
	},
	{
		type: 'item',
		label: 'Risk Profiling',
		icon: GiJumpAcross,
		url: PAGES.DASHBOARD.RISK_ASSESSMENT,
	},
	{
		type: 'item',
		label: 'Manage Subsidiaries',
		icon: GiOrganigram,
		url: PAGES.DASHBOARD.MANAGE_SUBSIDIARY,
	},
	{
		type: 'section',
		label: 'Transactions',
		icon: RiHome4Line,
	},
	{
		type: 'item',
		// label: 'Wallet & Redemption',
		label: 'Redemption',
		icon: IoWalletOutline,
	},
	{
		type: 'item',
		label: 'Activities',
		icon: BiTransfer,
	},
	// {
	// 	type: 'item',
	// 	label: 'Transactions',
	// 	icon: BiTransfer,
	// },
	// {
	// 	type: 'item',
	// 	label: 'Stock Trading',
	// 	icon: RiStockLine,
	// },
	// {
	// 	type: 'item',
	// 	label: 'Referals',
	// 	icon: AiOutlineGift,
	// },
	{
		type: 'section',
		label: 'Settings',
	},
	{
		type: 'group',
		label: 'Settings',
		icon: IoSettingsOutline,
		items: [{ type: 'item', label: 'Profile', icon: IoSettingsOutline, url: PAGES.DASHBOARD.SETTINGS }],
	},
]

interface DashboardPropType {
	config?: NavItemType[]
	children?: any
	responsive?: boolean
	onOpen?: () => void
}

const Navigation = ({ children, responsive = false, onOpen }: DashboardPropType) => {
	const { user, engage_id } = getLogin()?.login.user_account || {}
	const openDrawerHandler = () => onOpen && onOpen()

	return (
		<>
			<Stack direction="row" position="relative">
				<Box w="full" position="relative">
					<Input type="checkbox" id="nav-toggle" display="none" />
					<Box
						zIndex="sticky"
						as="aside"
						className="nav"
						// bg="linear-gradient(294.17deg, rgb(47, 25, 55) 35.57%, rgb(69, 38, 80) 92.42%, rgb(69, 38, 80) 92.42%)"
						bg="#000000"
						color="rgba(255, 255, 255, 0.9)"
						w="3xs"
						position="fixed"
						top={0}
						bottom={0}
						pl="6"
						pr="4"
						style={{ overflowX: 'hidden' }}
						//display={{ base: 'none', md: 'block' }}
					>
						<Stack justify="space-between" color="neutral.0" py={5} direction="row" alignItems="center">
							{/* <Avatar size="sm" /> */}
							{/* <NameAvatar name={`${user?.first_name} ${user?.last_name}`} /> */}
							<Box>
								<Caption className="navigation-user-name">
									{user?.first_name} {user?.last_name}
								</Caption>
								<Small className="navigation-user-name" variant="regular11">
									{engage_id}
								</Small>
							</Box>
							<Box display="inline-flex">
								<HiChevronDown className="navigation-user-name" />
							</Box>
						</Stack>
						{/* @ts-ignore */}
						<Navigations config={configs} />
					</Box>
					<Box className="main-pusher" position="relative">
						<Box position="sticky" top="0" left="0" zIndex="sticky">
							<Header onOpen={openDrawerHandler} />
						</Box>

						<StackCard
							spacing={6}
							w="full"
							py="4"
							shadow="lg"
							rounded={0}
							minH="92vh"
							responsive={responsive}
							bg={colors['neutral-20']}
							pt={10}
						>
							{children}
						</StackCard>
					</Box>
				</Box>
				{/* <Box position="fixed" zIndex="0" bottom="0" left="0" right="0">
					<Flex justify="center">
						<Small>Copyright &copy; 2021 ARM Engage. All rights reserved</Small>
					</Flex>
				</Box> */}
			</Stack>
		</>
	)
}

export default Navigation
