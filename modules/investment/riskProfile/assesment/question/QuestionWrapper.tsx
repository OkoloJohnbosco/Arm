import { Box, Image, Stack } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import React from 'react'

type QuestionWrapperType = {
	question: string
	children?: any
}
const QuestionOptionWrapper = ({ children, question }: QuestionWrapperType) => {
	const date = new Date()
	return (
		<Stack direction="row" maxW="2xl">
			<Box>
				<Image
					maxW="inherit"
					borderTopRadius={150}
					w={{ base: 8, md: 10 }}
					h={{ base: 10, md: 16 }}
					borderBottomRightRadius={150}
					src="/img/onboard/intro-image-1.webp"
					objectFit="cover"
					alt="banner image 1"
				/>
			</Box>
			<Stack>
				<Body p={{ base: 3, md: 6 }} variant="semibold13" borderTopRadius={18} borderBottomRightRadius={18} color="white" background="black">
					{question}
				</Body>
				<Small color="primary">Sent {`${date.getHours()}:${date.getMinutes()}pm`}</Small>
				<Box>{children}</Box>
			</Stack>
		</Stack>
	)
}

export default QuestionOptionWrapper
