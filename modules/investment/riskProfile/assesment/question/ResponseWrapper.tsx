import { Box, HStack, VStack } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import NamedAvater from 'components/name-avatar'
import Small from 'components/typography/Small'
import useUser from 'modules/account/hooks/useUser'

import React from 'react'
import { RiEdit2Line } from 'react-icons/ri'
import { QuestionWrapperType } from './type'

const QuestionAnswerWrapper = ({ children, isOpen, onEdit, isEditing }: QuestionWrapperType) => {
	const date = new Date()
	const user = useUser()?.login.user_account.user
	return (
		<VStack alignSelf="flex-end" flexDirection="column" display={isOpen ? 'flex' : 'none'}>
			<HStack direction="row">
				{children}
				<IfElse ifOn={onEdit && !isEditing}>
					<RiEdit2Line size={24} onClick={onEdit} />
				</IfElse>
				<Box alignSelf="flex-end" h="fit-content">
					<NamedAvater name={`${user?.first_name} ${user?.last_name}`} />
				</Box>
			</HStack>
			<Small color="primary" alignSelf="flex-end">
				Sent {`${date.getHours()}:${date.getMinutes()}pm`}
			</Small>
		</VStack>
	)
}

export default QuestionAnswerWrapper
