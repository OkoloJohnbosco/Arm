import { BoxProps, Flex } from '@chakra-ui/react'
import Typing from 'components/animations/Typing'
import React from 'react'
import CircleLoader from 'react-spinners/PulseLoader'

const LoadingWrapper = ({ children, loader, isLoading, ...others }: { children?: any; isLoading?: any; loader?: any } & BoxProps) => {
	return isLoading ? (
		loader ? (
			loader
		) : (
			<Flex w="full" align="center" justify="center" h="full" {...others}>
				<CircleLoader color="black" />
			</Flex>
		)
	) : (
		children
	)
}

export default LoadingWrapper
