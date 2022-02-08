import { StackCard } from 'components/card'
import useInvestmentSubscription from 'modules/hooks/investment/useApiPostInvestmentSubscription'
import Kyc from 'modules/kyc'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { getProductPaymentUrl } from '../config'
import ProcessWrapper from '../shared/ProcessWrapper'
import { InvestmentProcessContext, InvestmentSubscriptionStage, TransactionType } from '../type'

const SubscriptionKyc = () => {
	const investmentSubscription = useInvestmentSubscription()
	const router = useRouter()
	const { mixId, investmentMix } = useContext(InvestmentProcessContext)

	const onComplete = () => {
		investmentSubscription
			.mutateAsync({
				customer_investment_id: Number(mixId),
				transaction_type: TransactionType.Subscription,
			})
			.then(({ data: { response_code, data } }) => {
				console.log(response_code)
				switch (response_code) {
					case 'S15':
						router.push(getProductPaymentUrl({ mixId, responseCode: response_code, ...data }))
						return
					case 'S39':
						router.push(getProductPaymentUrl({ mixId, nextStage: InvestmentSubscriptionStage.Kyc, responseCode: response_code, ...data }))
						break
					case 'E18':
						router.push(getProductPaymentUrl({ mixId, nextStage: InvestmentSubscriptionStage.Kyc, responseCode: response_code, ...data }))
					//onNextStep()
				}
			})
	}

	return (
		<ProcessWrapper>
			<StackCard>
				<Kyc onComplete={onComplete} enabled amount={199999} />
			</StackCard>
		</ProcessWrapper>
	)
}
export default SubscriptionKyc
