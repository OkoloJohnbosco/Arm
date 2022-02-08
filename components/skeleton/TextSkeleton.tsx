import { Box, BoxProps, Stack } from '@chakra-ui/react'
import React from 'react'
import Skeleton from './Skeleton'

type TextSkeletonProps = {
	spacing?: number
	direction?: 'row' | 'column'
	noOfLines?: number
	sameLength?: boolean
}
const TextSkeleton = (arg: BoxProps & TextSkeletonProps) => {
	const { noOfLines, spacing = 2, direction = 'column', sameLength, ...props } = arg
	if (noOfLines) {
		return (
			<Stack spacing={spacing} direction={direction} w="full">
				{new Array(noOfLines).fill(2).map((v, i) => {
					if (i % 2 == 0) {
						return <Skeleton boxShadow="sm" h="2" data-duration="1s" className="skeleton" w="full" {...props} />
					}
					return <Skeleton key={`${i}`} boxShadow="sm" h="2" data-duration="1s" className="skeleton" w="50%" {...props} />
				})}
			</Stack>
		)
	}
	return <Skeleton boxShadow="sm" h="2" data-duration="1s" className="skeleton" {...props} />
}

export default TextSkeleton
