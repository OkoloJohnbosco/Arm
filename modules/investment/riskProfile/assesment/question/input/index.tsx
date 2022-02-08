import { Box, HStack, Input, Stack, useRadioGroup } from '@chakra-ui/react'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { fontWeight } from 'components/typography/config'
import { colors } from 'lib/theme'
import React, { createRef, MutableRefObject, useRef, useState } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import CommonQuestionAnswer from '../CommonResponse'
import QuestionOptionWrapper from '../QuestionWrapper'
import RadioCard from '../radio/components/RadioCardComponent'
import { QuestionAnswerComponentType, QuestionComponentType } from '../type'

//BUG when multiple input field are open as fixed position display
//There is no guarantee that the last edited button will focus the target input
//Solution Close every other input so that only the target input is visible
//DONT DO this css as a toggle on the browser console will reveal the hidden/display none inputs

function Question({ options, onChange, question }: QuestionComponentType) {
	const { getRootProps, getRadioProps } = useRadioGroup({ onChange })

	const group = getRootProps()

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

const Answer = ({ answer: value, onChange, question }: QuestionAnswerComponentType) => {
	const [inputValue, setInputValue] = useState(value)
	const [isEditing, setIsEditing] = useState(false)
	const thisInputRef = useRef<HTMLDivElement>()

	const hideInputsExceptThis = (ref: MutableRefObject<HTMLDivElement | undefined>) => {
		setIsEditing(true)
		// document.querySelectorAll('.edit-input').forEach((editInput) => editInput.classList.add('hidden'))
		// thisInputRef.current?.classList.remove('hidden')
	}

	const unHideInputsExceptThis = (ref: MutableRefObject<any>) => {
		setIsEditing(false)
		// document.querySelectorAll('.hidden').forEach((editInput) => {
		// 	editInput.classList.remove('hidden')
		// })
		// thisInputRef.current?.classList.add('hidden')
	}

	return (
		<>
			<CommonQuestionAnswer
				onEdit={() => {
					hideInputsExceptThis(thisInputRef)
				}}
				isEditing={isEditing}
				answer={value}
				onChange={onChange}
			/>

			<Card
				//@ts-ignore
				ref={thisInputRef}
				className={`edit-input`}
				// className={`edit-input ${!isEditing || value  && 'hidden'}`}
				display={isEditing || !value ? 'block' : 'none'}
				as="form"
				onSubmit={(event) => {
					event.preventDefault()
					inputValue && onChange?.(inputValue)
					unHideInputsExceptThis(thisInputRef)
				}}
				transition="all .3s ease"
				background={colors.white}
				rounded={0}
				margin={0}
				position="fixed"
				left={0}
				right={0}
				bottom={0}
			>
				<HStack>
					<Input
						// onBlur={() => {
						// 	setIsEditing(!isEditing)
						// }}
						isRequired
						value={inputValue}
						onChange={({ target }) => setInputValue(target.value)}
						autoFocus
						border={`1px solid ${colors['deep-green']}`}
						rounded="md"
						p={6}
						placeholder="Enter Response"
						fontWeight={fontWeight.semiBold}
						color={colors['neutral-600']}
						boxShadow="0px 0px 0px 2px rgba(10, 69, 159, 0.19);"
					/>
					<Button type="submit" looks="primary" rightIcon={<FaTelegramPlane />}>
						Send
					</Button>
				</HStack>
			</Card>
		</>
	)
}

export default {
	Question,
	Answer,
}
