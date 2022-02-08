import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'

export enum RiskProfileValue {
	Very_Low = 'Very_Low',
	Low = 'LOW',
	High = 'High',
	Very_High = 'Very_High',
	Moderate = 'Moderate',
}
export type RiskProfileType = {
	engage_id: string
	score: number
	risk_portfolio: string
	risk_rating: string
	portfolio: {
		value: RiskProfileValue
		rating: string
		point_from: number
		profile: string
		point_to: number
		description: string
	}
}
export const useRiskScore = (engageId?: string) => {
	return useQueryAction<{ risk_profile: RiskProfileType }>({
		eventMessage: {
			success: setSuccessMessage(),
			error: setErrorMessage(),
		},
		//enabled: !!engageId,
		endpoint: ENDPOINTS.API_GET_RISK_SCORE(engageId),
		queryKey: [NAMESPACE.GET_RISK_SCORE, engageId],
	})
}
