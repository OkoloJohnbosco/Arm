import { Flex, HStack, Image, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import Divider from 'components/divider'
import Link from 'components/link'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import { PAGES } from 'constant'
import StartPage from 'components/layout/components/start/Page'
import React from 'react'
import { RiskProfileType } from '../../../../hooks/useRiskProfile'

const AssessmentResult = (value: RiskProfileType) => {
	console.log(value)
	// const { value, isFetching } = useRiskScore(getLogin()?.login.user_account.engage_id)
	return (
		<StartPage>
			<Stack w="full" pb={8}>
				<Flex align="center" justify="center">
					<Image src="/img/risk-result.svg" boxSize="250px" />
				</Flex>
				<Stack direction={{ md: 'row', base: 'column' }} justify="space-evenly" spacing={8}>
					<Stack maxW={{ base: 'full', md: '55ch' }} spacing={4}>
						<Heading>{value?.risk_portfolio}</Heading>
						<Body>
							You are a balanced investor with some understanding of investment market behaviour and can accept some short term risk to your
							capital. You do not wish to see all of your capital eroded by tax...
						</Body>
						<Link textDecoration="underline" href="">
							Learn More
						</Link>
					</Stack>

					<Divider orientation="vertical" display={{ base: 'none', md: 'block' }} />

					<Stack maxW={{ base: 'full', md: '55ch' }} spacing={4}>
						<HStack align="end">
							<Image boxSize={12} src="/img/icons/property-icon.svg" />
							<Heading>You are a Medium Risk Investor and you fall into the Fund II RSA</Heading>
						</HStack>

						<Body>
							William, based on the answers you have provided, you are a rish taker. I will be recommending low risk funds for you. Click the
							button below to see the recommendations.
						</Body>
						<Stack direction={{ md: 'row', base: 'column' }}>
							<Button href={PAGES.PRODUCT_RECOMMENDATION_CATALOGUE} looks="primary" w={{ md: '3xs', base: 'full' }}>
								Continue
							</Button>

							<Button href={PAGES.ACCOUNT_RISK_ASSESSMENT} w={{ md: '3xs', base: 'full' }}>
								Retake Assement
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			{/* </Flex> */}
		</StartPage>
	)
}

export default AssessmentResult
