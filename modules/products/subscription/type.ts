import { OptionType } from 'components/input/select'
import { InvestmentMixType } from 'modules/hooks/investment/useApiGetInvestmentMix'
import React from 'react'
import { KYCStageType } from '../../kyc/type'

export type InitiateInvestmentType = {
	totalInvestmentAmount: number
	investmentFrequencyUnit?: OptionType
	investmentDuration?: OptionType
	frequencyAmount?: number
}

type InvestmentProcessContextType = {
	// onNextStep: (stage?: InvestmentSubscriptionStage) => void
	mixId?: number
	investmentMix?: InvestmentMixType
}

export const InvestmentProcessContext = React.createContext<InvestmentProcessContextType>({} as any)

export enum InvestmentSubscriptionStage {
	Mix = 'mix',
	Kyc = 'kyc',
	Payment = 'payment',
}

export enum TransactionType {
	'Subscription' = 'SUBSCRIPTION',
	'Redemption' = 'REDEMPTION',
}

export type CreditCardType = {
	cardNumber: string
	expiryMonth: string
	expiryYear: string
	cvv: string
}

// export type ProductPaymentType = {
// 	customer_investment_product: {
// 		subscription: {
// 			transaction_entry?: any
// 			transaction_reference: string
// 			transaction_mode?: string
// 			narration?: string
// 			payment_reference: string
// 			transaction_type?: string
// 			purpose_of_transaction?: null
// 			transaction_status?: null
// 			amount: number
// 			id?: number
// 		}
// 	}
// }

export type ProductPaymentType = {
	investment_subscription: {
		purpose_of_transaction?: string
		transaction_entry: {
			id: number
			name: string
		}
		amount: number
		payment_reference?: string
		transaction_reference: string
		narration?: string
		id: number
		transaction_type: {
			id: number
			name: string
		}
		transaction_status: {
			id: number
			name: string
		}
		transaction_mode: {
			id: number
			name: string
		}
	}
}
