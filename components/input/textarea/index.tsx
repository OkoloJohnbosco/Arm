import { Textarea, TextareaProps } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import React from 'react'
import Wrapper from '../InputWrapper'
import { InputWrapperProps } from '../type'

export type CustomInputProps = TextareaProps & InputWrapperProps & { isBold?: boolean }

const BasicInput = (props: CustomInputProps) => {
	const { title, error, icon, iconPosition, containerStyle, isBold = false, underline, ...inputProps } = props
	return (
		<Wrapper
			underline={underline}
			iconPosition={iconPosition}
			value={inputProps.value}
			name={props.name}
			trapError={props.trapError}
			containerStyle={containerStyle}
			title={title}
			error={error}
			isRequired={props.isRequired}
			isBold={isBold}
			icon={icon}
			renderIcon={props.renderIcon}
			isDisabled={props.isDisabled}
		>
			<Textarea
				min={1}
				marginBottom={0}
				className="custom-input"
				w="full"
				px={1}
				size="md"
				fontSize={14}
				color={error ? colors['red'] : colors['neutral-700']}
				border="none"
				backgroundColor="transparent"
				_focus={{
					outline: 'none',
				}}
				{...inputProps}
			/>
		</Wrapper>
	)
}

export default React.memo(BasicInput)
