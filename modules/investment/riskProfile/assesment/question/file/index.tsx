import { Box } from '@chakra-ui/layout'
import { Card } from 'components/card'
import Upload from 'components/upload'
import { colors } from 'lib/theme'
import React, { useState } from 'react'
import QuestionAnswerWrapper from '../ResponseWrapper'
import QuestionOptionWrapper from '../QuestionWrapper'
import { QuestionAnswerComponentType, QuestionComponentType } from '../type'

function Question({ options, onChange, question }: QuestionComponentType) {
	return <QuestionOptionWrapper question={question} />
}

const Answer = ({ answer: value, onChange, question }: QuestionAnswerComponentType) => {
	return (
		<QuestionAnswerWrapper isOpen={true}>
			<Box>
				<Upload
					file={value}
					accept={['image/*']}
					onSubmit={(file) => {
						console.log(question)
						onChange?.(file)
					}}
				/>
			</Box>
		</QuestionAnswerWrapper>
	)
}

export default {
	Question,
	Answer,
}
