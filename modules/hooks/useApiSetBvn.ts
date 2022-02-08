import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { ARMEngageResponseType } from 'lib/types'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'
import { RiskAssessmentStage, RiskProfileQuestionType } from '../investment/riskProfile/assesment/type'

type PostBvnPayload = {
	bvn: string
	unique_id: string
}
const usePostBvn = () => {
	return useQueryMutation<any, PostBvnPayload>({
		method: 'POST',
		endpoint: ENDPOINTS.API_POST_BVN,
		queryKey: NAMESPACE.GET_RISK_QUESTION,
	})
}

export const useValidateBvn = () => {
	return useQueryMutation<any, PostBvnPayload & { otp: string }>({
		method: 'POST',
		endpoint: ENDPOINTS.API_VALIDATE_BVN,
		queryKey: NAMESPACE.GET_RISK_QUESTION,
	})
}

export default usePostBvn
