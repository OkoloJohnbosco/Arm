import { ImageProps } from 'next/image'

export type InformationType = 'warning' | 'info' | 'error' | 'success'

export interface InformationProps {
	title?: React.ReactNode
	description?: React.ReactNode
	image?: ImageProps
	type?: InformationType
	size?: number
	children?: React.ReactNode
	variant?: 'h2' | 'h3' | 'h3' | 'h4' | 'h5' | 'h6'
}
