import { HStack, Stack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import { StackCard } from 'components/card'
import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import apiListReligions from 'modules/hooks/account/apiListReligions'
import useApiListAccountTypes, { AccountType } from 'modules/hooks/account/useApiListAccountTypes'
import useApiListUserTitle from 'modules/hooks/account/useApiListUserTitle'
import useApiPostKyc from 'modules/hooks/kyc/useApiPostKyc'
import useKycContext from 'modules/hooks/kyc/useKycContext'
import { KycProps } from 'modules/kyc/type'
import React, { useState } from 'react'
import { BiChurch } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { IoPersonOutline } from 'react-icons/io5'
import { RiBankLine } from 'react-icons/ri'
import Switch from 'components/input/switch'
enum Field {
	PlaceOfBirth = 'place_of_birth',
	Title = 'title',
	Gender = 'gender',
	Religion = 'religion',
	NumberOfAccountHolders = 'no_of_joint_account',
	AccountType = 'account_type_id',
	IsAccountMinor = 'is_account_minor',
}

const genderOptions = ['Male', 'Female', 'Transgender', 'Prefer to not mention'].map((option) => ({ value: option, label: option, option }))
const accountHoldersOptions = new Array(20)
	.fill(0)
	.map((option, i) => ({ value: i + 1, label: i + 1 === 1 ? `${i + 1} person` : `${i + 1} person(s)`, option: i + 1 }))

const ParentHolderForm = ({ controller }: KycProps) => {
	const [placeOfBirth, setPlaceOfBirth] = useState('')
	const [titleOption, setTitleOption] = useState<OptionType<string>>()
	const title = useApiListUserTitle()
	const titleOptions = title.value?.titles.map((option) => ({
		value: option.code,
		label: option.name,
		option,
	}))
	const [gender, setGender] = useState<OptionType<string>>()
	const [religionOption, setReligionOption] = useState<OptionType<string>>()
	const religion = apiListReligions()
	const religionOptions = religion.value?.religions.map((option) => ({
		value: option.code,
		label: option.name,
		option,
	}))
	const [accountHolderCount, setAccountHolderCount] = useState<OptionType<number>>(accountHoldersOptions[0])
	const [accountTypeOption, setAccountTypeOption] = useState<OptionType<AccountType>>()
	const [isAminorAccount, setIsAminorAccount] = useState(false)
	const stage = controller.getPendingStage()
	const { refetchKyc } = useKycContext()

	const accountType = useApiListAccountTypes()
	const postKyc = useApiPostKyc()

	const accountTypeOptions = accountType.value?.map((option) => ({ value: option.id, label: option.name, option }))
	//console.log(stage?.stage.code.code)

	const handleChangeAccountIsMinor = (isMinor: boolean) => {
		if (!isMinor && accountTypeOption?.value === 1) {
			console.log(accountHoldersOptions[0])
			setAccountHolderCount(accountHoldersOptions[0])
		}
		setIsAminorAccount(isMinor)
	}

	const handleAccountTypeChange = (option: any) => {
		if (!isAminorAccount && option?.value === 1) {
			setAccountHolderCount(accountHoldersOptions[0])
		}
		setAccountTypeOption(option)
	}

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
										data: [
											{ [Field.Gender]: gender?.value },
											{ [Field.NumberOfAccountHolders]: accountHolderCount?.value },
											{ [Field.Religion]: religionOption?.value },
											{ [Field.Title]: titleOption?.value },
											{ [Field.PlaceOfBirth]: placeOfBirth },
											{ [Field.AccountType]: accountTypeOption?.value },
											{ [Field.IsAccountMinor]: isAminorAccount },
										],
									},
								],
							},
						],
					})
					.then(refetchKyc)
				//onNext()
				// initiateInvestmentData && onComplete(initiateInvestmentData)
			}}
			background={colors.white}
			spacing={8}
			as="form"
			flex={6}
			p="0"

			//	px={{ md: 8, base: 4 }}
		>
			{/* <Box
					onClick={
						//@ts-ignore
						() => onNext()
					}
				>
					Skip
				</Box> */}
			<Caption alt textAlign="center">
				{stage?.stage.name}
			</Caption>
			<Stack>
				<Caption alt>{`${stage?.first_name} ${stage?.last_name}`}</Caption>
				<Small alt> Please answer a few more questions for me</Small>
			</Stack>
			<Stack>
				<Stack spacing="4" direction={{ md: 'row', base: 'column' }}>
					<Select
						isLoading={!titleOptions?.length && title.isFetching}
						isRequired
						name={Field.Title}
						onChange={(option) => setTitleOption(option)}
						options={titleOptions}
						icon={{ iconComp: IoPersonOutline }}
						value={titleOption?.value}
						title="Title"
					/>
					<Select
						isRequired
						name={Field.Gender}
						onChange={(option) => setGender(option)}
						options={genderOptions}
						icon={{ iconComp: BsPeople }}
						value={gender?.value}
						title="Gender"
					/>
				</Stack>

				<Input
					name={Field.PlaceOfBirth}
					isRequired
					value={placeOfBirth}
					onChange={({ target }) => setPlaceOfBirth(target.value)}
					icon={{ iconComp: RiBankLine }}
					title="Birth Place"
					placeholder="Birth Place"
				/>

				<Select
					isLoading={!religionOptions?.length && religion.isFetching}
					isRequired
					name={Field.Religion}
					onChange={(option) => setReligionOption(option)}
					options={religionOptions}
					icon={{ iconComp: BiChurch }}
					value={religionOption?.value}
					title="Religion"
				/>

				<Select
					isLoading={accountType.isFetching}
					isRequired
					name={Field.AccountType}
					onChange={(option) => handleAccountTypeChange(option)}
					options={accountTypeOptions}
					icon={{ iconComp: BsPeople }}
					value={accountTypeOption?.value}
					title="Account Type"
				/>

				<Stack spacing="4" direction={{ md: 'row', base: 'column' }}>
					<Switch
						name="is_account_minor"
						isChecked={isAminorAccount}
						title="Account has a Minor ?"
						onChange={({ target }) => handleChangeAccountIsMinor(target.checked)}
					/>

					<Select
						isDisabled={(!isAminorAccount && accountTypeOption?.value === 1) || (accountTypeOption?.value === 1 && !isAminorAccount)}
						isRequired
						placeholder="How many people on this Account"
						name={Field.NumberOfAccountHolders}
						onChange={(option) => setAccountHolderCount(option)}
						options={accountHoldersOptions}
						icon={{ iconComp: IoPersonOutline }}
						value={accountHolderCount?.value}
						title="Account Holder"
					/>
				</Stack>
			</Stack>
			<Button type="submit" looks="secondary" isLoading={postKyc.isLoading}>
				Continue
			</Button>
		</Stack>
	)
}

export default ParentHolderForm
