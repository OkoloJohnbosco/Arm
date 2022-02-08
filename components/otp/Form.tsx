import { Box, Flex, HStack, PinInput, PinInputField, Spinner, Stack } from '@chakra-ui/react'
import EmailSent from 'components/animations/EmailSent'
import KeyLock from 'components/animations/KeyLock'
import { Button } from 'components/button'
import IfElse from 'components/if-else'
import PasswordInput from 'components/input/password'
import Link from 'components/link'
import useRequestOTP, { UseRequestOTPProps } from 'components/otp/useRequestOTP'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'
import { SESSION_STORAGE_OTP_MONITOR } from 'constant'
import React, { useEffect, useState } from 'react'
import { OtpProps } from './types'
import { useApiSendOtp } from './useApiSendOtp'

const hadRequestOTP = ({ username }: UseRequestOTPProps) => {
	const requestedOtp: UseRequestOTPProps | null = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_OTP_MONITOR) || 'null')
	return requestedOtp?.username
}

const OTP = (props: OtpProps) => {
	const {
		onSubmit,
		useOTP,
		buttonLabel = 'Submit',
		size,
		isLoading,
		AcitonComponent,
		placeholder,
		description,
		error,
		onComplete,
		name,
		title = 'Verification Code',
		children,
		childPosition = 'top',
		...informationProps
	} = props
	const [otpCode, setOtpCode] = useState('')
	const useOtpData = useOTP
	const {
		// email, phoneNumber,
		username,
		is_email_preffered,
		broadcastOtp,
		otpExpiresIn = 0,
	} = useOtpData || {}
	const otpRequest = useRequestOTP({ username, is_email_preffered, broadcastOtp, otpExpiresIn })
	const shouldGenerateOTP = !!username
	const validateOTP = useApiSendOtp()

	const onContinue = (event: React.FormEvent) => {
		event.preventDefault()
		if (onSubmit) {
			//Let the User Do something with the OTP provided
			onSubmit({ code: otpCode, verificationReference: otpRequest.value?.verificationReference || null })
		}
		if (onComplete) {
			//Validate the users Email or phone number automatically
			validateOTP
				.mutateAsync({
					username,
					is_email_preffered,
					//  otp: otpCode, email, phone_number: phoneNumber, verification_reference: otpRequest.value?.verificationReference
				})
				.then(onComplete)
		}
	}

	useEffect(() => {
		useOtpData &&
			!hadRequestOTP(useOtpData) &&
			shouldGenerateOTP &&
			otpRequest.mutateAsync({
				username,
				is_email_preffered,
				//  email, phone_number: phoneNumber
			})
	}, [])

	return (
		<form onSubmit={onContinue}>
			<Stack justifyContent="center" className="text-center" spacing={{ md: 8, base: 6 }}>
				<Stack align="center">
					<Flex>{isLoading ? <EmailSent /> : <KeyLock />}</Flex>
					<Caption alt>{title}</Caption>
					<Body textAlign="center">{description}</Body>
				</Stack>
				<Stack>
					{childPosition == 'top' && children}
					<IfElse
						ifOn={!!props.size}
						elseThen={
							<Stack w="full">
								<PasswordInput
									isRequired
									error={error}
									title="Enter Code"
									name={name || 'otp'}
									//	{...informationProps}
									placeholder={placeholder}
									//	type="password"
									fontWeight="600"
									//title={description as string}
									onChange={({ target }) => {
										setOtpCode(target.value)
									}}
									containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
									backgroundColor="#F4F5F7"
									color="neutral-500"
								/>
							</Stack>
						}
					>
						<PinInput type="number" onChange={setOtpCode}>
							{new Array(props.size).fill(0).map(({ inputPosition, ...others }, k) => {
								return (
									<PinInputField
										key={k}
										isRequired
										className="focus:ring-1 focus:ring-primary-light border-gray-400"
										type="password"
										required
									/>
								)
							})}
						</PinInput>
					</IfElse>

					{childPosition === 'bottom' && children}
				</Stack>
				<Stack w="full">
					<Button
						alt
						type="submit"
						looks="primary"
						minW="full"
						responsive
						//size="md"
						isLoading={isLoading || validateOTP.isLoading}
						isDisabled={otpRequest.isLoading}
					>
						{buttonLabel}
					</Button>
					<IfElse ifOn={shouldGenerateOTP}>
						<HStack align="center" justify="center">
							<Small alt color="grey-600">
								Did Not Receive Code?
							</Small>{' '}
							&nbsp;
							<Link
								variant="semibold12"
								href="#"
								alt
								color="blue"
								textAlign="right"
								pointerEvents={
									(otpRequest.otpExpiresIn === 0 && otpRequest.isLoading) || isLoading || validateOTP.isLoading ? 'none' : 'auto'
								}
								cursor={(!otpRequest.otpExpiresIn && otpRequest.isLoading) || isLoading ? 'not-allowed' : 'pointer'}
								w="fit-content"
								onClick={() => {
									!otpRequest.otpExpiresIn &&
										!otpRequest.isLoading &&
										!validateOTP.isLoading &&
										otpRequest.mutateAsync({ username, is_email_preffered })
								}}
							>
								Resend Code
								{otpRequest.otpExpiresIn ? otpRequest.otpExpiresIn : ''}
							</Link>
							<Spinner size="xs" display={otpRequest.isLoading ? 'inline-block' : 'none'} />
						</HStack>
					</IfElse>
					{/* <Small maxW="50ch">By continuing, you agree to receive texts and calls from ARM</Small> */}
				</Stack>
			</Stack>
		</form>
	)
}

export default React.memo(OTP)
