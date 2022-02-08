import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Header, { StartHeaderProps } from './Header'
import { colors } from 'lib/theme'
import GrandParents from 'public/img/illustration/grand-parent.svg'
import WaterInvestment from 'public/img/illustration/water-investment.svg'

const StartPage = ({ children, ...headerProps }: StartHeaderProps) => {
	return (
		<Box>
			<Flex
				className="page-container"
				minH="100vh"
				flexDir="column"
				position={{ base: 'relative' }}
				height="full"
				width="full"
				bg={colors['neutral-20']}
			>
				<Header {...headerProps} />
				<Box mt={{ base: headerProps.hasShadow ? 16 : 4, md: headerProps.hasShadow ? 24 : 12, xs: headerProps.hasShadow ? 24 : 1 }}>
					{children}
				</Box>
				<Box display={{ base: 'none', lg: 'block' }} zIndex={-1}>
					<Box as={GrandParents} position="fixed" w="md" right={0} bottom={0} />
					<Box as={WaterInvestment} position="fixed" w="md" left={0} bottom={0} />
				</Box>
			</Flex>
		</Box>
	)
}

export default StartPage
