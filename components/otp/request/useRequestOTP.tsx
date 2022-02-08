// import { ReduxPropsType } from 'reduxx/types'
import { ENDPOINTS, NAMESPACE, PlatFormFeatureType } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { SecureRequestProps } from 'lib/types'
import React, { useEffect } from 'react'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'
import { UseRequestOTPProps } from './type'
import useApiRequestEmailOrPhoneOtp from '../../../modules/hooks/otp/useApiRequestEmailOrPhoneOtp'

export default ({ otpExpiresIn: expires = 0, broadcastOtp, phoneNumber, email }: UseRequestOTPProps) => {
	const [otpExpiresIn, setOtpExpiresIn] = React.useState(expires)

	useEffect(() => {
		const timer = otpExpiresIn > 0 && setTimeout(() => setOtpExpiresIn(otpExpiresIn - 1), 1000)
		return () => {
			timer && clearTimeout(timer)
		}
	}, [otpExpiresIn])

	const onSuccess = ({ data }, variable) => {
		broadcastOtp?.({ phoneNumber, email, ...variable, ...data })
		const { countDown } = data.data
		setOtpExpiresIn(countDown)
	}
	const queryMutation = useApiRequestEmailOrPhoneOtp({ onSuccess })
	// const queryMutation = useQueryMutation<{ otp: OtpRequestResponseType }, { email: string; phone_number: string }>({
	// 	endpoint: '',
	// 	setRequestProps: (p) => ({ ...p, body: { ...p.body }, url: getOTPEndpoint(p) }),
	// 	method: 'POST',
	// 	queryKey: NAMESPACE.REQUEST_OTP,
	// 	onSuccess: ({ data }, variable) => {
	// 		broadcastOtp?.({ otpExpiresIn, phoneNumber, email, ...variable })
	// 		const { countDown } = data.data
	// 		setOtpExpiresIn(countDown)
	// 	},

	// })
	return { ...queryMutation, otpExpiresIn }
}
