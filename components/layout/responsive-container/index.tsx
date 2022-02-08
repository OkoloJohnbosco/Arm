import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

type ResponsiveContainerProps = {
	breakPoint?: string
}

const Index = ({ sx, children, breakPoint, ...others }: FlexProps & ResponsiveContainerProps) => {
	return (
		<Flex
			sx={{
				' > *': {
					flexBasis: `calc(calc(${breakPoint} - 100%) * 900)`,
					flexGrow: 1,
				},
				...sx,
			}}
			flexWrap="wrap"
			{...others}
		>
			{children}
		</Flex>
	)
}

export default Index
