import FileUpload from 'components/input/file'
import React, { useContext } from 'react'
import { FormBuilderContext, InputFieldPropType } from '../type'

export type FileMiscType = {
	mime_type: string[]
}

const FormFIle = (fieldConfig: InputFieldPropType<FileMiscType>) => {
	const formContext = useContext(FormBuilderContext)

	const { setFieldValueOnChange } = fieldConfig.settings || {}
	const { mime_type } = fieldConfig.misc || {}

	console.log(fieldConfig, 'file config from file upload')

	const onChange = (file: any) => {
		// console.log(formContext, 'formContext from file upload')
		formContext.onInputChange({ id: fieldConfig.id, value: setFieldValueOnChange?.({ value: file, fieldConfig, context: formContext }) || file })
	}

	console.log(fieldConfig.misc)

	return (
		<FileUpload
			isRequired={fieldConfig.required}
			containerStyle={{ w: 'full', p: 0 }}
			accept={mime_type}
			trapError
			name={fieldConfig.id}
			title={fieldConfig.label}
			value={formContext.inputValues[fieldConfig.id]}
			onSelectFile={onChange}
			{...(typeof fieldConfig.layout === 'function' ? fieldConfig.layout({ fieldConfig, formContext }) : fieldConfig.layout)}
		/>
	)
}

export default FormFIle
