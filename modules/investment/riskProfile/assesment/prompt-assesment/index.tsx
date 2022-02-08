import { Box, Flex, Stack, StackProps } from '@chakra-ui/react'
import { StackCard } from 'components/card'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import React from 'react'
import RiskUser from 'modules/svg/RiskUser.svg'
import { Button } from 'components/button'
import { PAGES } from 'constant'
import { getLogin } from 'modules/account/helper'

const PromptRiskAssessment = (props: StackProps) => {
	const { user_account } = getLogin()?.login || {}
	return (
		<StackCard
			align="center"
			w="full"
			p={{ base: 0, md: 10 }}
			spacing={{ md: 16, base: 8 }}
			justify="space-evenly"
			// direction={{ base: 'column', md: 'row' }}
			direction="column"
			{...props}
		>
			<Flex as={RiskUser} boxSize="3xs" />

			<Stack textAlign={{ base: 'center', md: 'start' }}>
				<Heading textAlign="center">
					Hello {user_account?.user?.first_name} {user_account?.user?.last_name}
				</Heading>
				<Body variant="regular14" maxW="40ch" textAlign="center">
					Taking a risk profile will help us recommend suitable investment products and strategies that are best suitble for you.. Kindly click
					on the button to try our risk assesment tool, you can skip the process.
				</Body>
			</Stack>
			<Button looks="primary" w="full" href={PAGES.ACCOUNT_RISK_ASSESSMENT}>
				Take Risk Assessment
			</Button>
		</StackCard>
	)
}

export default PromptRiskAssessment
