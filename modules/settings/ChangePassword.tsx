import React from 'react'
import SettingsWrapper from './SettingsWrapper'
import { Stack, HStack } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import PasswordInput from 'components/input/password'
import Button from 'components/button/Button'

function BankDetails() {
	return (
		<SettingsWrapper>
			<Stack spacing={8}>
				<Stack borderBottom="1px solid rgba(0,0,0,.15)" maxW="700px">
					<HStack p={4}>
						<SubHeading>Change Password</SubHeading>
					</HStack>
				</Stack>
				<Stack spacing={3} maxW="400px">
					<PasswordInput
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						color="neutral-500"
						isBold={true}
						isRequired
						placeholder="Input your current password"
						title="Current Password"
						// value={signupData.password}
						value=""
						// name={SignupField.Password}
						//	error={serverErrors[SignupField.Password]}
						autoComplete="no"
						// onChange={onChange}
					/>

					<PasswordInput
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						color="neutral-500"
						isBold={true}
						isRequired
						placeholder="Pick a new Password"
						title="New Password"
						// value={signupData.password}
						value={''}
						// name={SignupField.Password}
						//	error={serverErrors[SignupField.Password]}
						autoComplete="no"
						// onChange={onChange}
					/>
				</Stack>
				<HStack justify="flex-start">
					<Button looks="accent" size="md" w={{ base: 'full', md: 'auto' }} px={10} py={3} fontWeight="normal" rounded={0}>
						Save Changes
					</Button>
				</HStack>
			</Stack>
		</SettingsWrapper>
	)
}
export default BankDetails
