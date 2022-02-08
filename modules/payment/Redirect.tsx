// import { Box, Flex, VStack } from '@chakra-ui/react'
// import Modal from 'components/modal'
// import Body from 'components/typography/Body'
// import { BROADCAST_PAYMENT_REDIRECT, PAGES } from 'constant'
// import useBroadcastChannel from 'lib/hooks/useBroadcastChannel'
// import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
// import { colors } from 'lib/theme/theme'
// import { useRouter } from 'next/router'
// import React, { useEffect, useState } from 'react'
// import Loader from 'react-spinners/PulseLoader'
// import useInvestmentPaymentSubscription, { useInvestmentPaymentVerification } from '../../../investment/hooks/useInvestmentSubscriptionPayment'

// export default () => {
// 	const subscription = useInvestmentPaymentSubscription()
// 	const transactionReference = useNextQueryParam('transactionReference')
// 	const channel = useBroadcastChannel(BROADCAST_PAYMENT_REDIRECT)
// 	const [isWaiting, setIsWaiting] = useState(false)
// 	const verifyPayment = useInvestmentPaymentVerification()
// 	const router = useRouter()

// 	useEffect(() => {
// 		//	const confirmPayment = confirm('You will be prompted to make payment')
// 		//	if (confirmPayment) router.push(PAGES.DASHBOARD)
// 		const redirect_url = `${location?.origin}/auth/redirect`
// 		subscription.mutateAsync({ transaction_reference: transactionReference, redirect_url })
// 	}, [transactionReference])

// 	useEffect(() => {
// 		if (subscription.value?.subscription_payment.authorization_url) {
// 			const payWindow = window.open(subscription.value?.subscription_payment.authorization_url)
// 			channel.addEventListener('message', ({ transactionReference, reference }) => {
// 				payWindow?.parent.focus()
// 				payWindow?.close()
// 				setIsWaiting(false)
// 				verifyPayment.mutateAsync({ transaction_reference: transactionReference })
// 				console.log('Messsage received', transactionReference)
// 			})
// 			//	setPaymentWindow(payWindow)
// 			setIsWaiting(true)
// 		}
// 	}, [subscription.value?.subscription_payment.authorization_url])

// 	return (
// 		<Box>

// 			<Modal size="2xl" isOpen={isWaiting} closeOnEsc={false}>
// 				<VStack>
// 					<Body>You will be taken to a payment screen. Test Debugger</Body>
// 					<Loader color={colors['grey-200']} />
// 				</VStack>
// 			</Modal>
// 		</Box>
// 	)
// }

import { Box, Flex, Stack } from '@chakra-ui/react'
import { ButtonVariantType } from 'components/button'
import CupJumbLoader from 'components/animations/cupJumb'
import FormLoading from 'components/animations/formLoading'
import LoadingSpinner from 'components/animations/loadingSpinner'
import SuccessSpinner from 'components/animations/successSpinner'
import Modal from 'components/modal'
import PromptAction from 'components/prompt-action'
import Body from 'components/typography/Body'
import { BROADCAST_PAYMENT_REDIRECT, PAGES } from 'constant'
import useBroadcastChannel from 'lib/hooks/useBroadcastChannel'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from 'react-spinners/PulseLoader'
import useApiCreateInvestmentPaymentSubscription, { useInvestmentPaymentVerification } from '../hooks/useInvestmentSubscriptionPayment'
import { PaymentFormProps } from './type'

enum PaymentStatus {
	AWAIT_BROADCAST_REDIRECT = 'AWAITS_BROADCAST_REDIRECT',
	AWAIT_PROMPT_PAYMENT = 'AWAIT_CONFIRM_PAYMENT',
	AWAIT_VERIFY_REDIRECT = 'AWAIT_VERIFY_REDIRECT',
	PAYMENT_VERIFIED = 'PAYMENT_VERIFIED',
	BUSY = 'BUSY',
	IDLE = 'IDLE',
}

type ProgressDataType = {
	title: string
	description: string
	animation: any
	button?: ButtonVariantType
}
const progressData: { [x in PaymentStatus]: ProgressDataType } = {
	[PaymentStatus.AWAIT_BROADCAST_REDIRECT]: { animation: () => null, title: 'Waiting for Payment', description: '' },
	[PaymentStatus.AWAIT_PROMPT_PAYMENT]: {
		animation: LoadingSpinner,
		title: 'Complete Payment',
		description: 'A new window will open when you click "Make Payment" to complete payment for this subscription',
		button: {
			children: 'Make Payment',
			loadingText: 'Initiating Payment ...',
		},
	},
	[PaymentStatus.AWAIT_VERIFY_REDIRECT]: {
		animation: LoadingSpinner,
		title: 'Verifying Payment Status',
		description: 'Give us a moment while we verify the Status of this Payment',
		button: {
			isDisabled: true,
			children: 'Please Wait ...',
		},
	},
	[PaymentStatus.BUSY]: {
		animation: LoadingSpinner,
		title: 'Initiating Payment',
		description: 'Please wait while we initiate this payment',
		button: {
			// children: 'Please',
			// loadingText: 'Initiating payment...',
		},
	},
	[PaymentStatus.PAYMENT_VERIFIED]: {
		animation: SuccessSpinner,
		title: 'Payment Verified',
		description: 'Hooray! that was successfully verified',
		button: {
			children: 'Goto Dashboard',
			onClick: () => null,
			href: PAGES.DASHBOARD_HOME,
		},
	},

	[PaymentStatus.IDLE]: {
		animation: SuccessSpinner,
		title: 'Did we miss something',
		description: 'That was not supposed to happen, I think we encountered an Error',
		button: {
			children: 'Retry Payment',
			isDisabled: true,
		},
	},
}

