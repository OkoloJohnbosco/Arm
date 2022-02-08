import Body from 'components/typography/Body'
import { colors } from 'lib/theme'
import React from 'react'
import QuestionAnswerWrapper from './ResponseWrapper'
import { QuestionAnswerComponentType } from './type'
import { RiEdit2Line } from 'react-icons/ri'
import IfElse from 'components/if-else'

const CommonQuestionAnswer = ({ answer, children, onChange, onEdit, isEditing = false }: QuestionAnswerComponentType) => {
	return (
		<QuestionAnswerWrapper isOpen={answer || children}>
			<Body p={{ base: 3, md: 6 }} borderBottomRadius={18} borderLeftRadius={18} color="white" background="claret.500">
				{answer || children}
			</Body>
			<IfElse ifOn={onEdit && !isEditing}>
				<RiEdit2Line size={24} onClick={onEdit} />
			</IfElse>
		</QuestionAnswerWrapper>
	)
}

export default CommonQuestionAnswer
