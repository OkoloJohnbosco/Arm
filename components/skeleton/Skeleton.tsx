import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

const TextSkeleton = (props: BoxProps) => {
	return <Box h="2" className="skeleton" {...props} />
}

export default TextSkeleton
