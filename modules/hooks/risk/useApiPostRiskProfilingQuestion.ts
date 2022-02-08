import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { ARMEngageResponseType } from 'lib/types'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'
import { RiskAssessmentStage, RiskProfileQuestionType } from '../../investment/riskProfile/assesment/type'

export const useAnswerRiskProfilingQuestion = () => {
	return useQueryMutation<{ stage_questions: RiskProfileQuestionType }, Array<{ question_id: any; option_id: any }>>({
		eventMessage: {
			success: setSuccessMessage(),
			error: setErrorMessage(),
		},
		method: 'POST',
		endpoint: ENDPOINTS.API_ANSWER_RISK_QUESTION,
		queryKey: NAMESPACE.GET_RISK_QUESTION,
	})
}
