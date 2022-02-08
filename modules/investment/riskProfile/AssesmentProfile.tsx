import { Box, Flex, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import { getLogin } from 'modules/account/helper'
import React from 'react'
import { RiskProfileType } from '../../hooks/useRiskProfile'
import RiskUser from 'modules/svg/RiskUser2.svg'

const Profile = (risk_score: RiskProfileType) => {
	const { user_account } = getLogin()?.login || {}

	return (
		<Flex flexDirection={{ base: 'column', md: 'row' }}>
			<Box flex={1} h="calc(100vh - 4rem)" position="relative" py={{ base: 6, md: 8 }} background="#0840AA">
				<RiskUser />
				<Stack color="white" p={4} position={{ md: 'absolute' }} top="50%">
					<Body color="white">{risk_score.risk_portfolio}</Body>
					<Heading color="white">{risk_score.risk_rating} Risk Taker</Heading>
					<Small mb={4} maxW="lg" alt color="white">
						{user_account?.user?.first_name}, {risk_score.portfolio.description}
					</Small>
					<Button href={PAGES.ACCOUNT_RISK_ASSESSMENT} pb={3} w={{ base: 'full', md: '2xs' }} looks="default">
						Retake Risk Assessment
					</Button>
				</Stack>
			</Box>
			<Box p={4} py={8} flex={1} align="center" alignSelf="center">
				<Stack w={{ md: '80%', base: 'full' }} spacing={8} align="center">
					<Heading> Investment Solution recommendations based on your risk profile</Heading>

					<Small mb={4} alt>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet tincidunt urna, diam parturient commodo lectus. Duis nunc,
						enim pellentesque ipsum consectetur laoreet nullam. Enim lorem adipiscing proin pellentesque lectus augue. Egestas elementum aliquet
						pharetra, et porta.
					</Small>
					<Stack>
						<Button w={{ md: 'sm', base: '2xs' }} size={'sm'} href={PAGES.PRODUCT_RECOMMENDATION} justifySelf="center" looks="accentOutline">
							See Recommendation
						</Button>
						<Button
							w={{ md: 'sm', base: '2xs' }}
							size={'sm'}
							// href={PAGES.PRODUCT_RECOMMENDATION}
							justifySelf="center"
							href={PAGES.DASHBOARD_HOME}
							looks="primary"
							// linkProps={{ w: { md: 'fit-content', base: 'full' } }}
						>
							{/* See Recommendation */}
							Goto Dashboard
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Flex>
	)
}

export default Profile
