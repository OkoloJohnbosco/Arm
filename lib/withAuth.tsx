import { Flex } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import LoadingSpinner from 'components/animations/loadingSpinner'
import { PAGES, SERVER_CODES } from 'constant'
import useMainState from 'lib/hooks/useMainState'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import OnboardingWrapper from './OnboardingWrapper'

const withAuth = (Component: React.FC<any>) => {
	return function Auth() {
		const { errors, responseCode } = useMainState().serverErrors
		const router = useRouter()
		const isAuthorized = responseCode !== SERVER_CODES.UNAUTHORIZED && responseCode !== SERVER_CODES.TOKEN_EXPIRED

		useEffect(() => {
			!isAuthorized && router.push(PAGES.ACCOUNT_LOGIN)
		}, [responseCode])

		console.log(errors, responseCode)

		return (
			<IfElse
				ifOn={isAuthorized}
				elseThen={
					<Flex h="100vh" w="full" align="center" justify="center">
						<LoadingSpinner />
					</Flex>
				}
			>
				<OnboardingWrapper>
					<Component />
				</OnboardingWrapper>
			</IfElse>
		)
	}
}

export default withAuth
