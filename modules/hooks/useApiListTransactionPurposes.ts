import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { ProductType } from 'modules/account/types'
import { TransactionType } from 'modules/products/subscription/type'

export type TransactionReasonType = {
	priority: number
	id: number
	description?: string
	name: string
	code: 'OTHERS'
}
export default (transactionType: TransactionType) => {
	return useQueryAction<{ transaction_reasons: Array<TransactionReasonType> }>({
		endpoint: ENDPOINTS.API_TRANSACTION_REASONS(transactionType),
		queryKey: [transactionType],
	})
}
