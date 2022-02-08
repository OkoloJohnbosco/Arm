import Button from 'components/button/Button'
import FormBuilder from 'components/form'
import { FormInputFieldConfigType, FormInputType } from 'components/form/type'
import TextSkeleton from 'components/skeleton/TextSkeleton'
import SubHeading from 'components/typography/SubHeading'
import Upload from 'components/upload'
import { formatRelative } from 'date-fns'
import React from 'react'

const config: FormInputFieldConfigType[] = [
	{
		id: 'bank_name',
		label: 'Bank Name',
		required: false,
		type: FormInputType.Option,
	},
	{
		id: 'account_numbers',
		label: 'Account Number',
		required: true,
		type: FormInputType.Text,
	},
	{
		id: 'bank_code',
		label: 'Bank Code',
		required: true,
		type: FormInputType.Boolean,
	},
	{
		id: 'bank',
		label: 'Bank Codme',
		required: true,
		type: FormInputType.File,
	},
]

const Test = () => {
	return <></>
}

export default Test
