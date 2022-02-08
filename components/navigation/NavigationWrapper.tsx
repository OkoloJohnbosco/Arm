import { Flex } from '@chakra-ui/react'
import React from 'react'
import Back, { BackProps } from '.'

type NavigationPropType = {
	forward: Omit<BackProps, 'children'>
	backward: Omit<BackProps, 'children'>
	children?: any
	hide?: boolean
}
const NavigationWrapper = ({ forward, backward, hide = false, children, ...props }: NavigationPropType) => {
	return (backward || forward) && !hide ? (
		<Flex flexDirection="column" h="full">
			<Flex justify="space-between">
				<Back {...backward} mb={4} direction="backward" />
				<Back {...forward} mb={4} direction="forward" />
			</Flex>
			{children}
		</Flex>
	) : (
		children
	)
}

export default NavigationWrapper
