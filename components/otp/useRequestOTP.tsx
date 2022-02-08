// import { ReduxPropsType } from 'reduxx/types'
import { ENDPOINTS, NAMESPACE, PlatFormFeatureType } from 'constant'
import { SecureRequestProps } from 'lib/types'
import React, { useEffect } from 'react'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'
import useQueryMutation from '../../lib/hooks/useQueryMutation'

export type UseRequestOTPProps = {
	// email?: string
	// phoneNumber?: string
	username?: string
	is_email_preffered?: boolean
	otpExpiresIn?: number
	broadcastOtp?: (props: Omit<UseRequestOTPProps, 'broadCastOTP'>) => void
}

// const getOTPEndpoint = ({ body }: SecureRequestProps<UseRequestOTPProps>) => {
// 	const endpoint = body?.email ? ENDPOINTS.API_REQUEST_EMAIL_OTP : ENDPOINTS.API_REQUEST_PHONE_OTP
// 	return `${ENDPOINTS.API_BASE_URL}${endpoint}`
// }

export default ({
	otpExpiresIn: expires = 0,
	broadcastOtp,
	// phoneNumber, email
	username,
	is_email_preffered,
}: UseRequestOTPProps) => {
	const [otpExpiresIn, setOtpExpiresIn] = React.useState(expires)

	useEffect(() => {
		const timer = otpExpiresIn > 0 && setTimeout(() => setOtpExpiresIn(otpExpiresIn - 1), 1000)
		return () => {
			timer && clearTimeout(timer)
		}
	}, [otpExpiresIn])

	const queryMutation = useQueryMutation<{ countDown: number; verificationReference: string }, { username: string; is_email_preffered: boolean }>({
		endpoint: ENDPOINTS.API_REQUEST_CONFIRM_OTP,
		//setRequestProps: (p) => ({ ...p, body: { ...p.body }, url: getOTPEndpoint(p) }),
		method: 'POST',
		queryKey: NAMESPACE.REQUEST_OTP,
		onSuccess: ({ data }, variable) => {
			broadcastOtp?.({
				otpExpiresIn,
				username,
				is_email_preffered,
				// phoneNumber, email,
				...variable,
			})
			const { countDown } = data.data
			setOtpExpiresIn(countDown)
		},
		// eventMessage: {
		// 	error: setErrorMessage(),
		// 	success: setSuccessMessage(),
		// },
	})
	return { ...queryMutation, otpExpiresIn }
}
