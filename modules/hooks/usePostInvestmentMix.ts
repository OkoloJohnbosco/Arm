import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { ARMEngageResponseType } from 'lib/types'
import { ProductType } from 'modules/account/types'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'
import { RiskAssessmentStage, RiskProfileQuestionType } from '../investment/riskProfile/assesment/type'
import { InvestmentMixType } from './investment/useApiGetInvestmentMix'

type InvestmentMixPayload = {
	total_investment_amount: number
	duration: number
	duration_unit: string
	products: Array<{ product_id: number; amount_invested: number; investment_percentage: number }>
}

const usePostInvestmentMix = () => {
	return useQueryMutation<InvestmentMixType, InvestmentMixPayload>({
		method: 'POST',
		endpoint: ENDPOINTS.API_POST_INVESTMENT_MIX,
		queryKey: NAMESPACE.GET_RISK_QUESTION,
	})
}

export default usePostInvestmentMix
