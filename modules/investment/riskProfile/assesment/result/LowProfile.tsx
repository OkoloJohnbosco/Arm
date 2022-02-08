import React from 'react'
import { Box, ButtonGroup, Flex, HStack, Image, Stack, VStack } from '@chakra-ui/react'
import Divider from 'components/divider'
import Link from 'components/link'
import StartPage from 'components/layout/components/start/Page'
import { colors } from 'lib/theme'
import ArrowLinkText from 'components/link/ArrowLink'
import HighFive from 'public/img/illustration/high-five.svg'
import { Button } from 'components/button'
import { PAGES } from 'constant'
import Heading from 'components/typography/Heading'
import Body from 'components/typography/Body'
import { getLogin } from 'modules/account/helper'
import { RiskProfileType, useRiskScore } from '../../../../hooks/useRiskProfile'

const AssessmentResult = (value: RiskProfileType) => {
	// const { value, isFetching } = useRiskScore(getLogin()?.login.user_account.engage_id)
	return (
		<StartPage>
			{/* <Stack w="full" pb={8}> */}
			<Stack w="full" pb={8} direction={{ md: 'row', base: 'column' }} justify="space-evenly" spacing={8} align="center" minH="calc(100vh - 5rem)">
				<Stack>
					<Stack direction={{ base: 'column-reverse', md: 'column' }}>
						{/* <Flex justify={{ base: 'center', md: 'start' }}> */}
						<Box alignSelf={{ base: 'center', md: 'start' }} as={HighFive} h={{ base: '3xs', md: 'xs' }} w={{ base: '2xs', md: 'sm' }} />

						{/* <Image src="/img/illustration/high-five.svg" h={{ base: '3xs', md: 'xs' }} w={{ base: '2xs', md: 'sm' }} /> */}
						{/* </Flex> */}
						<Heading>{value?.risk_portfolio}</Heading>
					</Stack>
					<Stack maxW={{ base: 'full', md: '55ch' }} spacing={4}>
						<Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices adipiscing in vestibulum, vitae. Arcu,</Body>
						<ArrowLinkText textDecoration="underline" href="">
							Learn More
						</ArrowLinkText>
					</Stack>
				</Stack>
				<Divider orientation="vertical" display={{ base: 'none', md: 'block' }} />

				<Stack maxW={{ base: 'full', md: '55ch' }} spacing={4}>
					<HStack align="center">
						<Image src="/img/icons/shield-circle.svg" boxSize={'50px'} />
						<Heading>You are a Low Risk Investor</Heading>
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
			{/* </Stack> */}
			{/* </Flex> */}
		</StartPage>
	)
}

export default AssessmentResult
