import { StackCard } from 'components/card'
import ServerErrorBoundary from 'components/error/ServerErrorBoundary'
import BackWrapper from 'components/navigation/BackWrapper'
import RequestOtpForm from 'components/otp/request/RequestOtpForm'
import useBroadcastOtpRequest from 'components/otp/useBroadcastOtpRequest'
import { OtpRequestResponseType } from 'modules/hooks/otp/useApiRequestEmailOrPhoneOtp'
import React from 'react'

type Props = {
	isLoading?: boolean
	onComplete?: () => void
	onSubmit?: (p: OtpRequestResponseType & { code: string }) => void
	onBack: () => void
	recipient?: { email?: string; phoneNumber?: string }
	children?: any
}

const VerifyEmail = ({ children, ...props }: Props) => {
	return (
		<ServerErrorBoundary>
			<StackCard py="14" h="fit-content" w={{ md: 'md' }} spacing={8}>
				<BackWrapper onClick={props.onBack}>
					<RequestOtpForm
						childPosition="bottom"
						onComplete={props.onComplete}
						onSubmit={props.onSubmit}
						isLoading={props.isLoading}
						//	error={serverErrors['email'] || serverErrors['otp'] || serverErrors['phone']}
						useOTP={{ ...props.recipient, broadcastOtp: useBroadcastOtpRequest() }}
						// onSubmit={handleValidateOTP}
						title="We sent a verification code"
						description={`We sent a code to ${props.recipient?.email || props.recipient?.phoneNumber}. kindly provide that code.`}
					>
						{children}
					</RequestOtpForm>
				</BackWrapper>
			</StackCard>
		</ServerErrorBoundary>
	)
}

export default VerifyEmail
