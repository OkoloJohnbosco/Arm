import { Flex, Stack } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import Body from 'components/typography/Body'
import React from 'react'
import { hexToRGBA2 } from 'utils/helpers'
import Caption from 'components/typography/Caption'

type Props = {
	color: 'purple' | 'blue' | 'cyan'
}

const PortfolioStart = ({ color }: Props) => {
	return (
		<Flex>
			<Stack px={6} py={3} flex="8" bg={`${color}.100`}>
				<Caption>Total Effective Yield</Caption>
				<Stack direction="row">
					<Small>2%</Small>
					<Small>Up by +14%</Small>
				</Stack>
			</Stack>
			<Box w="8" flex="2" bg={`${color}.400`} />
		</Flex>
	)
}

export default PortfolioStart
