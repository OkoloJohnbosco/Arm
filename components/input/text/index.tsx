import { Input, InputProps } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import React from 'react'
import Wrapper from '../InputWrapper'
import { InputWrapperProps } from '../type'

export type CustomInputProps = InputProps & InputWrapperProps

const BasicInput = (props: CustomInputProps) => {
	const { title, error, icon, iconPosition, containerStyle, underline, ...inputProps } = props
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
			icon={icon}
			renderIcon={props.renderIcon}
			isDisabled={props.isDisabled}
		>
			<Input
				min={1}
				marginBottom={0}
				className="custom-input"
				w="full"
				px={1}
				//fontWeight={600}
				fontSize={14}
				//pr={0}
				color={error ? colors['red'] : colors['neutral-700']}
				border="none"
				backgroundColor="transparent"
				// borderBottom={`0.5px solid  gainsboro}`}
				// borderRadius={0}
				_focus={{
					outline: 'none',
					// borderBottom: `1px solid ${colors['green-900']}`
				}}
				{...inputProps}
			/>
		</Wrapper>
	)
}

export default React.memo(BasicInput)
