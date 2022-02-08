import { useContext } from 'react'
import { useToast, Box, HStack, Stack } from '@chakra-ui/react'
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
import FormBuilder from 'components/form'
import { FormBuilderUtil, normalizeFormInputValues } from 'components/form/util'
import SubHeading from 'components/typography/SubHeading'
// import { KycContext } from './Kyc'
// enum Field {
// 	PlaceOfBirth = 'place_of_birth',
// 	Title = 'title',
// 	Gender = 'gender',
// 	Religion = 'religion',
// 	NumberOfAccountHolders = 'no_of_joint_account',
// 	AccountType = 'account_type_id',
// 	IsAccountMinor = 'is_account_minor',
// }

const layoutMatrics = [
	[{ id: 'is_dividend_reinvestible', layout: () => ({ layoutDirection: 'vertial' }) }],
	//[{ id: 'first_name' }, { id: 'last_name' }],
	[{ id: 'is_interested_in_direct_debit', layout: { layoutDirection: 'vertical' } }, { id: 'middle_name' }],
]

// const genderOptions = ['Male', 'Female', 'Transgender', 'Prefer to not mention'].map((option) => ({ value: option, label: option, option }))
// const accountHoldersOptions = new Array(20)
// 	.fill(0)
// 	.map((option, i) => ({ value: i + 1, label: i + 1 === 1 ? `${i + 1} person` : `${i + 1} person(s)`, option: i + 1 }))

const ParentHolderForm = ({ controller, onClose }: KycProps & { onClose?: any }) => {
	// const [placeOfBirth, setPlaceOfBirth] = useState('')
	// const [titleOption, setTitleOption] = useState<OptionType<string>>()
	// const title = useApiListUserTitle()
	// const titleOptions = title.value?.titles.map((option) => ({
	// 	value: option.code,
	// 	label: option.name,
	// 	option,
	// }))
	// const [gender, setGender] = useState<OptionType<string>>()
	// const [religionOption, setReligionOption] = useState<OptionType<string>>()
	// const religion = apiListReligions()
	// const religionOptions = religion.value?.religions.map((option) => ({
	// 	value: option.code,
	// 	label: option.name,
	// 	option,
	// }))
	// const [accountHolderCount, setAccountHolderCount] = useState<OptionType<number>>(accountHoldersOptions[0])
	const [accountTypeOption, setAccountTypeOption] = useState<OptionType<AccountType>>()
	const [isAminorAccount, setIsAminorAccount] = useState(false)
	const [formInput, setFormInput] = useState()
	const stage = controller.getPendingStage()
	const { refetchKyc } = useKycContext()
	const toast = useToast()
	// const { responseMessage, setResponseMessage } = useContext(KycContext)

	// const accountType = useApiListAccountTypes()
	const postKyc = useApiPostKyc()

	// const accountTypeOptions = accountType.value?.account_types.map((option) => ({ value: option.id, label: option.name, option }))
	//console.log(stage?.stage.code.code)

	const handleChangeAccountIsMinor = (isMinor: boolean) => {
		if (!isMinor && accountTypeOption?.value === 1) {
			//setAccountHolderCount(accountHoldersOptions[0])
		}
		setIsAminorAccount(isMinor)
	}

	const handleAccountTypeChange = (option: any) => {
		if (!isAminorAccount && option?.value === 1) {
			//setAccountHolderCount(accountHoldersOptions[0])
		}
		setAccountTypeOption(option)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const builderUtil = FormBuilderUtil.from(formInput, stage?.stage.fields || [])
		const normalizeFormInput = builderUtil.normalizeFormInput()

		if (builderUtil.hasFile()) {
			const formData = new FormData()
			formData.append('stage', stage?.stage.code as string)
			formData.append('unique_code', stage?.unique_id as string)
			normalizeFormInput.forEach((input) => formData.append(input.id, input.value))
			postKyc
				.mutateAsync(formData)
				.then((res) => {
					// console.log(postKyc)
					toast({
						title: `${res.data.response_message}`,
						status: 'success',
						duration: 4000,
						position: 'top-right',
						description: `${stage?.stage.name} updated`,
						isClosable: true,
					})
				})
				.then(() => {
					onClose && onClose()
				})
				.then(refetchKyc)
			return
		}
		postKyc
			.mutateAsync({
				customer_kyc: [
					{
						unique_code: stage?.unique_id as string,
						stages: [
							{
								stage: stage?.stage.code as any,
								data: normalizeFormInput.map(({ value, id }) => ({ [id]: value })),
							},
						],
					},
				],
			})
			.then((res) => {
				toast({
					title: `${res.data.response_message}`,
					status: 'success',
					duration: 4000,
					position: 'top-right',
					description: `${stage?.stage.name} updated`,
					isClosable: true,
				})
			})
			.then(() => {
				onClose && onClose()
			})

			.then(refetchKyc)
	}

	return stage?.stage ? (
		<Stack
			onSubmit={handleSubmit}
			background={colors.white}
			spacing={6}
			as="form"
			flex={6}
			p="0"

			//	px={{ md: 8, base: 4 }}
		>
			<SubHeading>{stage?.stage.name}</SubHeading>

			<Stack>
				<Caption alt>{`${stage?.first_name} ${stage?.last_name}`}</Caption>
				<Small alt> Please answer a few more questions for me</Small>
			</Stack>

			<FormBuilder
				onFormInputChange={setFormInput}
				// inputFieldSettings={inputFieldSettings}
				pageSize={6}
				inputFieldConfigs={stage?.stage.fields}
				layoutMarics={layoutMatrics}
			/>

			<Button type="submit" looks="secondary" isLoading={postKyc.isLoading}>
				Continue
			</Button>
		</Stack>
	) : (
		<Caption alt>All Document Completed</Caption>
	)
}

export default ParentHolderForm
