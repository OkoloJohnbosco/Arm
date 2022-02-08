import { Box, Stack } from '@chakra-ui/react'
import { StackCard } from 'components/card'
import SpinningSuccess from 'components/animations/successSpinner'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import { PAGES } from 'constant'
import useMainState from 'lib/hooks/useMainState'
import { LoginAuthPropType, LoginField } from 'modules/account/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Modal from 'components/modal'
import IfElse from 'components/if-else'
import Welcome from './Welcome'
import { getLogin } from 'modules/account/helper'

const LoginSuccess = () => {
	const login = getLogin()?.login
	const router = useRouter()

	useEffect(() => {
		switch (login?.user_account.user_type) {
			case 'existing':
				if (!login?.is_first_time_login) {
					router.push(login.is_first_time_login ? PAGES.USER_PRODUCTS : PAGES.DASHBOARD_HOME)
				}
				break
			case 'new':
				if (login?.is_first_time_login) {
					router.push(PAGES.ACCOUNT_RISK_ASSESSMENT)
				} else {
					router.push(PAGES.PRODUCT_RECOMMENDATION_CATALOGUE)
				}
				break
		}
		router.prefetch(PAGES.PRODUCT_RECOMMENDATION_CATALOGUE)
	}, [])

	return (
		<IfElse
			ifOn={login?.user_account.user_type === 'existing' && login?.is_first_time_login}
			elseThen={
				<StackCard spacing={12} textAlign="center" w={{ md: 'md' }}>
					<Box>
						<SpinningSuccess />
					</Box>
					<Stack>
						<Heading>That was Succesful</Heading>
						<Body>You have Succesfuly signed into your ARM Engage. A moment ...</Body>
					</Stack>
				</StackCard>
			}
		>
			<Modal size="lg" padded={false} isOpen={login?.user_account.user_type === 'existing' && login?.is_first_time_login}>
				<Welcome />
			</Modal>
		</IfElse>
	)
}

export default LoginSuccess
