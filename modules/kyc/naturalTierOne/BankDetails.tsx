import { Box, Stack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import { StackCard } from 'components/card'
import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import useApiPostKyc from 'modules/hooks/kyc/useApiPostKyc'
import useKycContext from 'modules/hooks/kyc/useKycContext'
import useApiListBank, { BankType } from 'modules/hooks/useApiListBank'
import React, { useMemo, useState } from 'react'
import { AiOutlineBank } from 'react-icons/ai'
import { RiBankLine } from 'react-icons/ri'
import { KycProps } from '../type'

enum Field {
	BankCode = 'bank_code',
	BankName = 'bank_name',
	AccountNumber = 'account_number',
}

const BankDetails = ({ controller, onComplete: onCompleteStage }: KycProps) => {
	const [accountNumber, setAccountNumber] = useState('')
	const [bankOption, setBankOption] = useState<OptionType<BankType>>()
	const { value } = useApiListBank()
	const stage = controller.getPendingStage()
	const bankOptions = useMemo(() => value?.banks.map((option) => ({ value: option.bank_code, label: option.bank_name, option })), [
		value?.banks.length,
	])
	const postKyc = useApiPostKyc()
	const { refetchKyc } = useKycContext()
	return (
		<Stack
			onSubmit={(event) => {
				event.preventDefault()
				postKyc
					.mutateAsync({
						customer_kyc: [
							{
								unique_code: stage?.unique_id as string,
								stages: [
									{
										stage: stage?.stage.code as any,
										data: [{ [Field.AccountNumber]: accountNumber }, { [Field.BankCode]: bankOption?.value }],
									},
								],
							},
						],
					})
					.then(refetchKyc)
			}}
			background={colors.white}
			spacing={8}
			as="form"
			flex={6}
			p="0"

			//	px={{ md: 8, base: 4 }}
		>
			<Caption alt textAlign="center">
				{stage?.stage.name}
			</Caption>
			<Stack>
				<Caption alt>{`${stage?.first_name} ${stage?.last_name}`}</Caption>
				<Small alt> Please answer a few more questions for me</Small>
			</Stack>
			<Stack>
				<Box position="relative">
					<Select
						//	isRequired
						name={Field.BankCode}
						dropDownMatchContainer
						onChange={(option) => setBankOption(option)}
						options={bankOptions}
						icon={{ iconComp: AiOutlineBank }}
						value={bankOption}
						title="Bank Name"
					/>
				</Box>
				<Input
					name={Field.AccountNumber}
					type="number"
					isRequired
					value={accountNumber}
					onChange={({ target }) => setAccountNumber(target.value)}
					icon={{ iconComp: RiBankLine }}
					title="Account Number"
				/>
			</Stack>
			<Button size="sm" type="submit" looks="primary" isLoading={postKyc.isLoading}>
				Continue
			</Button>
		</Stack>
	)
}

export default BankDetails
