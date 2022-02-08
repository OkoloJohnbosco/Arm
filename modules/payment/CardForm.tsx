import { Box, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Input from 'components/input'
import Select from 'components/input/select'
import { colors } from 'lib/theme'
import React, { useState } from 'react'
import { IoWalletOutline } from 'react-icons/io5'
import { paymentOptionConfig } from '../products/subscription/shared/config'
import { CreditCardType } from '../products/subscription/type'
import { PaymentFormProps } from './type'

export enum CARD_FIELDS {
	CARD_NUMBER = 'cardNumber',
	CVV = 'cvv',
	EXPIRY_MONTH = 'expiryMonth',
	EXPIRY_YEAR = 'expiryYear',
	CARD_NAME = 'nameOnCard',
	BILLING_ADDRESS = 'address',
	STATE = 'state',
	COUNTRY = 'country',
	EXPIRES = 'expiry',
	CITY = 'city',
	ZIP = 'zip',
}

// let cardIndex = 0
// export interface CardFormProps {
// 	onSubmit: (card: CreditCardType) => void
// }

const CardForm = (props: PaymentFormProps) => {
	//	const { onComplete, onInititate } = useContext(TransactionPaymentContext)
	const [creditCard, setCreditCard] = useState<CreditCardType>({ cardNumber: '', cvv: '', expiryMonth: '', expiryYear: '' })
	const [expires, setExpires] = useState('')
	//const [cardAuthType, setCardAuthType] = useState<CardAuthType>('UNSET')
	const [authorizeReference, setAuthhorizeReference] = useState<string | undefined>()
	console.log(props, 'CardForm')
	//const creditCards = useFetchCreditCards()

	const onFieldChange = ({ fieldName, value }) => {
		setCreditCard({ ...creditCard, [fieldName]: value })
	}

	const handleSubmitForm = (event) => {
		event.preventDefault()
		// onInititate().then(({ transaction }) => {
		// 	initiateChargeCard
		// 		.mutateAsync({
		// 			...creditCard,
		// 			expiryMonth: expires.split('/')[0],
		// 			expiryYear: expires.split('/')[1],
		// 			cardNumber: creditCard.cardNumber.replaceAll(' ', ''),
		// 			transactionReference: transaction.transactionReference,
		// 		})
		// 		.then((response) => {
		// 			const { authType, reference } = getAuthType(response)

		// 			if (authType === 'NONE' || authType === 'UNSET') {
		// 				onComplete(response)
		// 			} else {
		// 				setAuthhorizeReference(reference)
		// 				setCardAuthType(authType)
		// 			}
		// 		})
		// })
	}

	const handleCardNumberChange = (value: string) => {
		console.log(value, creditCard.cardNumber)
		if (value.length < creditCard.cardNumber?.length) {
			onFieldChange({ fieldName: CARD_FIELDS.CARD_NUMBER, value })
			return
		}
		const r = value.replace(/[^\d]+/g, '').replace(/(\d{4})/gi, '$1 ')
		console.log(r)
		onFieldChange({ fieldName: CARD_FIELDS.CARD_NUMBER, value: r })
	}

	const handleDateChange = (value) => {
		if (value.length < expires.length) {
			setExpires(value)
			return
		}
		const r = value.replace(/[^\d]+/g, '').replace(/(\d{2})/gi, '$1/')
		console.log(r)
		setExpires(r.replace(/(\d{2}\/\d{2})(.*)/gi, '$1'))
	}

	const invalidDate = !/^[\d]{2}\/[\d]{2}$/.test(expires) && expires.length > 0

	return (
		<StackCard
			onSubmit={(event) => {
				event.preventDefault()
				props.onComplete?.()
				//	onNext()
				// initiateInvestmentData && onComplete(initiateInvestmentData)
			}}
			background="neutral.0"
			as="form"
			flex={6}
			px={0}
			py={6}
			//	px={{ md: 8, base: 4 }}
		>
			<Stack>
				<Input
					//	icon={inputIcons.creditCard}
					placeholder="xxxx xxxx xxxx xxxx"
					//className="masked"
					autoComplete="off"
					name="credit card"
					type="tel"
					id="cc"
					pattern="\d{4} \d{4} \d{4} \d{4}"
					isRequired
					title="Card Number"
					//data-placeholder="Card Number"
					//	type="number"
					value={creditCard[CARD_FIELDS.CARD_NUMBER]}
					onChange={({ target }) => handleCardNumberChange(target.value)}
				/>

				<Stack spacing={4} direction="row">
					<Input
						//icon={inputIcons.calendar}
						isRequired
						title="Date"
						id="expiration"
						//type="date"
						placeholder="MM/YY"
						//className="masked"
						// 	data-placeholder="Card Date"
						pattern="(1[0-2]|0[1-9])\/\d\d"
						value={expires}
						error={invalidDate ? 'Enter Date in format MM/YY' : undefined}
						// onChange={({ target }) => expiryMask(target.value)}
						onChange={({ target }) => handleDateChange(target.value)}
					/>

					<Input
						//icon={inputIcons.secure2}
						isRequired
						autoComplete="off"
						type="password"
						title="CVV"
						placeholder="xxx"
						value={creditCard[CARD_FIELDS.CVV]}
						onChange={({ target }) => {
							const value = target.value
							if (value.length < 4 && /^\d*$/.test(value)) {
								onFieldChange({ fieldName: CARD_FIELDS.CVV, value })
							}
						}}
					/>
				</Stack>
			</Stack>
			<Button type="submit" looks="primary">
				Make Payment
			</Button>
		</StackCard>
	)
}

export default React.memo(CardForm)