const Redirect = ({ reference, onComplete, amount }: PaymentFormProps) => {
	const subscription = useApiCreateInvestmentPaymentSubscription()
	const paymentRedirectChannel = useBroadcastChannel(BROADCAST_PAYMENT_REDIRECT)
	const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.IDLE)
	const verifyPayment = useInvestmentPaymentVerification()
	const [payment, setPaymentWindow] = useState<Window | null>()
	const paymentDataStatus = progressData[paymentStatus]

	useEffect(() => {
		//	const confirmPayment = confirm('You will be prompted to make payment')
		//	if (confirmPayment) router.push(PAGES.DASHBOARD)
		const redirect_url = `${location?.origin}/auth/redirect`
		setPaymentStatus(PaymentStatus.BUSY)
		subscription
			.mutateAsync({ transaction_reference: reference, redirect_url })
			.then(() => {
				setPaymentStatus(PaymentStatus.AWAIT_PROMPT_PAYMENT)
			})
			.catch(() => setPaymentStatus(PaymentStatus.IDLE))
	}, [reference])

	// useEffect(() => {
	// 	if (subscription.value?.subscription_payment.authorization_url) {
	// 		const payWindow = window.open(subscription.value?.subscription_payment.authorization_url)
	// 		channel.addEventListener('message', ({ transactionReference, reference }) => {
	// 			payWindow?.parent.focus()
	// 			payWindow?.close()
	// 			setPaymentStatus(false)
	// 			verifyPayment.mutateAsync({ transaction_reference: transactionReference })
	// 			console.log('Messsage received', transactionReference)
	// 		})
	// 		setPaymentWindow(payWindow)
	// 		setPaymentStatus(true)
	// 	}
	// }, [subscription.value?.subscription_payment.authorization_url])

	const handleMakePayment = (event) => {
		event.preventDefault()
		if (subscription.value?.subscription_payment.authorization_url) {
			const payWindow = window.open(subscription.value?.subscription_payment.authorization_url)
			setPaymentWindow(payWindow)
			paymentRedirectChannel.addEventListener('message', ({ transactionReference, reference }) => {
				payWindow?.parent.focus()
				payWindow?.close()
				setPaymentStatus(PaymentStatus.AWAIT_VERIFY_REDIRECT)
				verifyPayment.mutateAsync({ transaction_reference: transactionReference }).then(({ data }) => {
					setPaymentStatus(PaymentStatus.PAYMENT_VERIFIED)
					onComplete?.(data.data)
				})
			})

			setPaymentStatus(PaymentStatus.AWAIT_BROADCAST_REDIRECT)
		}
	}

	return (
		<Box>
			<PromptAction
				asModal={false}
				size="md"
				isOpen={paymentStatus !== PaymentStatus.IDLE}
				title={paymentDataStatus.title}
				action={{
					primary: {
						isLoading: paymentStatus === PaymentStatus.BUSY,

						onClick: handleMakePayment,
						...paymentDataStatus.button,
					},
				}}
			>
				<Stack spacing="4">
					<Flex alignItems="center" justify="center">
						<paymentDataStatus.animation />
					</Flex>

					<Body>{paymentDataStatus.description}</Body>
				</Stack>
			</PromptAction>
			{/* @ts-ignore */}
			<PromptAction
				size="md"
				isOpen={paymentStatus === PaymentStatus.AWAIT_BROADCAST_REDIRECT}
				title="Waiting for Payment"
				description="Please dont close or refresh this browser window untill you have Completed 
				Paystack payment"
				// action={{
				// 	primary: {
				// 		looks:'primaryOutline',
				// 		isLoading: paymentStatus === PaymentStatus.BUSY,
				// 		children: 'Payment Completed',
				// 	//	onClick: handleMakePayment,
				// 	},
				// }}
			></PromptAction>

			{/* <Modal size="2xl" isOpen={isWaiting} closeOnEsc={false}>
				<VStack>
					<Body>You will be taken to a payment screen. Test Debugger</Body>
					<Loader color={colors['grey-200']} />
				</VStack>
			</Modal> */}
		</Box>
	)
}

export default Redirect
