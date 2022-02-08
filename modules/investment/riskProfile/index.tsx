import { Flex } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import StartPage from 'components/layout/components/start/Page'
import LoadingSpinner from 'components/animations/loadingSpinner'
import { getLogin } from 'modules/account/helper'
import React from 'react'
import PromtAssessment from './assesment/prompt-assesment'
import { useRiskScore } from '../../hooks/useRiskProfile'
import RiskProfile from './AssesmentProfile'

const Profile = () => {
	const { user_account } = getLogin()?.login || {}
	const { value, isFetching } = useRiskScore(user_account?.engage_id)
	console.log(value)
	return (
		<StartPage hasShadow>
			<IfElse
				ifOn={!isFetching}
				elseThen={
					<Flex h="full" align="center" justify="center">
						<LoadingSpinner />
					</Flex>
				}
			>
				<IfElse
					ifOn={value?.risk_profile}
					elseThen={
						<Flex maxW="lg" margin="2rem auto">
							<PromtAssessment h="full" />
						</Flex>
					}
				>
					<RiskProfile {...(value?.risk_profile as any)} />
				</IfElse>
			</IfElse>
		</StartPage>
	)
}

export default Profile
