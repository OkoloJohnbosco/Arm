import { useToast, Stack, VStack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import { StackCard } from 'components/card'
import FormBuilder from 'components/form'
import { FormInputFieldConfigType, FormInputType } from 'components/form/type'
import { normalizeFormInputValues } from 'components/form/util'
import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'

import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { ENDPOINTS, getEngageResourseUrl } from 'constant'
import { colors } from 'lib/theme'
import useApiCreateAccountHolder from 'modules/hooks/account/useApiCreateAccountHolder'
import useApiListRelationship from 'modules/hooks/account/useApiListRelationship'
import useKycContext from 'modules/hooks/kyc/useKycContext'
import { KycAccountHolderType, KycProps } from 'modules/kyc/type'
import React, { useState } from 'react'
import { BiChurch } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { IoPersonOutline } from 'react-icons/io5'
import { RiBankLine } from 'react-icons/ri'

const genderOptions = [
	{
		name: 'Female',
		id: 1,
		code: 'Female',
	},
	{
		name: 'Male',
		id: 2,
		code: 'Male',
	},
].map((option) => ({ value: option.id, label: option.name, option }))
const configFields: FormInputFieldConfigType[] = [
	{
		id: 'title_id',
		label: 'Title',
		required: true,
		type: FormInputType.Option,
		misc: {
			option_url: getEngageResourseUrl(ENDPOINTS.API_LIST_USER_TITLE),
			// options: ['Mr', 'Mrs', 'Miss', 'Master'].map((option) => ({ value: option, label: option, option })),
		},
	},
	{
		id: 'first_name',
		label: 'First Name',
		required: true,
		type: FormInputType.Text,
	},
	{
		id: 'last_name',
		label: 'Last Name',
		required: true,
		type: FormInputType.Text,
	},
	{
		id: 'other_names',
		label: 'Other Names',
		required: true,
		type: FormInputType.Text,
	},
	{
		id: 'gender_id',
		label: 'Gender',
		required: true,
		type: FormInputType.Option,
		misc: {
			options: genderOptions,
			// option_url: getEngageResourseUrl(ENDPOINTS.API_LIST_GENDER),
		},
	},
	{
		id: 'marital_status_id',
		label: 'Marital Status Name',
		required: true,
		type: FormInputType.Option,
		misc: {
			option_url: getEngageResourseUrl(ENDPOINTS.API_LIST_MARITAL_STATUS),
		},
	},
	{
		id: 'date_of_birth',
		label: 'Date of Birth',
		required: true,
		type: FormInputType.Date,
	},

	{
		id: 'place_of_birth',
		label: 'Place of Birth',
		required: true,
		type: FormInputType.Text,
	},
	{
		id: 'relationship_id',
		label: 'Relationship',
		required: true,
		type: FormInputType.Option,
		misc: {
			// options: genderOptions,
			option_url: getEngageResourseUrl(ENDPOINTS.API_LIST_RELATIONSHIP),
			// options: ['Father', 'Mother', 'Brother', 'Sister', 'Wife', 'Husband', 'Son', 'Daughter', 'Uncle', 'Aunty', 'Nephew', 'Niece'].map((option) => ({ value: option, label: option, option })),
		},
	},
]
const layoutMatrics = [[{ id: 'title' }, { id: 'first_name' }]]

type Props = {
	holder?: KycAccountHolderType
}
const AccountHolderForm = ({ controller, holder }: KycProps & Props) => {
	const { refetchKyc } = useKycContext()
	const [form, setForm] = useState()
	const toast = useToast()
	const createAccountHolder = useApiCreateAccountHolder(controller.getParentUniqueId() as string)

	console.log(createAccountHolder, 'createAccountHolder')
	return (
		<Stack
			onSubmit={(event) => {
				event.preventDefault()
				createAccountHolder
					.mutateAsync(normalizeFormInputValues(form, configFields).reduce((accum, { id, value }) => ({ ...accum, [id]: value }), {}))
					.then((res) => {
						console.log(res)
						toast({
							title: `${res.data.response_message}`,
							status: 'success',
							duration: 4000,
							position: 'top-right',
							isClosable: true,
						})
					})
					.then(refetchKyc)
			}}
			background={colors.white}
			spacing={8}
			as="form"
			flex={6}
			p="0"
		>
			<Stack>
				{/* <Caption alt>{`${holder?.first_name} ${holder?.last_name}`}</Caption> */}
				<Caption alt>Add Account Holder</Caption>
				<Small alt> Please answer a few more questions for me</Small>
			</Stack>
			<FormBuilder
				onFormInputChange={setForm}
				//inputFieldSettings={inputFieldSettings}
				pageSize={6}
				inputFieldConfigs={configFields}
				layoutMarics={layoutMatrics}
			/>

			<Button type="submit" looks="primary" isLoading={createAccountHolder.isLoading}>
				Add Account Holder
			</Button>
		</Stack>
	)
}

export default AccountHolderForm
