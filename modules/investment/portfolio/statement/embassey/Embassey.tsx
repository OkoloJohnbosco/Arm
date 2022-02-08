import { Stack, useToast } from '@chakra-ui/react'
import { Button } from 'components/button'
import SubHeading from 'components/typography/SubHeading'
import React, { useEffect, useState } from 'react'
import { PrintInvestmentProps } from '..'
import FormBuilder from 'components/form'
import { FormInputFieldConfigType, FormInputType } from 'components/form/type'
import { ENDPOINTS, getEngageResourseUrl } from 'constant'
import Success from 'modules/auth/signup/Success'
import LetterSent from './LetterSent'
import { FormBuilderUtil } from 'components/form/util'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import useApiGetSelfServicePayment from 'modules/hooks/account/useApiGetSelfServicePayment'
import useBroadcastChannel from 'lib/hooks/useBroadcastChannel'
import { useInvestmentPaymentVerification } from 'modules/hooks/useInvestmentSubscriptionPayment'

const sendToEmbasseyForm: FormInputFieldConfigType[] = [
	{
		id: 'passport_number',
		type: FormInputType.Text,
		required: false,
		label: 'Passport Number',
	},
	{
		id: 'attention_name',
		type: FormInputType.Text,
		required: false,
		label: 'Attention Name',
	},

	// {
	// 	id: 'is_pickup_option',
	// 	type: FormInputType.Boolean,
	// 	required: false,
	// 	label: 'Is Pickup Option ?',
	// },
	// {
	// 	id: 'tracking_id',
	// 	type: FormInputType.Text,
	// 	required: false,
	// 	label: 'Tracking Id',
	// },

	{
		id: 'travel_start_date',
		type: FormInputType.Date,
		required: true,
		label: 'Travel Start Date',
	},
	{
		id: 'travel_end_date',
		type: FormInputType.Date,
		required: true,
		label: 'Travel End Date',
	},
	// {
	// 	id: 'is_letter_option',
	// 	type: FormInputType.Boolean,
	// 	required: false,
	// 	label: 'Is Letter Option ?',
	// },

	// {
	// 	id: 'submit_button',
	// 	type: 'button',
	// 	required: true,
	// 	label: 'Send Statement',
	// 	misc: {
	// 		post_url: getEngageResourseUrl(ENDPOINTS.API_SEND_TO_EMBASSEY),
	// 	},
	// },
]

const layoutMatrics = [
	[
		// { id: 'is_letter_option', layout: { layoutDirection: 'horizontal' } },
		// { id: 'is_pickup_option', layout: { layoutDirection: 'horizontal' } },
	],
]

type TransactionRefProps = {
	transaction_reference: string
	authorization_url: string
}

const Embassey = () => {
	const paymentRedirectChannel = useBroadcastChannel('BROADCAST_PAYMENT_REDIRECT')
	const [form, setForm] = useState()
	const [embasseyResponse, setEmbasseyResponse] = useState()
	const getPaymentService = useApiGetSelfServicePayment()
	const [transactionRef, setTransactionRef] = useState<TransactionRefProps | null>(null)
	const [isPaymentMade, setIsPaymentMade] = useState<number>(1)
	const toast = useToast()
	const verifyPayment = useInvestmentPaymentVerification()

	const getPaymentServiceFxn = () => {
		if (transactionRef === null) {
			getPaymentService.mutateAsync({}).then((data) => {
				setTransactionRef(data.data.data.self_service_payment)
			})
		}
	}

	useEffect(() => {
		getPaymentServiceFxn()
	}, [])

	const mutate = useQueryMutation({
		endpoint: getEngageResourseUrl(ENDPOINTS.API_SEND_TO_EMBASSEY),
		method: 'POST',
		isARMEngageAPI: false,
		includeBaseApiHeaders: true,
	})

	const onSubmit = (event) => {
		event.preventDefault()
		console.log('submitted')
		transactionRef === null && getPaymentServiceFxn()

		console.log(transactionRef)
		if (isPaymentMade === 3 && transactionRef) {
			mutate
				.mutateAsync({
					...FormBuilderUtil.from(form, sendToEmbasseyForm).map(),
					transaction_reference: transactionRef,
					tracking_id: '873uenddm',
					is_letter_option: true,
					is_pickup_option: false,
				})
				.then((data) => {
					setEmbasseyResponse(data.data.data.embassy_letter)
				})
		} else {
			setIsPaymentMade(2)
			toast({})
		}
	}

	useEffect(() => {
		if (isPaymentMade === 2 && transactionRef !== null) {
			// const params = `status=no,location=no,toolbar=no,menubar=no
			// 	width=700,height=400,left=100,top=100`
			const paymentWindow = window.open(transactionRef?.authorization_url, 'Payment for Embassy Letter', 'width=300,height=300,left=100,top=100')
			// Focus on the payment window
			// paymentWindow?.parent.focus()
			paymentWindow?.focus()
			// Insert something within the page
			//@ts-ignore
			paymentWindow?.onLoad(() => {
				const html = `<div style="font-size:30px;position:absolute;bottom:40px;left:50%"><button>Welcome!</button></div>`
				paymentWindow?.document.body.insertAdjacentHTML('afterbegin', html)
			})
			// paymentRedirectChannel.addEventListener('message', (res) => {
			// payWindow?.close()
			// setPaymentStatus(false)
			// verifyPayment.mutateAsync({ transaction_reference: transactionReference })
			// console.log('Messsage received', res)
			// })
			// setPaymentWindow(payWindow)
			// setPaymentStatus(true)
		}
	}, [isPaymentMade, transactionRef])

	//  ifOnElse={isPaymentMade === 2} elseThen={<Redirect reference={transactionRef} />
	return !embasseyResponse ? (
		<Stack spacing="10" as="form" onSubmit={(E) => E.preventDefault()}>
			<SubHeading>{''}</SubHeading>
			<FormBuilder layoutMarics={layoutMatrics} pageSize={9} onFormInputChange={setForm} inputFieldConfigs={sendToEmbasseyForm} />

			<Button
				w="full"
				isLoading={mutate.isLoading}
				//isRequired={fieldConfig.required}
				onClick={onSubmit}
				type="submit"
				size="md"
			>
				Send to Embassey
			</Button>
		</Stack>
	) : (
		<LetterSent data={embasseyResponse} />
	)
}
export default React.memo(Embassey)

