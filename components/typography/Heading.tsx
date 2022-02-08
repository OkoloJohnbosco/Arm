import { Text } from '@chakra-ui/react'
import React from 'react'
import { fontFamily, fontSize, fontWeight, lineHeight } from './config'
import { HeadingTypographyProps, TypographyPropType } from './types'

const Heading = ({ variant = 'h1', alt, font = 'Avenir', ...others }: TypographyPropType) => {
	return (
		<Text
			fontWeight={fontWeight.bold}
			lineHeight={lineHeight[variant]}
			fontSize={fontSize[variant]}
			fontFamily={fontFamily[font]}
			as="h3"
			letterSpacing={1}
			{...others}
		/>
	)
}

const HeadingComponent = (props: HeadingTypographyProps) => {
	const { ...others } = props

	switch (props.variant) {
		case 'h5':
			return <Heading {...others} />
		case 'h4':
			return <Heading {...others} />
		case 'h3':
			return <Heading {...others} />
		case 'h2':
			return <Heading {...others} />
		case 'h1':
			return <Heading {...others} />
		case 'h6':
		default:
			return <Heading {...others} />
	}
}

export default HeadingComponent
