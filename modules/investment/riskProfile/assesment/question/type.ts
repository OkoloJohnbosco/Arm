import { ProfileQuestionType } from '../type'

export type RadioOption = {
	value: any
	text: string
}

export type QuestionComponentType = {
	options: Array<RadioOption>
	onChange: (value: any) => void
	question: string
}

export type QuestionWrapperType = {
	isOpen?: boolean
	children?: any
	isEditing?: boolean
	onEdit?: () => void
}

export interface QuestionAnswerComponentType extends QuestionWrapperType {
	onChange?: (value: any) => void
	answer?: any
	question?: string
	children?: any
}

export type RadioComponentProps = {
	value
	isChecked
	children
	name
	onChange
}

export type QuestionChartProps = {
	question: ProfileQuestionType
	onChange: (question: ProfileQuestionType, response: any) => void
	value?: any
}

export interface QuestionContextType extends QuestionChartProps {}
