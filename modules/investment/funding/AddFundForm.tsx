import { Box, Progress, Stack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import Symbol from 'components/currency/Symbol'
import Divider from 'components/divider'
import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'
import Caption from 'components/typography/Caption'
import SubHeading from 'components/typography/SubHeading'
import { ProductInvestmentType } from 'modules/account/types'
import useApiCreateInvestmentFund, { FundInvestmentResponseType } from 'modules/hooks/investment/useApiCreateInvestmentFund'
import React from 'react'
import { fundSteps } from './config'
import { FundStepType } from './type'

type Props = {
	onComplete: (data: FundInvestmentResponseType) => void
	amount: {
		enabled?: boolean
		value?: number
		onChange: (amount: any) => void
	}
	investment: {
		enabled?: boolean
		value?: ProductInvestmentType
		onChange: (investment: ProductInvestmentType) => void
	}
	investmentOptions?: Array<OptionType<ProductInvestmentType>>
	step: FundStepType
}

const AddFund = (props: Props) => {
	const { amount, investment, investmentOptions, step } = props
	// const investment = useMemo(() => {
	//     for (let business of value?.customer_businesses || []) {
	//         const found = business.products.find((p) => p.id == investmentId)
	//         if (found) return found
	//     }
	// }, [value])
	const createInvestmentFund = useApiCreateInvestmentFund()
	const isFormValid = investment.value && amount.value
	return (
		<Stack
			spacing={8}
			as="form"
			onSubmit={(e) => {
				e.preventDefault()
				createInvestmentFund.mutateAsync({ product_id: investment.value?.id, amount: Number(amount.value) }).then(({ data }) => {
					props.onComplete(data.data)
				})
			}}
		>
			<Stack>
				<SubHeading color="claret.500">{step.title}</SubHeading>

				<Divider />
			</Stack>
			<Stack>
				<Caption>
					Step {fundSteps.length} of {fundSteps?.length}
				</Caption>
				<Progress colorScheme="green" size="sm" rounded="lg" value={(fundSteps.length / step.priority) * 100} isAnimated />
			</Stack>
			<Caption>{step.description}</Caption>
			<Stack>
				{props.investment.enabled && (
					<Box>
						<Select
							isLoading={!investmentOptions?.length}
							value={investment.value?.id}
							color="red"
							options={investmentOptions}
							title="Select Investment Solution"
							onChange={({ option }) => investment.onChange(option)}
						/>
					</Box>
				)}
				{props.amount.enabled && (
					<Box>
						<Input
							renderIcon={<Symbol currency="NGN" />}
							fontWeight="700"
							value={amount.value}
							onChange={({ target }) => amount.onChange(target.value)}
							isRequired
							title="Fund Amount"
							type="number"
							min="0"
						/>
					</Box>
				)}
			</Stack>
			<Box w="full">
				<Button isLoading={createInvestmentFund.isLoading} isDisabled={!isFormValid} w="full" size="md" type="submit">
					Make Payment
				</Button>
			</Box>
		</Stack>
	)
}

export default AddFund
