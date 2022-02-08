import React from 'react'
import SettingsWrapper from './SettingsWrapper'
import { Stack, HStack, Grid } from '@chakra-ui/react'
import Input from 'components/input'
import SubHeading from 'components/typography/SubHeading'
import Button from 'components/button/Button'
// import Selec
import Select, { OptionType } from 'components/input/select'
import Textarea from 'components/input/textarea'

const gender = [
	{ value: 1, label: 'Male', option: 'Gender' },
	{ value: 2, label: 'Femail', option: 'Gender' },
]

function AccountProfile() {
	const [isDisabled, setIsDisabled] = React.useState(true)

	return (
		<SettingsWrapper>
			<Stack borderBottom="1px solid rgba(0,0,0,.15)">
				<HStack p={3}>
					<SubHeading fontSize="20px">Next of KIN Information</SubHeading>
				</HStack>
			</Stack>
			<Stack maxW="800px">
				<Grid
					my="30px"
					rowGap={4}
					templateColumns={{ base: 'repeat(auto-fill, minmax(230px, 1fr))', md: 'repeat(auto-fill, minmax(300px, 1fr))' }}
					columnGap={6}
				>
					<Input
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						color="neutral-500"
						isBold={true}
						isDisabled={isDisabled}
						placeholder="William"
						title="First Name"
					/>

					<Input
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						color="neutral-500"
						isBold={true}
						isDisabled={isDisabled}
						placeholder="Johnson"
						title="Last Name"
					/>

					<Input
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						color="neutral-500"
						isBold={true}
						isDisabled={isDisabled}
						placeholder="09024987362"
						title="Phone Number"
					/>

					<Input
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						color="neutral-500"
						isBold={true}
						isDisabled={isDisabled}
						placeholder="Willjohnson@gmail.com"
						title="Email"
					/>

					<Select
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						isBold={true}
						isDisabled={isDisabled}
						color="neutral-500"
						options={gender}
						// isLoading={accountType.isFetching}
						// onChange={(option) => setAccountTypeOption(option)}
						// options={accountTypeOptions}
						// icon={{ iconComp: BsPeople }}
						// value="Male"
						title="Gender"
					/>
					<Select
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						isBold={true}
						isDisabled={isDisabled}
						options={gender}
						color="neutral-500"
						// isLoading={accountType.isFetching}
						// onChange={(option) => setAccountTypeOption(option)}
						// options={accountTypeOptions}
						// icon={{ iconComp: BsPeople }}
						// value="Brother"
						title="Relationship With Next of Kin"
					/>

					<Textarea
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						color="neutral-500"
						minH="100px"
						isDisabled={isDisabled}
						isBold={true}
						placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo error quidem eligendi. Eligendi eos culpa, blanditiis ratione iusto odio"
						title="Address"
					/>
				</Grid>
			</Stack>

			<Stack w="full" spacing={4} direction={{ base: 'column', md: 'row' }}>
				<Button
					onClick={() => setIsDisabled((prevState) => !prevState)}
					looks="accentOutline"
					w={{ md: 'auto', base: 'full' }}
					size="md"
					px={10}
					py={3}
					rounded={3}
				>
					{isDisabled ? 'Edit Profile' : 'Cancel Changes'}
				</Button>
				<Button looks="accent" size="md" w={{ md: 'auto', base: 'full' }} px={10} py={3} fontWeight="normal" rounded={3}>
					Save Changes
				</Button>
			</Stack>
		</SettingsWrapper>
	)
}

// your unique referal code is xyz

// Inite peopele to join ARM Engage

// Name Email Address Send
export default AccountProfile
