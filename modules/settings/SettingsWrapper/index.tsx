import React from 'react'
import { ScaleFade } from '@chakra-ui/react'
import { Stack, StackProps } from '@chakra-ui/layout'

type CustomStackProps = {
	responsive?: boolean
}

const SettingsWrapper = ({ responsive, ...props }: StackProps & CustomStackProps) => (
	<ScaleFade initialScale={0.9} in={true}>
		<Stack
			// bg={{ base: 'transparent', md: bg }}
			// bg={isMdAndAbove ? bg : 'transparent'}
			// px={isMdAndAbove ? px : 1}
			// py={isMdAndAbove ? py : 3}
			// border={isMdAndAbove ? border : 0}
			// border={{ base: 0, md: border }}
			mb={'30px'}
			border={{ base: 'none', md: '1px solid #DFE0EB' }}
			py={{ base: 3, md: 10 }}
			px={{ base: responsive ? 0 : 2, md: 6 }}
			bg={{ base: 'transparent', md: 'neutral.0' }}
			{...props}
		/>
	</ScaleFade>
)

export default SettingsWrapper
