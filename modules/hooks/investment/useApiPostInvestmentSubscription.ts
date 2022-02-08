import { ENDPOINTS } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { TransactionType } from '../../products/subscription/type'

type InvestmentSubscriptionPayload = {
	customer_investment_id: number
	transaction_type: TransactionType
}

// type InvestSubscriptionResponse = {
// 	transaction_reference: string
// 	date_initiated: string
// 	transaction_mode: {
// 		name: string
// 		id: number
// 	}
// 	id: number
// 	purpose_of_transaction?: string
// 	transaction_status: {
// 		name: string
// 		id: number
// 	}
// 	narration?: string
// 	transaction_entry: {
// 		name: string
// 		id: number
// 	}
// 	amount: number
// 	date_completed: string
// 	transaction_type: {
// 		name: TransactionType
// 		id: number
// 	}
// 	authorization_url: string
// }

const useInvestmentSubscription = () => {
	return useQueryMutation<any, InvestmentSubscriptionPayload>({
		method: 'POST',
		endpoint: ENDPOINTS.API_INVESTMENT_SUBSCRIPTION,
		queryKey: ENDPOINTS.API_INVESTMENT_SUBSCRIPTION,
	})
}

export default useInvestmentSubscription
