import { ENDPOINTS } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { TransactionType } from '../products/subscription/type'

type InvestmentSubscriptionPayload = {
	transaction_reference: string
	redirect_url: string
}

type InvestSubscriptionResponse = {
	subscription_payment: {
		transaction_reference: string
		date_initiated: string
		transaction_mode: {
			name: string
			id: number
		}
		id: number
		purpose_of_transaction?: string
		transaction_status: {
			name: string
			id: number
		}
		narration?: string
		transaction_entry: {
			name: string
			id: number
		}
		amount: number
		date_completed: string
		transaction_type: {
			name: TransactionType
			id: number
		}
		authorization_url: string
	}
}

const useApiCreateInvestmentPaymentSubscription = () => {
	return useQueryMutation<InvestSubscriptionResponse, InvestmentSubscriptionPayload>({
		method: 'POST',
		endpoint: ENDPOINTS.API_INVESTMENT_SUBSCRIPTION_PAYMENT_INITIATE,
		queryKey: ENDPOINTS.API_INVESTMENT_SUBSCRIPTION_PAYMENT_INITIATE,
	})
}

export const useInvestmentPaymentVerification = () => {
	return useQueryMutation<any, { transaction_reference: string }>({
		method: 'POST',
		endpoint: ENDPOINTS.API_VERIFY_INVESTMENT_PAYMENT,
		queryKey: ENDPOINTS.API_VERIFY_INVESTMENT_PAYMENT,
	})
}

export default useApiCreateInvestmentPaymentSubscription
