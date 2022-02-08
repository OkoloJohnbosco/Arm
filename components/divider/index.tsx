import { Divider as CustomDivider, DividerProps } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import React from 'react'

const Divider = (props: DividerProps) => {
	return <CustomDivider borderColor={colors['neutral-50']} orientation={props.orientation || 'horizontal'} {...props} />
}

export default Divider
