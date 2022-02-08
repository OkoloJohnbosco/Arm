import Back from 'components/navigation'
import BackWrapper from 'components/navigation/BackWrapper'
import { Card, StackCard } from 'components/card'
import ServerErrorBoundary from 'components/error/ServerErrorBoundary'
import { OTPForm } from 'components/otp'
import useBroadcastOtpRequest from 'components/otp/useBroadcastOtpRequest'
import { PAGES } from 'constant'
import useMainState from 'lib/hooks/useMainState'
import useOnboardInitiateData from 'modules/account/hooks/useOnboardInitiateData'
import useResetPassword from 'modules/account/hooks/useApiResetPassword'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Stack } from '@chakra-ui/react'

type Props = {
	isLoading?: boolean
	onComplete?: () => void
	onSubmit?: (p: { code: string; verificationReference: string | null | undefined }) => void
	onBack: () => void
	username?: string
	children?: any
}

const VerifyEmail = ({ children, ...props }: Props) => {
	return (
		<ServerErrorBoundary>
			<Stack pb={4}>
				<BackWrapper label="Return back" textDecoration="underline" onClick={props.onBack}>
					<StackCard py="6" h="fit-content" w={{ md: 'md' }} spacing={6}>
						<OTPForm
							childPosition="bottom"
							onComplete={props.onComplete}
							onSubmit={props.onSubmit}
							isLoading={props.isLoading}
							//	error={serverErrors['email'] || serverErrors['otp'] || serverErrors['phone']}
							// useOTP={{ ...props.recipient, broadcastOtp: useBroadcastOtpRequest() }}
							// onSubmit={handleValidateOTP}
							title="We sent a verification code"
							description={`We sent a code to ${props.username}. kindly provide that code.`}
						>
							{children}
						</OTPForm>
					</StackCard>
				</BackWrapper>
			</Stack>
		</ServerErrorBoundary>
	)
}

export default VerifyEmail
