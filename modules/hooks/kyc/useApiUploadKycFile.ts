import { ENDPOINTS } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'

export default () => {
	return useQueryMutation({
		endpoint: ENDPOINTS.API_POST_KYC_File,
		method: 'POST',
	})
}
