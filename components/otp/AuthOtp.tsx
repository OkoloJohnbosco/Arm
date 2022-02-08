import { Box, Flex, HStack, PinInput, PinInputField, Spinner, Stack } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import { Button } from 'components/button'
import Input from 'components/input'
import useRequestOTP, { UseRequestOTPProps } from 'components/otp/useRequestOTP'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { SESSION_STORAGE_OTP_MONITOR } from 'constant'
import React, { useEffect, useState } from 'react'
import { OtpProps } from './types'
import Heading from 'components/typography/Heading'
import { useApiSendOtp } from './useApiSendOtp'
import { Console } from 'console'
import Link from 'components/link'
import EmailSent from 'components/animations/EmailSent'
import KeyLock from 'components/animations/KeyLock'
import PasswordInput from 'components/input/password'
import SubHeading from 'components/typography/SubHeading'
import useApiCreateOtp from './useApiCreateOtp'

export type AuthOtpProps = {
	onSubmit: (props: { reference: string; otp: string }) => void
	buttonLabel?: string
	size?: number
	placeholder?: string
	description?: string
	title?: string
	name?: string
}

const useCounter = (from: number = 0) => {
	const [otpExpiresIn, setOtpExpiresIn] = React.useState(from)

	useEffect(() => {
		setOtpExpiresIn(from)
	}, [from])

	useEffect(() => {
		const timer = otpExpiresIn > 0 && setTimeout(() => setOtpExpiresIn(otpExpiresIn - 1), 1000)
		return () => {
			timer && clearTimeout(timer)
		}
	}, [otpExpiresIn])

	return { otpExpiresIn, update: setOtpExpiresIn }
}

const OTP = (props: AuthOtpProps) => {
	const {
		onSubmit,

		buttonLabel = 'Submit',
		size,

		placeholder,
		description,

		name,
		title = 'Verification Code',
		...informationProps
	} = props
	const [otpCode, setOtpCode] = useState('')
	const [otpReference, setOtpReference] = useState('')
	const createOtp = useApiCreateOtp()

	const onContinue = (event: React.FormEvent) => {
		event.preventDefault()
		if (onSubmit) {
			//Let the User Do something with the OTP provided
			onSubmit({ otp: otpCode, reference: otpReference })
		}
	}

	const { otpExpiresIn, update } = useCounter()

	const onRequestOtp = () => {
		return createOtp.mutateAsync({ customer_action: 'redemption' }).then(({ data }) => {
			setOtpReference(data.data.reference)
		})
	}
	//  useCounter()
	useEffect(() => {
		onRequestOtp()
	}, [])
	return (
		<form onSubmit={onContinue}>
			<Stack spacing={8} justifyContent="center" className="text-center">
				<Stack spacing={4} textAlign="center">
					<Flex justify="center">{createOtp.isLoading ? <EmailSent /> : <KeyLock />}</Flex>
					<SubHeading>{title}</SubHeading>
					<Body variant="regular13">{description}</Body>
				</Stack>
				<Box mb="8">
					<IfElse
						ifOn={!!props.size}
						elseThen={
							<Stack w="full">
								<PasswordInput
									isRequired
									// error={error}
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
								/>
							</Stack>
						}
					>
						<Stack>
							<HStack justify="center">
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
							</HStack>
						</Stack>
					</IfElse>
				</Box>
				<Stack w="full">
					<Button
						alt
						type="submit"
						looks="primary"
						minW="full"
						responsive
						size="md"
						isLoading={createOtp.isLoading}
						isDisabled={createOtp.isLoading}
					>
						{buttonLabel}
					</Button>
					<IfElse ifOn={true}>
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
								pointerEvents={otpExpiresIn === 0 && createOtp.isLoading ? 'none' : 'auto'}
								cursor={!otpExpiresIn && createOtp.isLoading ? 'not-allowed' : 'pointer'}
								w="fit-content"
								onClick={() => {
									!otpExpiresIn && !createOtp.isLoading && onRequestOtp()
								}}
							>
								Resend Code
								{otpExpiresIn ? otpExpiresIn : ''}
							</Link>
							<Spinner size="xs" display={createOtp.isLoading ? 'inline-block' : 'none'} />
						</HStack>
					</IfElse>
					{/* <Small maxW="50ch">By continuing, you agree to receive texts and calls from ARM</Small> */}
				</Stack>
			</Stack>
		</form>
	)
}

export default React.memo(OTP)
