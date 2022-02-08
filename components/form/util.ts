import FormFile from './inputs/FormFile'
import FormSelect from './inputs/FormSelect'
import FormSwitch from './inputs/FormBolean'
import FormText from './inputs/FormText'
import FormInteger from './inputs/FormInteger'
import Form from './inputs/Form'
import NothingInput from './inputs/Nothing'
import {
	FormBuilderLayoutMatricsType,
	FormBuilderPropType,
	FormElementLayoutType,
	FormInputFieldConfigType,
	FormInputType,
	LayoutSettingsType,
} from './type'
import { config } from 'dotenv/types'
import FormDate from './inputs/FormDate'
import FormButton from './inputs/FormButton'

export const getFormInputComponent = (config: FormInputFieldConfigType) => {
	if (config.id.includes('date')) {
		return FormDate
	}
	switch (config.type) {
		case FormInputType.Boolean:
			return FormSwitch
		case FormInputType.File:
			return FormFile
		case FormInputType.Option:
			return FormSelect
		case FormInputType.Text:
			return FormText
		case FormInputType.Integer:
			return FormInteger
		case FormInputType.Form:
			return Form
		case FormInputType.Date:
			return FormDate
		case FormInputType.Button:
			return FormButton
	}
	return NothingInput
}

export const getInitialState = (builderData: FormBuilderPropType) => {
	if (builderData.inputFieldConfigs instanceof Array)
		return builderData?.inputFieldConfigs?.reduce((accum, next) => {
			switch (next.type) {
				case FormInputType.Boolean:
					accum[next.id] = builderData.inputInitialValues?.[next.id] || false
					break
				case FormInputType.Option:
					accum[next.id] = builderData.inputInitialValues?.[next.id] || { value: null, label: null, option: null }
					break
				case FormInputType.Text:
					accum[next.id] = builderData.inputInitialValues?.[next.id] || ''
					break
				case FormInputType.Integer:
					accum[next.id] = builderData.inputInitialValues?.[next.id]
					break
				case FormInputType.File:
					accum[next.id] = builderData.inputInitialValues?.[next.id]
					break
			}
			return accum
		}, {})
	if (builderData.inputFieldConfigs?.id)
		return { [builderData.inputFieldConfigs?.id]: builderData.inputInitialValues?.[builderData.inputFieldConfigs?.id] }
	return {}
}

export const getConfigNeighbor = (
	config: FormInputFieldConfigType,
	layoutMatrics?: FormBuilderLayoutMatricsType[],
	configs?: Array<FormInputFieldConfigType>
) => {
	//find the layout that this Config belongs to
	const configLayout = layoutMatrics?.find((layout) => layout.some((matric) => matric.id === config.id))
	if (!configLayout) return
	const neighboars: { config: FormInputFieldConfigType; layout?: LayoutSettingsType }[] = []

	for (let i = 0; i < configLayout.length; i++) {
		const config = configs?.find((c) => c.id === configLayout[i].id)
		config && neighboars.push({ config, layout: configLayout[i].layout })
	}
	return neighboars
}

export const isConfigProccessed = (config: FormInputFieldConfigType, proccessedConfig: FormInputFieldConfigType[]) =>
	proccessedConfig.some((pc) => pc.id === config.id)

export const normalizeFormInputValues = (formInputs, configs: FormInputFieldConfigType[], removeEmpty = true) => {
	const normalized = configs?.map(function (config) {
		switch (config.type) {
			case FormInputType.Option:
				return { id: config.id, value: formInputs?.[config.id]?.value, type: config.type }
			case FormInputType.File:
				return { id: config.id, value: formInputs?.[config.id]?.[0], type: config.type }
			case FormInputType.Integer: {
				const value = formInputs?.[config.id]
				return { id: config.id, value: value ? Number(value) : undefined, type: config.type }
			}
			default:
				return { id: config.id, value: formInputs?.[config.id], type: config.type }
		}
	})
	return removeEmpty ? normalized.filter((d) => d.value) : normalized
}

export class FormBuilderUtil {
	private config: Array<{
		id: string
		value: any
		type: FormInputType
	}> = []

	private constructor(formInputs, configs: FormInputFieldConfigType[], removeEmpty = true) {
		this.config = normalizeFormInputValues(formInputs, configs, removeEmpty)
	}

	static from(formInputs, configs: FormInputFieldConfigType[], removeEmpty = false) {
		return new FormBuilderUtil(formInputs, configs, removeEmpty)
	}
	map() {
		return this.config.reduce((accum, { value, id }) => ({ ...accum, [id]: value }), {})
	}

	normalizeFormInput() {
		return this.config
	}

	hasFile() {
		return this.config.some((config) => config.type === FormInputType.File)
	}
}

export const expandUrlVariable = (url: string, variableRecord: Record<string, any>) => {
	const parthen = /\$\{(\w+)\}/g
	const value = url.replace(parthen, (match, variableName) => {
		return variableRecord[variableName] ? variableRecord[variableName] : match
	})
	return value
}
