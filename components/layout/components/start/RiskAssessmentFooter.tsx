import React from 'react'
import { Box, VStack } from '@chakra-ui/react'

import Link from 'next/link'
import { PAGES } from 'constant'
import Small from 'components/typography/Small'

const RiskAssessmentPrompt = () => {
	return (
		<Box width="350px" mt="20px" display={{ base: 'none', md: 'block' }}>
			<VStack spacing="10px" align="flex-start">
				<Small>Your risk profile helps us recommend suitable investment products and strategies. Don’t forget to review your risk profile.</Small>

				<Link href={PAGES.ACCOUNT_RISK_ASSESSMENT}>
					<Small color="green-500" fontWeight="bold" cursor="pointer">
						Try our risk assessment tool {'>'}
					</Small>
				</Link>
			</VStack>
		</Box>
	)
}

export default RiskAssessmentPrompt
