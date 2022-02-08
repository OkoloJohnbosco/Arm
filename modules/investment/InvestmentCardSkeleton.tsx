import { Flex, HStack, Stack } from '@chakra-ui/react'
import CircleSkeleton from 'components/skeleton/CircleSkeleton'
import TextSkeleton from 'components/skeleton/TextSkeleton'
import React from 'react'

const InvestmentCardSkeleton = () => {
	return (
		<Flex rounded="md" justify="space-around" direction="column" w={{ md: '19rem', base: '280px' }} padding="6" boxShadow="lg" h="40" bg="white">
			<HStack spacing="6">
				<CircleSkeleton boxSize="8" rounded="full" />

				<TextSkeleton noOfLines={2} />
			</HStack>
			<TextSkeleton />
			<TextSkeleton h="1" />
		</Flex>
	)
}

export default InvestmentCardSkeleton
