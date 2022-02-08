import { Box, ButtonGroup, Flex, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import Link from 'components/link'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import { PAGES } from 'constant'
import { colors } from 'lib/theme'
import StartPage from 'components/layout/components/start/Page'
import LegoMan from 'public/img/illustration/lego-man.svg'
import LegoWorksmith from 'public/img/illustration/lego-worksmith.svg'
import React from 'react'
import ArrowLinkText from 'components/link/ArrowLink'
import { RiskProfileType, useRiskScore } from '../../../../hooks/useRiskProfile'
import { getLogin } from 'modules/account/helper'

const AssessmentResult = (value: RiskProfileType) => {
	const { user_account } = getLogin()?.login || {}

	return (
		<StartPage>
			<Stack w="full" pb={8} justify="center" h="100%">
				<Flex
					display={{ base: 'flex', md: 'none' }}
					py={8}
					mb={8}
					bgGradient={`linear(to-l,${colors['blue-300']} , ${colors['blue-100']})`}
					direction={{ base: 'column', md: 'row' }}
					align="center"
				>
					<Box alignSelf={{ base: 'center', md: 'start' }} as={LegoWorksmith} h={{ base: '3xs', md: '2xs' }} w={{ base: '2xs', md: 'sm' }} />
					<Stack textAlign="center" align="center">
						<Heading color="white">{value?.risk_portfolio}</Heading>
						<Body color="white" maxW={{ base: 'full', md: '50ch' }}>
							Your risk profile helps us recommend suitable investment products and strategies. To know and understand your risk profile better
							click on the link below
						</Body>
						<ArrowLinkText color="white" textDecoration="underline" href="">
							Learn Mores
						</ArrowLinkText>
					</Stack>
				</Flex>

				<Box mb={8} position="relative" display={{ base: 'none', md: 'block' }}>
					<Box position="relative">
						<Flex
							//position="absolute"
							left={0}
							bgGradient={`linear(to-r,${colors['blue-400']} , ${colors['blue-100']})`}
							direction={{ base: 'column', md: 'row' }}
							justify="space-evenly"
							align="center"
						>
							<Box
								top={-24}
								position="absolute"
								left={0}
								alignSelf={{ base: 'center', md: 'start' }}
								as={LegoWorksmith}
								h={{ base: '3xs', md: '2xs' }}
								w={{ base: '2xs', md: 'sm' }}
							/>
							<Stack textAlign="center" align="center" py={8}>
								<Heading color="white">Moderate Risk Taker</Heading>
								<Body color="white" maxW={{ base: 'full', md: '55ch' }}>
									Your risk profile helps us recommend suitable investment products and strategies. To know and understand your risk profile
									better click on the link below
								</Body>
								<ArrowLinkText color="white" textDecoration="underline" href="">
									Learn More
								</ArrowLinkText>
							</Stack>
							<Box
								position="absolute"
								top={-24}
								right={0}
								alignSelf={{ base: 'center', md: 'start' }}
								as={LegoMan}
								h={{ base: '3xs', md: '2xs' }}
								w={{ base: '2xs', md: 'sm' }}
							/>
						</Flex>
					</Box>
				</Box>

				<Stack alignSelf="center" maxW={{ base: 'full', md: '55ch' }} spacing={4} align="center" textAlign="center">
					<Heading>{value?.risk_portfolio}</Heading>

					<Body>
						{user_account?.user?.first_name}, based on the answers you have provided, you are a rish taker. I will be recommending low risk
						funds for you. Click the button below to see the recommendations.
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
		</StartPage>
	)
}

export default AssessmentResult
