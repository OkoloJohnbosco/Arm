import Select, { OptionType } from 'components/input/select'
import useQueryAction from 'lib/hooks/useQueryAction'
import React, { useContext } from 'react'
import { FormBuilderContext, FormBuilderContextType, FormInputFieldConfigType, InputFieldPropType } from '../type'
import { expandUrlVariable, FormBuilderUtil } from '../util'

export type SelectMiscType = {
	option_url: string
	options?: OptionType[]
}

type SettingsType = {
	setOptionUrl?: (p: { formContext: FormBuilderContextType; fieldConfig: FormInputFieldConfigType }) => string
}

const FormSelect = (fieldConfig: InputFieldPropType<SelectMiscType, SettingsType>) => {
	const formContext = useContext(FormBuilderContext)

	const { setOptionUrl, setFieldValueOnChange } = fieldConfig.settings || {}
	const optionUrl =
		setOptionUrl?.({ formContext, fieldConfig }) ||
		expandUrlVariable(fieldConfig.misc?.option_url || '', FormBuilderUtil.from(formContext.inputValues, formContext.inputFieldConfigs, true).map())
	// console.log(optionUrl, fieldConfig.misc?.option_url, '>>>>>>>')
	const option = useQueryAction({
		endpoint: optionUrl || '',
		isARMEngageAPI: false,
		includeBaseApiHeaders: true,
		staleTime: Infinity,
		onError: (err) => {
			console.log(err)
		},
	})

	//All Select Option Url must respect return an array that contains at mininum {id,name} key

	const selectOptions: OptionType[] = option.data?.data?.data?.map((option) => ({ option, value: option.id, label: option.name }))

	const onChange = (option: OptionType) => {
		formContext.onInputChange({
			id: fieldConfig.id,
			value: setFieldValueOnChange?.({ value: option, fieldConfig, context: formContext }) || option,
		})
	}

	return (
		<Select
			isLoading={option.isLoading}
			isRequired={fieldConfig.required}
			name={fieldConfig.id}
			title={fieldConfig.label}
			value={formContext.inputValues[fieldConfig.id]}
			onChange={onChange}
			options={selectOptions || fieldConfig.misc?.options}
			{...(typeof fieldConfig.layout === 'function' ? fieldConfig.layout({ fieldConfig, formContext }) : fieldConfig.layout)}
		/>
	)
}

export default FormSelect
