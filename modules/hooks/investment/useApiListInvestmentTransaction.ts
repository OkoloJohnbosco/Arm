import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { ProductType } from 'modules/account/types'

export type InvestmentMixType = {
	customer_investment: {
		total_investment_amount: number
		duration: number
		duration_unit: string
		monthly_investment_amount: string
		date_created: string
		id: number
		investment_products: Array<{
			date_created: string
			amount_invested: string
			investment_percentage: number
			product: ProductType
		}>
	}
}

export default (props?: { mixId?: string | number }) => {
	return useQueryAction<InvestmentMixType>({
		endpoint: ENDPOINTS.API_LIST_INVESTMENT_SUBSCRIPTION(props?.mixId),
		queryKey: [props?.mixId],
		//enabled: !!props.mixId,
	})
}
