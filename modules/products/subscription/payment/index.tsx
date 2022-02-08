import StackCard from 'components/card/StackCard'
import LoadingWrapper from 'components/layout/loading-wrapper'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import useInvestmentSubscription from 'modules/hooks/investment/useApiPostInvestmentSubscription'
import Payment from 'modules/payment'
import { PaymentFormProps } from 'modules/payment/type'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ProcessWrapper from '../shared/ProcessWrapper'
import { TransactionType } from '../type'
import Summary from './Summary'

const Index = (props: PaymentFormProps) => {
	const mixId = useNextQueryParam('mixId')
	const investmentSubscription = useInvestmentSubscription()
	const [reference, setReference] = useState()

	useLayoutEffect(() => {
		investmentSubscription
			.mutateAsync({
				customer_investment_id: Number(mixId),
				transaction_type: TransactionType.Subscription,
			})
			//@ts-ignore
			.then(({ data: { _, data } }) => {
				setReference(data?.investment_subscription?.transaction_reference)
			})
	}, [mixId])

	return (
		<ProcessWrapper ReviewComponent={Summary}>
			<LoadingWrapper isLoading={!reference || investmentSubscription.isLoading}>
				<StackCard>
					<Payment reference={reference} />
				</StackCard>
			</LoadingWrapper>
		</ProcessWrapper>
	)
}

export default Index
