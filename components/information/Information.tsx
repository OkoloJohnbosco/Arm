import { Box, VStack, Image } from '@chakra-ui/react'
import IfElse from 'components/if-else'

import React from 'react'
import Body from '../typography/Body'
import { InformationProps, InformationType } from './type'

const variantColor = (props: InformationType) => ({ warning: 'orange', info: 'primary-dark', error: 'red-500', success: 'green-500' }[props])

const Index = (props: InformationProps) => {
	const { title, description, image, type, size, children, ...others } = props

	return (
		<VStack spacing={size || 4} alignItems="center" {...others}>
			<IfElse ifOn={!!image}>
				<Box>
					{/* @ts-ignore */}
					<Image {...image} />
				</Box>
			</IfElse>

			{/* <Box > */}
			<Body textAlign="center" px={{ md: '10%', xm: 4 }} variant="semibold16" color={(type && (variantColor(type) as any)) || 'grey-900'}>
				{title}
			</Body>
			{/* </Box> */}

			<Box maxW="xs" textAlign="center">
				<Body color="neutral-900">{props.description}</Body>
			</Box>
			{props.children}
		</VStack>
	)
}
export default React.memo(Index)
