import { Flex, FlexProps } from '@chakra-ui/react'
// import { colors } from 'lib/theme'
import { spacingUnits } from 'lib/theme/unit'
import React from 'react'

interface ButtonGroupProps extends FlexProps {
	spacing?: number | string
}

const Index = (props: ButtonGroupProps) => {
	const { spacing = '1', sx, ...others } = props
	return (
		<Flex
			sx={{ gap: spacingUnits(spacing), ...sx }}
			// gap={props.spacing}
			{...others}
		>
			{props.children}
		</Flex>
	)
}

export default Index
