import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { ProductType } from 'modules/account/types'

type PortfolioBalanceType = {
	currency: {
		id: number
		name: string
		code: string
	}
	amount: number
}
export type InvestmentBalanceType = {
	name: string
	description: string
	business_id: number
	value: string
	code: string
	balance: PortfolioBalanceType[]
}

export type InvestmentBreakDownType = {
	portfolio_breakdown: InvestmentBalanceType[]
	total_balance: PortfolioBalanceType[]
}

export default () => {
	return useQueryAction<InvestmentBreakDownType>({
		endpoint: ENDPOINTS.API_INVESTMENT_BALANCE,
	})
}
