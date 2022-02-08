import { Stack, HStack, Flex, VStack } from '@chakra-ui/react'
import Divider from 'components/divider'
import Money from 'components/money'
import Body from 'components/typography/Body'
// import Heading from 'components/typography/Heading'
// import SubHeading from 'components/typography/SubHeading'
import Upload from 'components/input/file'
import { colors } from 'lib/theme'
import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { Button } from 'components/button'
import Small from 'components/typography/Small'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import useInvestmentMix from 'modules/hooks/investment/useApiGetInvestmentMix'
import { PaymentFormProps } from './type'
import Caption from 'components/typography/Caption'
import useApiCreateInvestmentPaymentSubscription, { useInvestmentPaymentVerification } from '../hooks/useInvestmentSubscriptionPayment'

const UploadComponent = (file: any) => {
	return (
		<Flex p={4} rounded="md" background={colors['neutral-50']} align="center" justify="center">
			<VStack spacing={0}>
				<AiOutlineCamera size={24} />
				<Body variant="semibold13">Click to upload</Body>
			</VStack>
		</Flex>
	)
}

const BankTransfer = (props: PaymentFormProps) => {
	const mixId = useNextQueryParam('mixId')
	const subscription = useApiCreateInvestmentPaymentSubscription()
	const [amount, setAmount] = React.useState<number>(0)

	//	const { value, isFetching } = useInvestmentMix({ mixId })
	console.log(props, 'Bank Transfer')

	React.useEffect(() => {
		const redirect_url = `${location?.origin}`

		subscription
			.mutateAsync({ transaction_reference: props.reference, redirect_url })
			.then((res) => {
				setAmount(res.data.data.subscription_payment.amount)
				console.log(res, 'inside bank transfer')
			})
			.catch(() => console.log('Failed'))
	}, [])
	return (
		<Stack
			spacing={4}
			align="center"
			as="form"
			onSubmit={(e) => {
				e.preventDefault()
				props.onComplete?.()
			}}
		>
			<Stack align="center">
				<Small>Make Payment to</Small>
				<Caption alt>ARM Project Coroperation</Caption>
				<HStack>
					<Body variant="semibold13"> 01234567890 </Body>
					<Body variant="regular13">Access Bank PLC</Body>
				</HStack>
				<HStack>
					<Body>Amount:</Body>
					<Money currency="NGN" variant="semibold16">
						{amount === 0 ? '****' : amount}
						{/* {value?.customer_investment.total_investment_amount} */}
					</Money>
				</HStack>
			</Stack>
			<Divider mb={4} />
			<Upload
				title="Upload Payment Receipt"
				isRequired
				containerStyle={{ w: 'full', p: -1, align: 'center', justify: 'center' }}
				previewComp={UploadComponent}
				accept={[]}
			/>
			<Button type="submit" w="full" alt size="sm">
				I made Payment
			</Button>
		</Stack>
	)
}

export default BankTransfer
