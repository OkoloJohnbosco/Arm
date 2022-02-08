import { SignupField } from 'modules/account/types'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Input from '../index'
import { CustomInputProps } from '../type'
import { PasswordMeter } from 'components/password-meter'
import { Box } from '@chakra-ui/react'

const PasswordInput = (props: CustomInputProps & { showStrength?: boolean } & { isBold?: boolean }) => {
	const [showPassword, setShowPassword] = useState(false)
	const { showStrength = false, isBold, ...others } = props
	return (
		<Box>
			<Input
				// isRequired
				// placeholder="Pick a password"
				// title="Pick a password"
				type={showPassword ? 'text' : 'password'}
				// value={signupData.password}
				// name={SignupField.Password}
				// error={serverErrors[SignupField.Password]}
				autoComplete="off"
				// onChange={onChange}
				isBold={isBold}
				icon={{
					cursor: 'pointer',
					iconComp: showPassword ? AiOutlineEye : AiOutlineEyeInvisible,
					onClick: () => setShowPassword(!showPassword),
				}}
				iconPosition="right"
				{...others}
			/>
			<Box position="relative" top="-4" sx={{ clear: 'both' }} display={showStrength ? 'block' : 'none'}>
				<PasswordMeter password={props.value || ''} />
			</Box>
		</Box>
	)
}

export default PasswordInput
