import { Avatar, Box, Flex } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import React, { useMemo } from 'react'
import { BsBell, BsBellFill } from 'react-icons/bs'
import Icon from 'components/icon'
import Small from 'components/typography/Small'
import RoboMan from 'components/robo'
import useMainAction from 'lib/hooks/useMainAction'
import useMainState from 'lib/hooks/useMainState'
import PromptMix from 'modules/products/subscription/subscribe/Prompt'
import Notices from 'components/robo/notice'

type NotificationProps = {
	notice?: string
}

const NotificationBadge = (props: NotificationProps) => {
	const mainAction = useMainAction()
	const { roboNotice } = useMainState()
	return (
		<Box position="relative">
			<Flex
				zIndex="banner"
				top="-5px"
				right="-4px"
				position="absolute"
				width={4}
				height={4}
				align="center"
				justify="center"
				backgroundColor="white"
				borderRadius={360}
			>
				<Small
					backgroundColor="red"
					variant="semibold12"
					textAlign="center"
					boxSize={4}
					fontSize={9}
					color="white"
					rounded={360}
					letterSpacing={0}
				>
					{roboNotice.length}
				</Small>
			</Flex>
			<RoboMan actionComp={PromptMix} notice={useMemo(() => roboNotice.find((notice) => notice.status === 'new')?.message, [roboNotice.length])}>
				{/* <PromptMix /> */}
				<Notices roboNotices={roboNotice} />
				{/* <Avatar size="sm" src="/img/icons/robot.svg" /> */}
			</RoboMan>
		</Box>
	)
}

export default NotificationBadge
