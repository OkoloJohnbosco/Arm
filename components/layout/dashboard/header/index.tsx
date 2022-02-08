import { Flex, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { Card } from 'components/card'
import Divider from 'components/divider'
import Icon from 'components/icon'
import Small from 'components/typography/Small'
import { SESSION_STORAGE_THEME_NAME } from 'constant'
import { setBroadcastStorage } from 'lib/broadcastStorage'
import useMainState from 'lib/hooks/useMainState'
import { colors } from 'lib/theme'
import ArmLogo from 'modules/svg/ArmLogo.svg'
import React from 'react'
import { CgMenuLeft } from 'react-icons/cg'
import { IoSearchOutline, IoSunnyOutline } from 'react-icons/io5'
import Notification from '../../components/NotificationBadge'

const Header = ({ onOpen }: { onOpen: () => void }) => {
	const mode = useMainState().themeModeName
	return (
		<Card w="full" py="4" shadow="B20" rounded={0} alignItems="center" background="white">
			<Flex justify="space-between">
				<Wrap spacing={8}>
					<WrapItem cursor="pointer" as="label" fontSize="3xl" htmlFor="nav-toggle" color="gray.900">
						<CgMenuLeft />
					</WrapItem>
					<WrapItem>
						<ArmLogo />
						{/* <Image src="/img/arm-logo.png" height={8} objectFit="cover" alt="arm logo" /> */}
					</WrapItem>
				</Wrap>
				<Stack direction="row" alignItems="center" spacing={4}>
					<Icon iconComp={IoSearchOutline} boxSize={5} color={colors['grey-400']} />
					<Divider orientation="vertical" />
					<Small display={{ base: 'none', md: 'inline-flex' }} color="neutral.500">
						Investment Advisor
					</Small>
					<div onClick={() => onOpen()}>
						<Notification />
					</div>
					{/* <Icon
						role="button"
						onClick={() => {
							setBroadcastStorage(SESSION_STORAGE_THEME_NAME, mode == 'light' ? 'dark' : 'light')
						}}
						iconComp={IoSunnyOutline}
						aria-label="switch theme"
						color="claret.500"
					/> */}
				</Stack>
			</Flex>
		</Card>
	)
}

export default Header
