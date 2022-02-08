import { Box, Flex, Stack } from '@chakra-ui/react'
import Divider from 'components/divider'
import CupJumbLoader from 'components/animations/cupJumb'
import LoadingSpinner from 'components/animations/loadingSpinner'
import SuccessSpinner from 'components/animations/successSpinner'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Heading from 'components/typography/Heading'
import { getLogin } from 'modules/account/helper'
import StartPage from 'components/layout/components/start/Page'
import React, { useEffect } from 'react'
import { useRiskScore } from '../../../hooks/useRiskProfile'
import { RiskAssesmentScreenProps } from './type'

const LoadingResult = (props: { isLoading?: boolean }) => {
	const { user_account } = getLogin()?.login || {}
	// const { value, isFetching } = useRiskScore(user_account?.engage_id)

	// useEffect(() => {
	// 	if (value?.risk_score?.engage_id)
	// 		setTimeout(() => {
	// 			props.onComplete()
	// 		}, 1000)
	// }, [value?.risk_score?.engage_id])

	return (
		<StartPage hasShadow>
			<Flex align="center" minH="calc(100vh - 5rem)" justify="space-evenly" flexDir={{ base: 'column', md: 'row' }}>
				<Box>
					<CupJumbLoader />
				</Box>

				<Divider orientation="vertical" display={{ base: 'none', md: 'block' }} />

				<Stack spacing={6}>
					<Heading textAlign="center">We are Almost There</Heading>
					<Body maxW="40ch">
						Hi {user_account?.user?.first_name}, excited already? Feel free to grab a cup of coffee while we calculate your Risk Assessment
					</Body>

					{/* <Flex justify="center"> <LoadingSpinner /> </Flex> */}

					<Flex justify="center">{!props.isLoading ? <LoadingSpinner /> : <SuccessSpinner />}</Flex>
				</Stack>
			</Flex>
		</StartPage>
	)
}

export default LoadingResult
