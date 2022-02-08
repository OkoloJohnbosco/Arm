import { InputProps } from '@chakra-ui/react'
import { InformationProps } from 'components/information/type'
import { CustomInputProps } from 'components/input'

import { UseRequestOTPProps } from 'components/otp/useRequestOTP'
import { ARMEngageResponseType } from 'lib/types'

export interface OtpProps extends InformationProps, Omit<CustomInputProps, keyof InformationProps | 'onSubmit'> {
	onSubmit?: (p: { code: string; verificationReference: string | null | undefined }) => void
	onComplete?: (response: ARMEngageResponseType) => void
	isLoading?: boolean
	buttonLabel?: string
	size?: number
	useOTP?: UseRequestOTPProps
	AcitonComponent?: any
	children?: any
	childPosition?: 'top' | 'bottom'
}
