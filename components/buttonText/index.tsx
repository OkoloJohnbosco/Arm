import { BoxProps } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import { Color } from 'components/typography/types'

import React from 'react'

const ButtonText = ({
	onClick,
	children,
	underline,
	color,
	alt,
	...others
}: {
	children: any
	alt?: boolean
	underline?: boolean
	color?: Color
} & BoxProps) => {
	return (
		<Body
			as="a"
			color={color ? color : 'primary-dark'}
			onClick={onClick}
			display="inline"
			fontWeight={alt ? 'bolder' : 'normal'}
			fontSize="inherit"
			cursor="pointer"
			{...others}
		>
			{children}
		</Body>
	)
}

export default React.memo(ButtonText)
