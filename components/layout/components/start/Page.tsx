import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Header, { StartHeaderProps } from './Header'
import { colors } from 'lib/theme'

const StartPage = ({ children, ...headerProps }: StartHeaderProps) => {
	return (
		<Box h="full">
			{/* <Flex flexDir="column" position={{ md: 'fixed', base: 'relative' }} height="full" width="full" bg={colors['neutral-20']} overflowY="scroll"> */}

			<Header {...headerProps} />

			{children}
			{/* </Flex> */}
		</Box>
	)
}

export default StartPage
