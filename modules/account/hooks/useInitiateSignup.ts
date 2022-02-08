import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'

export const useMutateOnboardSignup = () => {
	return useQueryMutation({
		eventMessage: {
			success: setSuccessMessage(),
			error: setErrorMessage(),
		},
		method: 'POST',
		endpoint: ENDPOINTS.API_INITIATE_SIGNUP,
		queryKey: NAMESPACE.INITIATE_SIGNUP,
	})
}
