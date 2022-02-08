import { CloseButton } from '@chakra-ui/react'
import { Card } from 'components/card'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import useMainAction from 'lib/hooks/useMainAction'
import { RoboNoticeType } from 'lib/types'
import React from 'react'

const NoticeItem = (notice: RoboNoticeType) => {
	const { pushRoboNotice } = useMainAction()

	return (
		<Card
			fontSize="2em"
			// _hover={{
			// 	w:'2em'
			// }}
			shadow="B20"
			bg={notice.status === 'new' ? 'neutral.50' : 'neutral.0'}
			position="relative"
			onMouseOver={() => pushRoboNotice({ ...notice, action: 'hover' })}
			cursor="pointer"
			w="xs"
			p="4"
			onClick={() => pushRoboNotice({ ...notice, action: 'click' })}
		>
			<CloseButton
				boxSize="1"
				onClick={() => pushRoboNotice({ ...notice, action: 'delete' })}
				position="absolute"
				right="6"
				color="neutral.400"
				top="4"
				fontWeight="extrabold"
			/>
			<Small variant="semibold12" mb="1">
				Hello Card{' '}
			</Small>
			<Body variant="regular13"> {notice.message}</Body>
		</Card>
	)
}

export default NoticeItem
