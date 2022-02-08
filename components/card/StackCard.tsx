//@ts-nocheck

import { BoxProps, Stack, StackProps } from '@chakra-ui/layout'
import { colors } from 'lib/theme'
import React from 'react'

type CustomStackProps = {
	responsive?: boolean
}

const StackCard = ({ responsive, children, ...props }: StackProps & CustomStackProps) => (
	<Stack
		// py={{ base: props.py || props.p || props.padding || 6, md: props.padding || props.p || props.py || 8 }}
		// px={{ base: props.px || props.p || props.padding || 4, md: props.padding || props.p || props.px || 8 }}
		// bg={{ md: props.background || 'white' }}
		// rounded={{ md: props.rounded || 'md', base: responsive ? props.rounded || 'none' : props.rounded || 'md' }}

		// {...props}
		border={{ base: 'none', md: '1px solid #DFE0EB' }}
		py={{ base: responsive ? 0 : props.padding || props.p || props.py || 6, md: props.padding || props.p || props.py || 8 }}
		px={{ base: responsive ? 0 : props.padding || props.p || props.px || 4, md: props.padding || props.p || props.px || 6 }}
		pt={{ base: responsive ? 0 : props.padding || props.p || props.pt || props.py || 4, md: props.padding || props.p || props.pt || props.py || 6 }}
		pb={{ base: responsive ? 0 : props.padding || props.p || props.pb || props.py || 4, md: props.padding || props.p || props.pb || props.py || 6 }}
		bg={{ md: props.background || 'neutral.0' }}
		rounded={{ md: 'md' }}
		{...props}
	>
		{children}
	</Stack>
)

export default StackCard
