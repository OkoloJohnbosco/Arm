import { Box, Flex, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import IfElse from 'components/if-else'
import LoadingSpinner from 'components/animations/loadingSpinner'
import SuccessSpinner from 'components/animations/successSpinner'
import SpinningSuccess from 'components/animations/successSpinner'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import useOnboardInitiateData from 'modules/account/hooks/useOnboardInitiateData'
import { LoginAuthPropType } from 'modules/account/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { UserType } from '.'
import useAuthLogin from '../../account/hooks/useAuthLogin'

const Success = () => {
	const signupData = useOnboardInitiateData()
	const [hasLogin, setHasLogin] = useState(false)

	const login = useAuthLogin()

	useEffect(() => {
		// login.mutateAsync({ username: signupData.email, password: signupData.password }).then(() => setHasLogin(true))
	}, [])

	return (
		<StackCard spacing={12} textAlign="center">
			<IfElse
				ifOn={hasLogin}
				elseThen={
					<Flex justify="center">
						{/* <LoadingSpinner /> */}
						<SuccessSpinner />
					</Flex>
				}
			>
				<SuccessSpinner />
			</IfElse>
			<Stack>
				<Heading color="neutral-500" variant="h3">
					That was Succesful
				</Heading>
				<Small alt>
					You have Succesfuly registered on ARM Engage. <br /> Click the button below to continue
				</Small>
			</Stack>

			<Button
				// isDisabled={!hasLogin}
				w="full"
				looks="primary"
				href={
					PAGES.ACCOUNT_LOGIN
					// props.userType === UserType.Existing ? PAGES.ACCOUNT_MANAGE_SUBSIDIARIES : PAGES.ACCOUNT_RISK_ASSESSMENT
				}
			>
				Proceed
			</Button>
		</StackCard>
	)
}

export default Success
