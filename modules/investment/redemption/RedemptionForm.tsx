import { Box, Stack } from '@chakra-ui/react'
import Divider from 'components/divider'
import Input from 'components/input'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import SubHeading from 'components/typography/SubHeading'
import useInvestedProducts from 'modules/hooks/investment/useApiListInvestmentsDetails'
import React, { useMemo, useState } from 'react'
import Select, { OptionType } from 'components/input/select'
import Button from 'components/button/Button'
import { ProductInvestmentType } from 'modules/account/types'
import useApiListTransactionPurposes, { TransactionReasonType } from 'modules/hooks/useApiListTransactionPurposes'
import Symbol from 'components/currency/Symbol'
import { TransactionType } from 'modules/products/subscription/type'
import LoadingWrapper from 'components/layout/loading-wrapper'
import useUser from 'modules/account/hooks/useUser'

interface Props {
	onComplete: () => void
	redemptionPurpose: {
		onChange: (option: OptionType) => void
		value?: OptionType<TransactionReasonType>
		otherReason: string
		setOtherReason: (reason: string) => void
	}
	redemptionNarration: {
		onChange: (narration: string) => void
		value: string
	}
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
}

const Redemption = (props: Props) => {
	const { amount, investment, investmentOptions, onComplete: onNext, redemptionNarration, redemptionPurpose } = props
	const transactionPurposes = useApiListTransactionPurposes(TransactionType.Redemption)
	const isFormValid = amount.value && investment.value && redemptionPurpose.value
	const user = useUser()?.login?.user_account.user

	return (
		<LoadingWrapper
			isLoading={
				false
				//!investmentOptions?.length
			}
		>
			<Stack
				spacing={8}
				as="form"
				onSubmit={(e) => {
					e.preventDefault()
					onNext()
				}}
			>
				<Stack>
					<SubHeading color="claret.500">{investment.value?.name}</SubHeading>
					<Divider />
				</Stack>
				<Stack>
					<Body>You are about to Redeem Funds to:</Body>
					<Box bg="#E6E2DD" p="4" rounded="md" w="fit-content">
						{/* <Caption>{investment.value?.summary.account_number}</Caption> */}
						<Caption>{user?.foreign_account_number}</Caption>
						{/* <Body>{investment.value?.summary.account_name}</Body> */}
						<Body>{user?.foreign_account_name}</Body>
					</Box>
				</Stack>
				<Stack>
					{investment.enabled && (
						<Box>
							<Select
								value={investment.value?.id}
								color="red"
								options={investmentOptions}
								title="Select Investment Solution"
								onChange={({ option }) => investment.onChange(option)}
							/>
						</Box>
					)}
					{amount.enabled && (
						<Box>
							<Input
								renderIcon={<Symbol currency="NGN" />}
								fontWeight="700"
								value={amount.value}
								onChange={({ target }) => amount.onChange(target.value)}
								isRequired
								title="Enter Amount"
								type="number"
								min="0"
							/>
						</Box>
					)}
					<Box>
						<Select
							title="Why are you Redeeming this funds"
							isRequired
							isLoading={transactionPurposes.isLoading}
							//@ts-ignore
							value={redemptionPurpose.value?.value}
							options={transactionPurposes.value?.transaction_reasons.map((o) => ({ value: o.id, label: o.name, option: o }))}
							onChange={({ option }) => redemptionPurpose.onChange({ value: option.id, label: option.name, option })}
						/>
					</Box>
					{redemptionPurpose.value?.option?.code === 'OTHERS' && (
						<Box>
							<Input
								onChange={({ target }) => redemptionPurpose.setOtherReason(target.value)}
								value={redemptionPurpose.otherReason}
								isRequired
								title="Add a Personalised Note"
							/>
						</Box>
					)}
				</Stack>
				<Box w="full">
					<Button w="full" size="md" type="submit" isDisabled={!isFormValid}>
						Redeem Funds
					</Button>
				</Box>
			</Stack>
		</LoadingWrapper>
	)
}

export default Redemption
