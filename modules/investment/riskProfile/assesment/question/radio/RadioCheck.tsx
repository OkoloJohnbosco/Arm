import { HStack, useRadioGroup, VStack } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import React from 'react'
import CommonQuestionAnswer from '../CommonResponse'
import QuestionOptionWrapper from '../QuestionWrapper'
import { QuestionComponentType } from '../type'
import RadioCircle from './components/RadioCheckComponent'

const Question = ({ options, onChange, question }: QuestionComponentType) => {
	const { getRootProps, getRadioProps } = useRadioGroup({
		onChange,
	})

	const group = getRootProps()

	return (
		<QuestionOptionWrapper question={question}>
			<VStack {...group} align="flex-start" spacing={4}>
				{options.map(({ value, text }) => {
					// value has to be a string here
					const radio = getRadioProps({ value })
					return (
						<HStack bgColor={colors['neutral-20']} w="100%" borderRadius="6px">
							<RadioCircle key={value} {...radio}>
								{text}
							</RadioCircle>
						</HStack>
					)
				})}
			</VStack>
		</QuestionOptionWrapper>
	)
}

export default {
	Question,
	Answer: CommonQuestionAnswer,
}
