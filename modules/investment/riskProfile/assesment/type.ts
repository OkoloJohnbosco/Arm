export enum RiskAssessmentStage {
	PreOnboarding = 'pre-onboarding',
	Retail = 'retail',
	WRM = 'wrm',
	Pensions = 'pensions',
}

export type Answer = {
	question_id: number
	option_id: number
}

export enum RiskAssessmentScreen {
	Assessment = 'Assessment',
	LoadingResult = 'LoadingResult',
	Result = 'Result',
}

type QuestionOptionTagType =
	| {
			name: string
			id: number
			value: string
	  }
	| string
	| null

//export type RiskAssessmentStage = 'pre-onboarding' | 'retail' | 'wrm' | 'pension'

type QuestionOptionType = {
	text: string
	option_tag: QuestionOptionTagType
	points: number
	id: number
	date_created: string
	created_by: string
	value: string
}
type QuestionStatusType = {
	name: string
	id: number
}

type QuestionDescriptionType = {
	is_reordering_required: boolean
	name: string
	id: number
	is_option_required: boolean
}
type QuestionStageType = {
	name: RiskAssessmentStage // QuestionStage
	id: number
}

export type ProfileQuestionType = {
	question_type_description: QuestionDescriptionType
	order: number
	is_option_required: boolean
	created_by: string
	required_options_count: number
	status: QuestionStatusType
	media: Array<any>
	options: Array<QuestionOptionType>
	value: string
	id: number
	date_created: string
}

export type RiskProfileQuestionType = {
	questions: Array<ProfileQuestionType>
	stage: QuestionStageType
}

export type RiskProfileQuestionResponse = {
	question: ProfileQuestionType
	value: any
}

export type RiskAssesmentScreenProps = {
	onComplete: () => void
}
