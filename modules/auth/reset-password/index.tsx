import { Flex, Stack } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import IfElse from 'components/if-else'
import Input from 'components/input'
import PasswordInput from 'components/input/password'
import Switct from 'components/input/switch'
import StartPage from 'components/layout/components/start2/Page'
import Link from 'components/link'
import { useApiSendOtp } from 'components/otp/useApiSendOtp'
import { PasswordMeter } from 'components/password-meter'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import useResetPassword from 'modules/account/hooks/useApiResetPassword'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { isEmail, isNumberEdit } from 'utils/helpers'
import VerifyEmail from './OtpAuth'

const Index = () => {
	const [password, setPassword] = useState('')
	const [username, setUserName] = useState('')
	const [requestOTP, setRequestOtp] = useState(false)
	const resetpassword = useResetPassword()
	const [isEmailPrefered, setIsEmailPrefered] = useState(true)
	const router = useRouter()
	const sendOtp = useApiSendOtp()

	const onComplete = ({ code }) => {
		console.log(code)
		resetpassword.mutateAsync({ new_password: password, username: username, otp: code }).then(() => router.push(PAGES.ACCOUNT_LOGIN))
	}

	return (
		<StartPage>
			<Flex w="full" align="center" justify="center" display={{ base: 'block', md: 'flex' }}>
				<IfElse
					transition="scaleFade"
					ifOn={!requestOTP}
					elseThen={
						<VerifyEmail isLoading={resetpassword.isLoading} onSubmit={onComplete} onBack={() => setRequestOtp(false)} username={username}>
							<Stack>
								<PasswordInput
									showStrength
									value={password}
									onChange={({ target }) => setPassword(target.value)}
									name="new_password"
									isRequired
									title="New Password"
									placeholder="Enter new password"
									containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
									backgroundColor="#F4F5F7"
									color="neutral-500"
									mb={2}
								/>
							</Stack>
						</VerifyEmail>
					}
				>
					<StackCard
						py="14"
						paddingBottom={8}
						h="fit-content"
						w={{ md: 'md' }}
						spacing={8}
						as="form"
						onSubmit={(event) => {
							event.preventDefault()
							console.log(username, 'username')
							sendOtp.mutateAsync({ is_email_preffered: isEmailPrefered, username }).then((res) => {
								console.log(res)
								setRequestOtp(true)
							})
							//setRequestOtp(true)
							// onSubmit(signupData)
						}}
					>
						<Stack textAlign="left">
							<Caption alt fontSize="1.5rem">
								Lets Reset That Password
							</Caption>
							<Body fontSize="14px">Enter Email Associated with your Account </Body>
						</Stack>
						<Stack spacing={4}>
							<Input
								value={username}
								onChange={({ target }) => setUserName(target.value)}
								name="recipient"
								isRequired
								title="Email | Phone Number"
								error={isEmail(username) || (username && isNumberEdit(username)) ? '' : 'Enter Email or Phone Number'}
								placeholder="Enter Your account email or phone Number"
							/>
							{/* <Switct
								isChecked={isEmailPrefered}
								onChange={({ target }) => setIsEmailPrefered(target.checked)}
								layoutDirection="horizontal"
								title="Send OTP to Email"
							/> */}
						</Stack>

						<Stack w="full">
							<Button
								w="full"
								py={3}
								isLoading={sendOtp.isLoading}
								looks="primary"
								type="submit"
								isDisabled={!username && (isEmail(username) || isNumberEdit(username))}
							>
								Proceed
							</Button>
							<Flex align="center">
								<Small color="neutral-500">I dont have an Account</Small> &nbsp;
								<Link variant="semibold12" href={PAGES.ACCOUNT_SIGNUP}>
									Register
								</Link>
							</Flex>
						</Stack>
					</StackCard>
				</IfElse>
			</Flex>
		</StartPage>
	)
}

export default Index
