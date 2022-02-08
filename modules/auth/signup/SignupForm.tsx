import { Box, Flex, Stack, VStack } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Back from 'components/navigation'
import Input from 'components/input'
import { PasswordMeter } from 'components/password-meter'
import { PAGES, SESSION_STORAGE_SIGNUP_DATA, SESSION_STORAGE_SIGNUP_SUCCESS_DATA } from 'constant'
import useMainState from 'lib/hooks/useMainState'
import { SignupData, SignupField } from 'modules/account/types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { formatDateofBirth } from 'utils/helpers'
import Select, { OptionType } from 'components/input/select'
import Link from 'components/link'
import Heading from 'components/typography/Heading'
import Body from 'components/typography/Body'
import Switch from 'components/input/switch'
import { useMutateOnboardSignup } from 'modules/account/hooks/useInitiateSignup'
import useOnboardInitiateData from 'modules/account/hooks/useOnboardInitiateData'
import Small from 'components/typography/Small'
import { UserType } from '.'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { setBroadcastStorage } from 'lib/broadcastStorage'
import ServerErrorBoundary from 'components/error/ServerErrorBoundary'
import PasswordInput from 'components/input/password'
import useApiListAccountTypes, { AccountType } from 'modules/hooks/account/useApiListAccountTypes'
import { BsPeople } from 'react-icons/bs'

type SignupProps = {
	onSignup: (data: Partial<SignupData>) => void
	setResponseData: (data) => void
	onBack: () => void
}

enum Field {
	AccountType = 'account_type_id',
	IsAccountMinor = 'is_account_minor',
}

const SignupForm = (props: SignupProps) => {
	const [signupData, setSignupData] = useState<Partial<SignupData>>(useOnboardInitiateData())
	const { mutateAsync, isLoading } = useMutateOnboardSignup()
	const accountType = useApiListAccountTypes()
	const [isAminorAccount, setIsAminorAccount] = useState(false)
	const accountTypeOptions = accountType?.value?.map((option) => ({ value: option.id, label: option.name, option }))
	const [accountTypeOption, setAccountTypeOption] = useState<OptionType<AccountType>>()

	//const { serverErrors } = useMainState()
	const onChange = (event) => {
		const fieldName = event.target.name as SignupField
		const value = event.target.value
		setSignupData({ ...signupData, [fieldName]: value })
	}

	const onSubmit = (signupData: Partial<SignupData>) => {
		setBroadcastStorage(SESSION_STORAGE_SIGNUP_DATA, JSON.stringify(signupData), 'sessionStorage')
		const data = {
			...signupData,
			date_of_birth: formatDateofBirth(signupData.date_of_birth),
			[Field.AccountType]: accountTypeOption?.value ? accountTypeOption?.value : accountTypeOptions?.[0].value,
			[Field.IsAccountMinor]: isAminorAccount,
		}
		mutateAsync(data).then(async ({ data }) => {
			// await otpRequest.mutateAsync({ email: signupData.email })
			setBroadcastStorage(SESSION_STORAGE_SIGNUP_SUCCESS_DATA, JSON.stringify(data.data), 'sessionStorage')
			props.setResponseData(data.data)
			switch (data.response_code) {
				case 'S01':
					props.onSignup(signupData)
				//router.push(PAGES.ACCOUNT_VERIFY_EMAIL)
			}
		})
	}

	return (
		<ServerErrorBoundary>
			<StackCard
				py="8"
				mb={4}
				spacing={8}
				as="form"
				w={{ md: 'md' }}
				onSubmit={(event) => {
					event.preventDefault()
					onSubmit(signupData)
				}}
			>
				<Stack>
					<Heading>Register on ARM Engage</Heading>
					<Body variant="regular13">Kindly fill in your details to register on Engage</Body>
				</Stack>
				<Stack w="full">
					<Stack w="full" direction={{ base: 'column', md: 'row' }}>
						<Input
							isRequired
							placeholder="First Name"
							title="First Name"
							value={signupData.first_name}
							name={SignupField.FirstName}
							onChange={onChange}
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
						/>

						<Input
							isRequired
							placeholder="Last Name"
							title="Last Name"
							value={signupData.last_name}
							name={SignupField.LastName}
							onChange={onChange}
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
						/>
					</Stack>

					<Stack w="full" align="unset" direction={{ base: 'column', md: 'row' }}>
						<Input
							isRequired
							placeholder="08123456789"
							title="Phone Number"
							value={signupData.phone_number}
							name={SignupField.PhoneNumber}
							onChange={onChange}
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
						/>

						<Input
							isRequired
							placeholder="Date of Birth"
							title="Date of Birth"
							type="date"
							value={signupData.date_of_birth}
							name={SignupField.DateOfBirth}
							onChange={onChange}
							color="neutral-500"
						/>
					</Stack>
					<Input isRequired placeholder="Email" title="Email" value={signupData.email} name={SignupField.Email} onChange={onChange} />
					<Select
						isLoading={accountType.isFetching}
						isRequired
						name={Field.AccountType}
						onChange={(option) => {
							setAccountTypeOption(option)
						}}
						placeholder="Select Account Type"
						options={accountTypeOptions}
						icon={{ iconComp: BsPeople }}
						value={accountTypeOption?.value}
						title="Account Type"
					/>

					<PasswordInput
						showStrength
						isRequired
						placeholder="Pick a password"
						title="Pick a password"
						value={signupData.password}
						name={SignupField.Password}
						//	error={serverErrors[SignupField.Password]}
						autoComplete="no"
						onChange={onChange}
					/>
					<Switch
						layoutDirection="horizontal"
						name={Field.IsAccountMinor}
						isChecked={isAminorAccount}
						title="Account has a Minor ?"
						onChange={({ target }) => setIsAminorAccount(target.checked)}
					/>

					<Button isLoading={isLoading} py={4} rounded={8} w="full" looks="primary" type="submit">
						Register
					</Button>
					<Flex align="center">
						<Small color="neutral-400">Have Account? </Small> &nbsp;
						<Link variant="semibold12" href={PAGES.ACCOUNT_LOGIN}>
							Login{' '}
						</Link>
					</Flex>
				</Stack>
				<Small textAlign="center" color="neutral-500">
					By confirming your email, you Agree to have read understood our{' '}
					<Link variant="semibold12" href="">
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link variant="semibold12" href="">
						private policies
					</Link>{' '}
				</Small>
			</StackCard>
		</ServerErrorBoundary>
	)
}

export default SignupForm
