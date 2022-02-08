import { Box, Stack } from '@chakra-ui/react'
import React, { FC } from 'react'
import FileQuestion from './file'
import TextResponse from './input'
import { RadioTag } from './radio'
import { QuestionAnswerComponentType, QuestionChartProps, QuestionComponentType } from './type'

const responseComponents: Record<string, { Question: FC<QuestionComponentType>; Answer: FC<QuestionAnswerComponentType> }> = {
	radio: RadioTag,
	text: TextResponse,
	file: FileQuestion,
}

const Question = ({ question, onChange, value }: QuestionChartProps) => {
	const { Question, Answer } = responseComponents.radio
	console.log(question.value)
	return (
		<Stack
			p={{ md: 8, base: 4 }}
			//onClick={() => console.log(question.value, value)}
		>
			<Box>
				<Question
					question={question.value}
					onChange={(value) => {
						onChange(question, value)
					}}
					options={question.options.map((option) => ({ value: option.id, text: option.text }))}
				/>
			</Box>

			<Answer
				question={question.value}
				answer={value}
				onChange={(value) => {
					onChange(question, value)
				}}
			/>
		</Stack>
	)
}

export default Question
