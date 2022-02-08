import { InformationProps } from 'components/information/type'
import { CustomInputProps } from 'components/input'
import { ARMEngageResponseType } from 'lib/types'
import { OtpRequestResponseType } from 'modules/hooks/otp/useApiRequestEmailOrPhoneOtp'

export type UseRequestOTPProps = {
	email?: string
	phoneNumber?: string
	otpExpiresIn?: number
	broadcastOtp?: (props: Omit<UseRequestOTPProps, 'broadCastOTP'>) => void
}

export interface OtpProps extends InformationProps, Omit<CustomInputProps, keyof InformationProps | 'onSubmit'> {
	onSubmit?: (p: { code: string } & OtpRequestResponseType) => void
	onComplete?: (response: ARMEngageResponseType) => void
	isLoading?: boolean
	buttonLabel?: string
	size?: number
	useOTP?: UseRequestOTPProps
	AcitonComponent?: any
	children?: any
	childPosition?: 'top' | 'bottom'
}
