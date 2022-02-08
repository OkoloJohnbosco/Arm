import { Text } from '@chakra-ui/react'
import React from 'react'
import { fontFamily, fontWeight, textSizes } from './config'
import { BodyTypography, TypographyPropType } from './types'

const Body = ({ font = 'Avenir', ...others }: TypographyPropType) => {
	return <Text fontFamily={fontFamily[font]} {...others} />
}

const BodyComponent = (props: BodyTypography) => {
	const { variant, alt, responsive, ...others } = props

	switch (variant) {
		case 'regular13':
			return <Body {...textSizes.textSm} {...others} />
		case 'regular14':
			return <Body {...textSizes.textBase} {...others} />
		case 'regular18':
			return <Body {...textSizes.textXtraLarge} {...others} />
		case 'semibold16':
			return <Body {...textSizes.textLarge} fontWeight={fontWeight.semiBold} {...others} />
		case 'semibold14':
			return <Body {...textSizes.textBase} fontWeight={fontWeight.semiBold} {...others} />

		case 'semibold13':
			return <Body {...textSizes.textSm} fontWeight={fontWeight.semiBold} {...others} />
		case 'regular12':
			return <Body {...textSizes.textXs} {...others} />
		case 'semibold12':
			return <Body {...textSizes.textXs} fontWeight={fontWeight.semiBold} {...others} />
		case 'regular11':
			return <Body {...textSizes.textXXs} {...others} />
		case 'semibold11':
			return <Body {...textSizes.textXXs} fontWeight={fontWeight.semiBold} {...others} />
		case 'bold14':
			return <Body {...textSizes.textSm} fontWeight={fontWeight.extrabold} {...others} />
		case 'bold18':
			return <Body {...textSizes.textXtraLarge} fontWeight={fontWeight.bold} {...others} />
		case 'semibold18':
			return <Body {...textSizes.textXtraLarge} fontWeight={fontWeight.semiBold} {...others} />

		default:
			return alt ? <Body {...textSizes.textSm} fontWeight={fontWeight.semiBold} {...others} /> : <Body {...textSizes.textBase} {...others} />
	}
}

export default BodyComponent
