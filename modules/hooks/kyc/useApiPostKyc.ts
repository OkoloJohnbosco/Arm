import { ENDPOINTS } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'

type PostKycPayloadType = {
	unique_code: string
	stages: Array<{ stage: string; data: any[] }>
}

export default () => {
	return useQueryMutation<any, { customer_kyc: PostKycPayloadType[] } | FormData>({
		method: 'POST',
		endpoint: ENDPOINTS.API_POST_KYC,
	})
}
