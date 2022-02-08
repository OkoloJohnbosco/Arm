import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { TransactionType } from 'modules/products/subscription/type'
import querystring from 'querystring'

type InvestmentQueryType = {
	transaction_type: TransactionType
	investment_id: string | number
	start_date: string
	end_date: string
	account_statement: string[]
}

type InvestmentQueryResponseType = {
	account_statement: {
		statement_info: {
			product_name: string
			closing_balance: number
			closing_units: number
			closing_date: string
			total_accrued_income: number
			total_redemption: number
			total_subscription: number
			currency: {
				code: string
				name: string
			}
		}
		document_url: string
		document_binary: string
	}
}

export default ({ enabled = true, ...others }: Partial<InvestmentQueryType> & { enabled?: boolean }) => {
	return useQueryAction<InvestmentQueryResponseType>({
		endpoint: `${ENDPOINTS.API_GET_INVESTMENT_STATEMENT}${others ? `?${querystring.stringify({ ...others })}` : ''}`,
		queryKey: [others],
		enabled,
	})
}
