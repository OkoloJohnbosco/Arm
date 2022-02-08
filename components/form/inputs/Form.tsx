import React, { useContext } from 'react'
import { FormBuilderContext, FormInputFieldConfigType, InputFieldPropType } from '../type'
import FormBuilder from '../index'

export type FileMiscType = {
	fields: Array<FormInputFieldConfigType> | FormInputFieldConfigType
}

const FormSelect = (fieldConfig: InputFieldPropType<FileMiscType>) => {
	const formContext = useContext(FormBuilderContext)
	const { setFieldValueOnChange } = fieldConfig.settings || {}
	const { fields } = fieldConfig.misc || {}

	const onChange = (forms: any) => {
		console.log(forms)
		formContext.onInputChange({
			id: fieldConfig.id,
			value: setFieldValueOnChange?.({ value: forms, fieldConfig, context: formContext }) || forms,
		})
	}
	console.log(fieldConfig.misc?.fields, fieldConfig.misc, fieldConfig)
	return (
		<FormBuilder
			inputInitialValues={formContext.inputInitialValues?.[fieldConfig.id]}
			layoutMarics={formContext?.layoutMarics}
			pageSize={6}
			onFormInputChange={onChange}
			inputFieldConfigs={fields}
		/>
	)
}

export default FormSelect
