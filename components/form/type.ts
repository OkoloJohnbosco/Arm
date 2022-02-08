import React from 'react'

export enum FormInputType {
	Option = 'option',
	Text = 'string',
	File = 'file',
	Boolean = 'boolean',
	Integer = 'integer',
	Form = 'form',
	Date = 'date',
	Button = 'button',
}

export type LayoutSettingsType =
	| Record<string, any>
	| ((props: { fieldConfig: FormInputFieldConfigType; formContext: FormBuilderContextType }) => Record<any, any>)

export type FormInputFieldConfigType<MISC = any> = {
	id: string
	label: string
	required: boolean
	type: FormInputType
	// mime_type?: Array<string>
	//  optionUrl?: string
	misc?: MISC
	layout?: LayoutSettingsType
}

export type FormElementLayoutType = { id: string; layout?: LayoutSettingsType }

export type FormBuilderLayoutMatricsType = FormElementLayoutType[]

export type InputFieldSettingsType<S = {}> = {
	setFieldValueOnChange?: (props: { value: any; fieldConfig: FormInputFieldConfigType; context: FormBuilderContextType }) => any
	layout?: LayoutSettingsType
} & S

export type InputFieldPropType<M = any, S = {}> = FormInputFieldConfigType<M> & { settings?: InputFieldSettingsType<S> }

export type FormBuilderPropType = {
	onFormInputChange?: (data: any) => void
	pageSize: number
	layoutMarics?: FormBuilderLayoutMatricsType[]
	inputFieldConfigs?: Array<FormInputFieldConfigType> | FormInputFieldConfigType
	inputInitialValues?: Record<string, any>
	updateInputValuesOnChange?: (formContext: FormBuilderContextType) => any
	inputFieldSettings?: Record<string, InputFieldSettingsType>
}

export type FormBuilderContextType = {
	inputFieldConfigs: Array<FormInputFieldConfigType>
	layoutMarics?: FormBuilderLayoutMatricsType[]
	inputValues: any
	inputInitialValues?: Record<string, any>
	onInputChange: (props: { id: string; value: any }) => void
}

export const FormBuilderContext = React.createContext<FormBuilderContextType>({} as any)
