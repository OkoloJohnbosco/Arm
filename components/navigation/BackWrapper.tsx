import { Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import Back, { BackProps } from '.'

const BackWrapper = (props: BackProps) => {
	return (
		<Flex flexDirection="column" h="full">
			<Stack
			// ml={{ base: props.ml, md: 0 }}
			>
				<Back {...props} mb={4} />
			</Stack>
			{props.children}
		</Flex>
	)
}

export default BackWrapper
