// import { ReduxPropsType } from 'reduxx/types'
import { ENDPOINTS, NAMESPACE, PlatFormFeatureType } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { SecureRequestProps } from 'lib/types'
import React, { useEffect } from 'react'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'
import { UseRequestOTPProps } from '../../../components/otp/request/type'

const getOTPEndpoint = ({ body }: SecureRequestProps<UseRequestOTPProps>) => {
	const endpoint = body?.email ? ENDPOINTS.API_REQUEST_EMAIL_OTP : ENDPOINTS.API_REQUEST_PHONE_OTP
	return `${ENDPOINTS.API_BASE_URL}${endpoint}`
}

export type OtpRequestResponseType = { expiry_time: number; expires_in: number; reference: string }

type Props = {
	onSuccess?: ({ data }, variable) => void
}
const useApiRequestEmailOrPhoneOtp = (p?: Props) => {
	return useQueryMutation<{ otp: OtpRequestResponseType; reference?: string }, { email: string; phone_number: string }>({
		endpoint: '',
		setRequestProps: (p) => ({ ...p, body: { ...p.body }, url: getOTPEndpoint(p) }),
		method: 'POST',
		queryKey: NAMESPACE.REQUEST_OTP,
		onSuccess: p?.onSuccess,
		//  ({ data }, variable) => {
		// 	broadcastOtp?.({ otpExpiresIn, phoneNumber, email, ...variable })
		// 	const { countDown } = data.data
		// 	setOtpExpiresIn(countDown)
		// },
	})
}

export default useApiRequestEmailOrPhoneOtp
