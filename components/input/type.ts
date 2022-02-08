import { InputProps, StackProps } from '@chakra-ui/react'
import { IconProps } from 'components/icon'

export interface InputContainterStyleType extends StackProps {
	titleHeight?: string | number
}

export type InputWrapperProps = {
	underline?: boolean
	title?: string
	children?: any

	error?: string
	isRequired?: boolean
	icon?: IconProps
	isDisabled?: boolean
	trapError?: boolean
	name?: string
	value?: any
	containerStyle?: InputContainterStyleType
	iconPosition?: 'left' | 'right'
	// inputContainerStyle?: StackProps
	// selectContainerStyle?: StackProps
	renderIcon?: React.ReactNode
}

export type CustomInputProps = InputProps & InputWrapperProps

export type ChangedInputType = 'source' | 'destination'
