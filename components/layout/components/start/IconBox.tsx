import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

const IconBox = ({ children, ...props }: FlexProps) => {
	return (
		<Flex width={'90px'} height={'80px'} bg="#ffffff" borderRadius={4} justifyContent="center" alignItems="center" {...props}>
			{children}
		</Flex>
	)
}

export default IconBox
