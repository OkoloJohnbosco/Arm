import { Box, Switch as InputSwitch, SwitchProps } from '@chakra-ui/react'
import React from 'react'
import InputWrapper from '../InputWrapper'
import { InputWrapperProps } from '../type'

export type CustomSwitchProps = SwitchProps & InputWrapperProps & { layoutDirection?: 'vertical' | 'horizontal' }
const Switct = (props: CustomSwitchProps) => {
	const { title, error, icon, iconPosition, containerStyle, underline, layoutDirection, ...inputProps } = props
	const layout = layoutDirection === 'horizontal' ? { direction: 'row', align: 'baseline' } : {}
	return (
		<InputWrapper
			underline={underline}
			iconPosition={iconPosition}
			value={inputProps.value}
			name={props.name}
			trapError={props.trapError}
			//@ts-ignore
			containerStyle={{ spacing: '3', bg: 'transparent', wrap: 'wrap', border: 'none', boxShadow: 'none', ...containerStyle, ...layout }}
			title={title}
			error={error}
			isRequired={props.isRequired}
			icon={icon}
			renderIcon={props.renderIcon}
			isDisabled={props.isDisabled}
		>
			<Box h="8">
				<InputSwitch
					ml="-2"
					colorScheme="claret"
					_focus={{ outline: 'none', shadow: 'none' }}
					_active={{ outline: 'none' }}
					{...inputProps}
					value={String(inputProps.isChecked)}
				/>
			</Box>
		</InputWrapper>
	)
}
export default Switct
