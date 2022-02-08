import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { hexToRGBA2 } from 'utils/helpers'

const status = {
	success: 'green.500',
	warning: 'orange.400',
	info: 'blue.600',
	error: 'red.600',
}

export type TimeLineStatus = 'success' | 'warning' | 'info' | 'error'

const Bullet = (props: { status: TimeLineStatus }) => {
	return (
		<Flex boxSize="5" rounded="full" bg={hexToRGBA2('neutral-200', 0.2)} align="center" justify="center">
			<Box boxSize="10px" rounded="full" borderWidth="3px" bg="white" borderColor={status[props.status]}></Box>
		</Flex>
	)
}

export default Bullet
