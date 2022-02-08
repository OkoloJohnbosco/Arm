import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { ARMEngageResponseType } from 'lib/types'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'

export default () => {
	return useQueryMutation<ARMEngageResponseType, { email: string; phone_number: string; otp: string; reference: string }>({
		method: 'POST',
		setRequestProps: (props) => {
			return {
				...props,
				url: props.body.email
					? ENDPOINTS.API_BASE_URL + ENDPOINTS.API_REQUEST_EMAIL_OTP_VALIDATE
					: ENDPOINTS.API_BASE_URL + ENDPOINTS.API_REQUEST_PHONE_OTP_VALIDATE,
			}
		},
		endpoint: ENDPOINTS.API_REQUEST_PHONE_OTP_VALIDATE,
		queryKey: NAMESPACE.VALIDATE_OTP,
	})
}
