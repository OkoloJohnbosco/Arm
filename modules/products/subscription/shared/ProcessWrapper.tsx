import { Box, Stack } from '@chakra-ui/react'
import React from 'react'
import MixReview from './InvestmentReview'
import { InvestmentProcessContext } from '../type'

const ProcessWrapper = ({ children, ReviewComponent }: { children: any; ReviewComponent?: React.FC }) => {
	return (
		<Stack justify="space-between" direction={{ md: 'row', base: 'column' }} spacing={{ base: 8, md: 10 }}>
			<Box flex={6}>{children}</Box>
			{ReviewComponent ? <ReviewComponent /> : <MixReview />}
		</Stack>
	)
}

export default ProcessWrapper
