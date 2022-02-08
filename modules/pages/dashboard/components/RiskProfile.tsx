import { Box, Flex, HStack, Stack, StackDivider, Wrap, WrapItem } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import LoadingWrapper from 'components/layout/loading-wrapper'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import { colors } from 'lib/theme'
import { truncate } from 'lodash'
import { useRiskScore } from 'modules/hooks/useRiskProfile'
import React from 'react'
import { MdPhone } from 'react-icons/md'
import { hexToRGBA2 } from 'utils/helpers'
import { BullIcon, HouseIcon, NavigationIcon } from 'modules/svg'
import { FaPhoneAlt } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { hexToRGBA3 } from 'lib/theme/color'
import Mini from 'components/typography/Mini'
const productIcon = [HouseIcon, NavigationIcon, BullIcon]

const RiskApitite = () => {
	const riskProfile = useRiskScore()
	const ProductIcon = productIcon[Math.floor(Math.random() * productIcon.length)]

	return (
		<Stack>
			<StackCard mb={{ base: '8', md: 0 }} responsive divider={<StackDivider />}>
				<Flex justify="space-between">
					<Caption alt>Risk Appitite</Caption>
					<Mini alt textTransform="capitalize">
						{riskProfile.value?.risk_profile.portfolio.rating} Investor
					</Mini>
				</Flex>
				<Stack spacing={4}>
					<LoadingWrapper isLoading={!riskProfile.value}>
						<HStack>
							<Flex
								display="flex"
								as={ProductIcon}
								rounded="full"
								boxSize={9}
								align="center"
								justify="center"
								background={colors['yellow-100']}
							/>
							<Caption alt>{riskProfile.value?.risk_profile.portfolio.profile}</Caption>
						</HStack>
						<Body>{truncate(riskProfile.value?.risk_profile.portfolio.description, { length: 100 })}</Body>
					</LoadingWrapper>
					<Button w="full" looks="secondary" href={PAGES.ACCOUNT_RISK_ASSESSMENT}>
						Try Risk Assessment
					</Button>
				</Stack>
			</StackCard>
			<StackCard responsive divider={<StackDivider />} spacing="4">
				<Caption>Reach out to your Relation manager</Caption>
				<Stack>
					<Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis eget lorem quis odio egestas etiam id.</Body>
					<Wrap justify="space-between">
						<WrapItem>
							<HStack>
								<Flex align="center" justify="center" boxSize="8" rounded="full" bg={hexToRGBA3('neutral', 100, 0.3)}>
									<FaPhoneAlt />
								</Flex>
								<Box>
									<Caption>+234 813 2457 238</Caption>
									<Small>Reach via phone</Small>
								</Box>
							</HStack>
						</WrapItem>
						<WrapItem>
							<HStack>
								<Flex align="center" justify="center" boxSize="8" rounded="full" bg={hexToRGBA3('neutral', 100, 0.3)}>
									<AiOutlineMail />
								</Flex>
								<Box>
									<Caption>rachelmattew@arm.com</Caption>
									<Small>Reach via email</Small>
								</Box>
							</HStack>
						</WrapItem>
					</Wrap>
				</Stack>
			</StackCard>
		</Stack>
	)
}

export default RiskApitite
