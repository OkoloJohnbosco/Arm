import { BoxProps, Box } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Link from 'next/link'
import React from 'react'

const Index = ({
	href,
	children,
	color,
	underline,
	alt,
	...others
}: { href: string; children: any; color?: any; alt?: boolean; underline?: boolean } & BoxProps) => {
	return (
		<Body
			cursor="pointer"
			color={color}
			{...others}
			display="inline"
			textDecoration={underline ? 'underline' : 'none'}
			fontWeight={alt ? 'bold' : 'normal'}
		>
			<Link passHref href={href} shallow>
				<Box>{children}</Box>
			</Link>
		</Body>
	)
}

export default Index
