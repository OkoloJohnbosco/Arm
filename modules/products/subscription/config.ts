import { PAGES, PATHS } from 'constant'
import { stringify } from 'querystring'

import { ProductPaymentType, InvestmentSubscriptionStage } from './type'

type Props = {
	nextStage?: InvestmentSubscriptionStage
	transactionReference?: string
	mixId?: string
	responseCode?: string
}

export const getProductPaymentUrl = (props: Props & ProductPaymentType) => {
	const stage = props.nextStage || getStageFromResponseCode(props.responseCode)
	const {
		// investment_subscription: { transaction_reference },
		mixId,
	} = props
	const query = stringify({ stage, mixId })
	return `${PAGES.INVESTMENT_SUBSCRIPTION}?${query}`
}

export const getStageFromResponseCode = (code?: string) => {
	switch (code) {
		case 'S15':
			return InvestmentSubscriptionStage.Payment

		default:
			return undefined
	}
}
