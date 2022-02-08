import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { TransactionType } from 'modules/products/subscription/type'

export type CreateInvestmentFundPayloadProps = {
	product_id: number
	amount: number
}

export type FundInvestmentResponseType = {
	investment_subscription: {
		transaction_type: {
			name: string
			id: number
			code: TransactionType
		}
		id: number
		transaction_reference: string
		transaction_entry: {
			name: string
			id: number
		}
		transaction_status: {
			name: string
			id: number
		}
		purpose_of_transaction: string
		narration?: string
		amount: number
		transaction_mode: {
			name: string
			id: number
		}
	}
}
export default () => {
	return useQueryMutation<FundInvestmentResponseType, CreateInvestmentFundPayloadProps>({
		method: 'POST',
		endpoint: ENDPOINTS.API_FUND_INVESTMENT,
	})
}
