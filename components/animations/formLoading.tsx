import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import Body from 'components/typography/Body'

import { colors } from 'lib/theme'
import React from 'react'
import LoadingSpinner from './loadingSpinner'

const FormLoading = ({ description, height }: { description?: string; height?: string }) => {
	return (
		<Flex height={height || '300px'} align="center" justify="center">
			<VStack spacing="10px">
				<LoadingSpinner />
				<Body variant="semibold13">{description || 'Loading ..'}</Body>
			</VStack>
		</Flex>
	)
}

export default FormLoading
