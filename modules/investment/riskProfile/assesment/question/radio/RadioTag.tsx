import { Stack, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import CommonQuestionAnswer from '../CommonResponse'
import QuestionOptionWrapper from '../QuestionWrapper'
import { QuestionComponentType } from '../type'
import RadioCard from './components/RadioCardComponent'

function RadioTags({ options, onChange, question }: QuestionComponentType) {
	const { getRootProps, getRadioProps } = useRadioGroup({ onChange })

	const group = getRootProps()
	console.log(options, 'From Radio Tags')
	console.log(group, 'From Radio Tags')
	return (
		<QuestionOptionWrapper question={question}>
			<Stack {...group}>
				{options.map(({ value, text }, i) => {
					const radio = getRadioProps({ value })
					return (
						//@ts-ignore
						<RadioCard key={i} {...radio}>
							{i + 1}. {text}
						</RadioCard>
					)
				})}
			</Stack>
		</QuestionOptionWrapper>
	)
}

export default {
	Question: RadioTags,
	Answer: CommonQuestionAnswer,
}
