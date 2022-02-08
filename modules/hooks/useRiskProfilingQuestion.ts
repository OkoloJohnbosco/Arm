import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'
import { RiskAssessmentStage, RiskProfileQuestionType } from '../investment/riskProfile/assesment/type'

export const useRiskProfilingQuestion = (assesment: RiskAssessmentStage) => {
	return useQueryAction<{ stage_questions?: RiskProfileQuestionType }>({
		eventMessage: {
			success: setSuccessMessage(),
			error: setErrorMessage(),
		},
		endpoint: ENDPOINTS.API_GET_RISK_QUESTION(assesment),
		queryKey: [NAMESPACE.GET_RISK_QUESTION, assesment],
	})
}
