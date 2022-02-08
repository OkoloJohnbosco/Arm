import { Flex, HStack, Stack } from '@chakra-ui/react'
import CircleSkeleton from 'components/skeleton/CircleSkeleton'
import TextSkeleton from 'components/skeleton/Skeleton'
import React from 'react'

const PortFolioBreakDownSkeleton = () => {
	return (
		<Stack spacing="6" justify="center">
			<HStack alignSelf="center">
				<TextSkeleton h="8" w="24" />
				<TextSkeleton h="8" w="24" />
			</HStack>
			<Flex rounded="md" justify="space-between" direction={{ md: 'row', base: 'column' }}>
				<CircleSkeleton boxSize={{ md: '36', base: '20' }} />
				<Stack flexBasis="3xs" spacing="4" justify="center">
					<TextSkeleton h="2" />
					<TextSkeleton h="2" />
					<HStack justify="space-between">
						<CircleSkeleton boxSize="8" />
						<TextSkeleton h="4" w="40" />
					</HStack>
				</Stack>
			</Flex>
		</Stack>
	)
}

export default PortFolioBreakDownSkeleton
