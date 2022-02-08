import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'

type PostRedemptionPayload = {
	products: { amount: number; product_id: number }
	reason: number
	other_reason?: string
	otp: {
		code: string
		reference: string
	}
}
export default () => {
	return useQueryMutation<any, PostRedemptionPayload>({
		method: 'POST',
		endpoint: ENDPOINTS.API_REDEMPTION,
	})
}
