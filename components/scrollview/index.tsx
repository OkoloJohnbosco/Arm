import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

type Props = {
	onForward?: () => void
	onBackwards?: () => void
	children?: any
}
const ScrollView = ({ onBackwards, onForward, children }: Props) => {
	return (
		<Box position="relative">
			{onBackwards && (
				<Flex
					border="neutral.900"
					borderWidth="1px"
					align="center"
					justify="center"
					boxSize="10"
					rounded="full"
					shadow="B30"
					role="button"
					tabIndex={1}
					zIndex="popover"
					color="neutral.900"
					position="absolute"
					onClick={onBackwards}
					left="0"
					top="50%"
					transform="translateY(-50%)"
				>
					<GoChevronLeft fontWeight="bold" />
				</Flex>
			)}
			{children}
			{onForward && (
				<Flex
					border="neutral.900"
					borderWidth="1px"
					align="center"
					justify="center"
					boxSize="10"
					rounded="full"
					shadow="float"
					role="button"
					tabIndex={-1}
					zIndex="popover"
					color="neutral.900"
					position="absolute"
					onClick={onForward}
					right="0"
					top="50%"
					transform="translateY(-50%)"
				>
					<GoChevronRight fontWeight="bold" />
				</Flex>
			)}
		</Box>
	)
}

export default ScrollView