// import { Stack } from '@chakra-ui/react'
// import { Button } from 'components/button'
// import SubHeading from 'components/typography/SubHeading'
// import React, { useEffect, useState } from 'react'
// import { PrintInvestmentProps } from '..'
// import FormBuilder from 'components/form'
// import { FormInputFieldConfigType, FormInputType } from 'components/form/type'
// import { ENDPOINTS, getEngageResourseUrl } from 'constant'
// import Success from 'modules/auth/signup/Success'
// import LetterSent from './LetterSent'
// import { FormBuilderUtil } from 'components/form/util'
// import useQueryMutation from 'lib/hooks/useQueryMutation'
// import useApiGetSelfServicePayment from 'modules/hooks/account/useApiGetSelfServicePayment'

// const sendToEmbasseyForm: FormInputFieldConfigType[] = [
// 	{
// 		id: 'passport_number',
// 		type: FormInputType.Text,
// 		required: false,
// 		label: 'Passport Number',
// 	},
// 	{
// 		id: 'attention_name',
// 		type: FormInputType.Text,
// 		required: false,
// 		label: 'Attention Name',
// 	},

// 	// {
// 	// 	id: 'is_pickup_option',
// 	// 	type: FormInputType.Boolean,
// 	// 	required: false,
// 	// 	label: 'Is Pickup Option ?',
// 	// },
// 	// {
// 	// 	id: 'tracking_id',
// 	// 	type: FormInputType.Text,
// 	// 	required: false,
// 	// 	label: 'Tracking Id',
// 	// },

// 	{
// 		id: 'travel_start_date',
// 		type: FormInputType.Date,
// 		required: true,
// 		label: 'Travel Start Date',
// 	},
// 	{
// 		id: 'travel_end_date',
// 		type: FormInputType.Date,
// 		required: true,
// 		label: 'Travel End Date',
// 	},
// 	// {
// 	// 	id: 'is_letter_option',
// 	// 	type: FormInputType.Boolean,
// 	// 	required: false,
// 	// 	label: 'Is Letter Option ?',
// 	// },

// 	// {
// 	// 	id: 'submit_button',
// 	// 	type: 'button',
// 	// 	required: true,
// 	// 	label: 'Send Statement',
// 	// 	misc: {
// 	// 		post_url: getEngageResourseUrl(ENDPOINTS.API_SEND_TO_EMBASSEY),
// 	// 	},
// 	// },
// ]

// const layoutMatrics = [
// 	[
// 		// { id: 'is_letter_option', layout: { layoutDirection: 'horizontal' } },
// 		// { id: 'is_pickup_option', layout: { layoutDirection: 'horizontal' } },
// 	],
// ]

// const Embassey = (props: PrintInvestmentProps) => {
// 	const [form, setForm] = useState()
// 	const [embasseyResponse, setEmbasseyResponse] = useState()
// 	const getPaymentService = useApiGetSelfServicePayment()
// 	const [transactionRef, setTransactionRef] = useState<string | null>(null)

// 	const getPaymentServiceFxn = () => {
// 		getPaymentService.mutateAsync({}).then((data) => {
// 			console.log(data.data.data.self_service_payment.transaction_reference)
// 			setTransactionRef(data.data.data.self_service_payment.transaction_reference)
// 		})
// 	}

// 	React.useEffect(() => {
// 		getPaymentServiceFxn()
// 	}, [])

// 	const mutate = useQueryMutation({
// 		endpoint: getEngageResourseUrl(ENDPOINTS.API_SEND_TO_EMBASSEY),
// 		method: 'POST',
// 		isARMEngageAPI: false,
// 		includeBaseApiHeaders: true,
// 	})

// 	const onSubmit = (event) => {
// 		event.preventDefault()
// 		console.log('submitted')

// 		getPaymentServiceFxn()

// 		mutate
// 			.mutateAsync({
// 				...FormBuilderUtil.from(form, sendToEmbasseyForm).map(),
// 				transaction_reference: transactionRef,
// 				tracking_id: '873uenddm',
// 				is_letter_option: true,
// 				is_pickup_option: false,
// 			})
// 			.then((data) => {
// 				setEmbasseyResponse(data.data.data.embassy_letter)
// 				console.log(data.data.data.embassy_letter)
// 			})
// 	}

// 	return !embasseyResponse ? (
// 		<Stack spacing="10" as="form" onSubmit={(E) => E.preventDefault()}>
// 			<SubHeading>{''}</SubHeading>
// 			<FormBuilder layoutMarics={layoutMatrics} pageSize={9} onFormInputChange={setForm} inputFieldConfigs={sendToEmbasseyForm} />

// 			<Button
// 				w="full"
// 				isLoading={mutate.isLoading}
// 				//isRequired={fieldConfig.required}
// 				onClick={onSubmit}
// 				type="submit"
// 				size="md"
// 			>
// 				Send to Embassey
// 			</Button>
// 		</Stack>
// 	) : (
// 		<LetterSent data={embasseyResponse} />
// 	)
// }
// export default React.memo(Embassey)
