import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { ARMEngageResponseType } from 'lib/types'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'

export const useApiSendOtp = () => {
	return useQueryMutation<ARMEngageResponseType, { username: string; is_email_preffered: boolean }>({
		method: 'POST',
		endpoint: ENDPOINTS.API_REQUEST_CONFIRM_OTP,
		queryKey: NAMESPACE.VALIDATE_OTP,
	})
}
