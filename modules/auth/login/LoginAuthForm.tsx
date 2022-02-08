/* eslint-disable no-unused-vars */
import { Box, Flex, Stack, VStack } from '@chakra-ui/react'
import { Button } from 'components/button'
import Button1 from 'components/button/Button'
import { StackCard } from 'components/card'
import ServerErrorBoundary from 'components/error/ServerErrorBoundary'
import Input from 'components/input'
import PasswordInput from 'components/input/password'
import Link from 'components/link'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import useMainState from 'lib/hooks/useMainState'
import { LoginAuthPropType, LoginField, SignupField } from 'modules/account/types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useAuthLogin from '../../account/hooks/useAuthLogin'

type LoginProps = {
	onLogin: () => void
}
const LoginForm = (props: LoginProps) => {
	const [loginData, setLoginData] = useState<LoginAuthPropType>({})
	const authLogin = useAuthLogin()
	const router = useRouter()

	// const otpRequest = useOTPRequest()
	const { serverErrors } = useMainState()

	const onChange = (event) => {
		const fieldName = event.target.name as LoginField
		const value = event.target.value
		setLoginData({ ...loginData, [fieldName]: value })
	}

	return (
		<ServerErrorBoundary>
			<Stack>
				<StackCard
					w={{ md: 'md' }}
					h="fit-content"
					maxW="md"
					spacing="8"
					py="10"
					as="form"
					onSubmit={(event) => {
						event.preventDefault()
						console.log(loginData)
						authLogin.mutateAsync(loginData).then(props.onLogin)
					}}
				>
					<Stack textAlign="left" spacing="0">
						<Heading>Hello, Welcome Back</Heading>
						<Body>Kindly fill in your details to sign into your account</Body>
					</Stack>
					<Stack>
						<Input
							isRequired
							autoFocus
							placeholder="Email Address | Member ID"
							title="Email Address | Member ID"
							value={loginData?.username}
							name={LoginField.UserName}
							onChange={onChange}
							isBold={true}
						/>

						<PasswordInput
							isRequired
							placeholder="password"
							title="Enter your password"
							value={loginData.password}
							name={LoginField.Password}
							onChange={onChange}
							isBold={true}
							error={serverErrors[SignupField.Email]}
						/>

						<Flex justify="space-between" align="center">
							<Flex align="center" wrap="wrap">
								{/* <Body color="neutral.500">Forgot password ?</Body> &nbsp; */}
								<Link href={PAGES.RESET_PASSWORD} color="claret.500">
									Reset Password
								</Link>
							</Flex>
						</Flex>
					</Stack>

					<Stack>
						<Button1 looks="primary" rounded={4} py={4} isLoading={authLogin.isLoading} w="full" type="submit">
							Login
						</Button1>
					</Stack>
				</StackCard>
				<Stack direction="row" justifyContent="center" alignItems="center">
					<Body color="neutral.500">I don`&#39;t have an account</Body> &nbsp;
					<Link href={PAGES.ACCOUNT_SIGNUP} color="claret">
						Register
					</Link>
				</Stack>
			</Stack>
		</ServerErrorBoundary>
	)
}

export default LoginForm
