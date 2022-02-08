import React, { useState } from 'react'
import { IconButton, Box, Stack, Avatar, HStack, BoxProps } from '@chakra-ui/react'
import Small from 'components/typography/Small'
import Body from 'components/typography/Body'
import Capitalize from 'components/typography/Capitalize'
import { ActivityType } from 'modules/hooks/account/useApiGetUserActivities'
import { toTimeString, toDateString } from 'utils/helpers'
import Icon from 'components/icon'
import { IoMdCloseCircle } from 'react-icons/io'

function NotificationCard({
	w = 'full',
	firstName = 'Johnbosco',
	lastName = 'Okolo',
	onCleanUp,
	activity,
	...others
}: BoxProps & { lastName?: string; firstName?: string; activity: ActivityType; onCleanUp: () => void }) {
	const [isArchived, setIsArchived] = useState(false)
	const closeNotificationHandler = () => {
		setIsArchived(true)
		onCleanUp()
	}
	if (activity?.is_archived || isArchived) return null

	return (
		<Box
			bg="#ffffff"
			position="relative"
			shadow="lg"
			transition="all 0.3s ease-in"
			className="notification-card"
			w={w}
			display={isArchived ? 'none' : 'block'}
			rounded={8}
			border="1px solid rgba(0,0,0,.1)"
			cursor="pointer"
			{...others}
		>
			<Box opacity={{ base: 1, sm: '0' }} pointerEvents={{ base: 'all', sm: 'none' }} position="absolute" top={-4} left={-2}>
				<IconButton
					aria-label="close button"
					size="sm"
					onClick={closeNotificationHandler}
					rounded="full"
					background="neutral.0"
					shadow="sm"
					zIndex={2}
					color="neutral.500"
				>
					<Icon iconComp={IoMdCloseCircle} />
				</IconButton>
			</Box>

			<Stack p={3}>
				<Stack direction={{ base: 'column', md: 'row' }} minH="70px" alignItems="flex-start" justify="space-between">
					<HStack maxW={{ base: 'full', md: '80%' }} alignItems="flex-start">
						<Avatar size="xs" src="/img/icons/notification.svg" />
						<Stack>
							<Body variant="regular12" color="neutral.200">
								<Capitalize>{firstName}</Capitalize> <Capitalize>{lastName}</Capitalize>, {activity.category.message}
							</Body>
						</Stack>
					</HStack>
					<Stack spacing={2} direction={{ md: 'column', base: 'row' }} textAlign={{ base: 'left', md: 'center' }}>
						<Small variant="regular12" color="neutral.200">
							{toTimeString(activity.date_created)}
						</Small>
						<Small variant="regular12" color="neutral.200">
							{toDateString(activity.date_created)}
						</Small>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	)
}

export default NotificationCard
