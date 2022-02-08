import Switct from 'components/input/switch'
import React, { useContext } from 'react'
import { FormBuilderContext, InputFieldPropType } from '../type'

const FormSwitch = (fieldConfig: InputFieldPropType) => {
	const formContext = useContext(FormBuilderContext)
	const { setFieldValueOnChange, layout } = fieldConfig.settings || {}

	const onChange = ({ target }) => {
		formContext.onInputChange({
			id: fieldConfig.id,
			value: setFieldValueOnChange?.({ value: target.checked, fieldConfig, context: formContext }) || target.checked,
		})
	}

	return (
		<Switct
			//isRequired={fieldConfig.required}
			layoutDirection="horizontal"
			name={fieldConfig.id}
			title={fieldConfig.label}
			isChecked={formContext.inputValues[fieldConfig.id]}
			onChange={onChange}
			{...(typeof fieldConfig.layout === 'function' ? fieldConfig.layout({ fieldConfig, formContext }) : fieldConfig.layout)}
		/>
	)
}

export default FormSwitch
