import { Button as CustomButton, ButtonProps, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { CustomLinkProps } from 'components/link'
import { fontFamily } from 'components/typography/config'
import React from 'react'

export interface ButtonVariantType extends ButtonProps {
	looks?:
		| 'primary'
		| 'primaryOutline'
		| 'secondary'
		| 'secondaryOutline'
		| 'default'
		| 'accent'
		| 'accentOutline'
		| 'neutral'
		| 'neutral'
		| 'neutralOutline'
	responsive?: boolean
	href?: string
	alt?: boolean
	linkProps?: Omit<CustomLinkProps, 'href' | 'children'>
}
const sizes = {
	xs: '.8rem',
	sm: '.9rem',
	md: '1rem',
	lg: '1.1rem',
}

const heights = {
	xs: '.4rem',
	sm: '.7rem',
	md: '1rem',
	lg: '1.6rem',
}

const rounded = {
	sm: 'sm',
	xs: 'sm',
	md: 'md',
	lg: 'md',
}

const px = {
	sm: '1rem',
	xs: '.5rem',
	md: '1.4rem',
	lg: '.14rem',
}

//@ts-ignore
const buttonTheme: Record<ButtonVariantType['looks'], { scheme: string; variant: string; others?: any }> = {
	primary: { scheme: 'black', variant: 'solid' },
	primaryOutline: { scheme: 'black', variant: 'outline', others: { _hover: { color: 'neutral.0', bg: 'black' } } },
	accent: { scheme: 'claret', variant: 'solid' },
	accentOutline: {
		scheme: 'claret',
		variant: 'outline',
		others: { _hover: { color: 'neutral.0', bg: 'claret.200' }, borderColor: 'claret.500', color: 'claret.500' },
	},
	secondary: { scheme: 'claret', variant: 'solid' },
	neutral: { scheme: 'neutral', variant: 'solid' },
	neutralOutline: { scheme: 'neutral', variant: 'outline' },
	default: { scheme: 'claret', variant: 'solid' },
}

const Button = ({ href, looks = 'primary', size = 'sm', responsive = true, alt, linkProps, ...others }: ButtonVariantType) => {
	const bottonComponent = (
		<CustomButton
			//	fontWeight='semibold'
			fontFamily={fontFamily.Avenir}
			rounded={{ md: rounded[size], base: responsive ? rounded.sm : rounded[size] }}
			fontSize={{ md: sizes[size], base: responsive ? rounded.sm : sizes[size] }}
			px={{ md: px[size], base: responsive ? px.sm : px[size] }}
			h="auto"
			py={{ md: heights[size], base: responsive ? heights.sm : heights[size] }}
			variant={buttonTheme[looks].variant}
			colorScheme={buttonTheme[looks].scheme}
			{...buttonTheme[looks].others}
			{...others}
		/>
	)

	return href ? (
		<LinkBox>
			<LinkOverlay href={href}>{bottonComponent} </LinkOverlay>{' '}
		</LinkBox>
	) : (
		bottonComponent
	)
}

export default Button
