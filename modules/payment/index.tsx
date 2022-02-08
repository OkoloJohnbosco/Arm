//import useFetchCreditCards from 'modules/transaction/payment-methods/card/hooks/useFetchCreditCards'
import { Box, Stack } from '@chakra-ui/react'
import { Card, StackCard } from 'components/card'
import Select from 'components/input/select'
import Caption from 'components/typography/Caption'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import { InvestmentMixContext } from 'modules/account/types'
import React, { useState } from 'react'
import { IoWalletOutline } from 'react-icons/io5'
import CardForm from './CardForm'
import Redirect from './Redirect'
import BankTransfer from './BankTransfer'
import { PaymentFormProps } from './type'

enum PaymentOptionValue {
	DIRECT_DEBIT = 'DIRECT_DEBIT',
	CREDIT_CARD = 'CREDIT_CARD',
	BANK_TRANSFER = 'BANK_TRANSFER',
}

const paymentOptions: Array<{ value: PaymentOptionValue; label: string }> = [
	{
		value: PaymentOptionValue.DIRECT_DEBIT,
		label: 'Pay Online',
	},
	{
		value: PaymentOptionValue.BANK_TRANSFER,
		label: 'Manual Bank Transfer',
	},
	// {
	// 	value: PaymentOptionValue.DIRECT_DEBIT,
	// 	label: 'Direct Bank Debit',
	// },
]

const Index = (props: PaymentFormProps) => {
	const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0])
	return (
		<Stack>
			<Caption alt letterSpacing={1} mb={6}>
				Payments
			</Caption>
			<Select
				icon={{ iconComp: IoWalletOutline }}
				title="Select payment option"
				//@ts-ignore
				value={paymentMethod}
				onChange={({ option }) => setPaymentMethod(option)}
				dropDownMatchContainer
				options={paymentOptions.map((option) => ({ ...option, option }))}
			/>
			{/* */}
			{paymentMethod.value === PaymentOptionValue.CREDIT_CARD && (
				<CardForm amount={props.amount} reference={props.reference} onComplete={props.onComplete} />
			)}
			{paymentMethod.value === PaymentOptionValue.DIRECT_DEBIT && (
				<Redirect amount={props.amount} reference={props.reference} onComplete={props.onComplete} />
			)}
			{paymentMethod.value === PaymentOptionValue.BANK_TRANSFER && (
				<BankTransfer amount={props.amount} reference={props.reference} onComplete={props.onComplete} />
			)}
		</Stack>
	)
}

export default Index
