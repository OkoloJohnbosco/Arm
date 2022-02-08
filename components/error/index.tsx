import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

function Error(props: { title?: string; message?: string }) {
	const { message, title } = props
	return (
		<Box>
			<Flex justify="center" align="center" height="100vh">
				Oops! looks like something unexpected happened
			</Flex>
		</Box>
	)
}

export default React.memo(Error)
