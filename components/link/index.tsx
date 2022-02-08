import Body from 'components/typography/Body'
import { BodyTypography } from 'components/typography/types'
import NextLink from 'next/link'
import React from 'react'

export type CustomLinkProps = { href: string; children: any; alt?: boolean; underline?: boolean } & BodyTypography
const Index = ({ href, children, underline, className, ...others }: CustomLinkProps) => {
	return (
		<NextLink passHref href={href}>
			<Body
				role="link"
				alt
				//variant="semibold13"
				as="a"
				//@ts-ignore
				// color="primary"
				// display="inline"
				//	variant='semibold14'
				color="blue"
				//className={`${underline && 'underline'} inline ${className}`}
				// textDecoration={underline ? 'underline' : 'none'}
				//fontWeight={alt ? 'bolder' : 'normal'}
				{...others}
			>
				{children}
			</Body>
		</NextLink>
	)
}

export default React.memo(Index)
