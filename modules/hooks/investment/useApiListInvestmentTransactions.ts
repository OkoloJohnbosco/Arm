import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { TransactionType } from 'modules/products/subscription/type'
import querystring from 'querystring'

export type InvestmentTransactionHistoryType = {
	transaction_date: string
	transaction_type: TransactionType
	amount: number
	units: number
	unit_price: number
	fund_code: string
	market_value: number
	description: string
}

type Props = {
	investmentId: string
	query?: any
}
export default (props: Props) => {
	return useQueryAction<{ transaction_history: InvestmentTransactionHistoryType[] }>({
		endpoint: ENDPOINTS.API_LIST_INVESTMENT_TRANSACTION_HISTORY(props?.investmentId, querystring.stringify(props.query)),
		enabled: !!props.investmentId,
		queryKey: [props.investmentId, props.query],
	})
}
