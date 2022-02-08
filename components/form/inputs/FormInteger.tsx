import Text from 'components/input/text'
import React, { useContext } from 'react'
import { FormBuilderContext, InputFieldPropType } from '../type'

const FormInteger = (fieldConfig: InputFieldPropType) => {
	const formContext = useContext(FormBuilderContext)
	const { setFieldValueOnChange } = fieldConfig.settings || {}

	const onChange = ({ target }) => {
		formContext.onInputChange({
			id: fieldConfig.id,
			value: setFieldValueOnChange?.({ value: target.value, fieldConfig, context: formContext }) || target.value,
		})
	}
	return (
		<Text
			isRequired={fieldConfig.required}
			type="number"
			name={fieldConfig.id}
			title={fieldConfig.label}
			value={formContext.inputValues[fieldConfig.id]}
			onChange={onChange}
			{...(typeof fieldConfig.layout === 'function' ? fieldConfig.layout({ fieldConfig, formContext }) : fieldConfig.layout)}
		/>
	)
}

export default FormInteger
