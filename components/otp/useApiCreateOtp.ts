import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import useQueryMutation from 'lib/hooks/useQueryMutation'

export default () => {
	return useQueryMutation<{ reference: string }, { customer_action: string }>({
		method: 'POST',
		endpoint: ENDPOINTS.API_AUTH_OTP(),
		queryKey: [Date.now],
	})
}
