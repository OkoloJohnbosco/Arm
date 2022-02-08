import { ENDPOINTS } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'

const useApiGetSelfServicePayment = () => {
	return useQueryMutation<any>({
		method: 'POST',
		endpoint: ENDPOINTS.API_GET_SELF_PAYMENT,
		queryKey: ENDPOINTS.API_GET_SELF_PAYMENT,
	})
}

export default useApiGetSelfServicePayment
