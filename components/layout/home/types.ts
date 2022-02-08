import { ReactNode } from 'react'

export type ImageProps = {
	width?: string | number
	height?: string | number
}

export type FeatureCardProps = {
	href: string
	image: string
	title: string
	description: string
	background?: string
	action?: string
}
