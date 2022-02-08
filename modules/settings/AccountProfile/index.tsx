import React from 'react'
import SettingsWrapper from '../SettingsWrapper'
import { RadioGroup, Radio, Stack, Avatar, HStack, Grid, Flex, IconButton } from '@chakra-ui/react'
import Divider from 'components/divider'
import Body from 'components/typography/Body'
import Input from 'components/input'
import Button from 'components/button/Button'
import { FiPlus } from 'react-icons/fi'
import { getLogin } from 'modules/account/helper'

function AccountProfile() {
	const [isDisabled, setIsDisabled] = React.useState(true)
	const { user, engage_id, email, phone_number } = getLogin()?.login.user_account || {}

	console.log(getLogin())
	return (
		<SettingsWrapper>
			<Stack>
				<Flex spacing={6}>
					<Stack alignItems="center">
						<Avatar size="lg" position="relative" name={`${user?.first_name} ${user?.last_name}`} src="">
							<IconButton
								aria-label="Change picture"
								size="sm"
								bottom="-9px"
								right="-14px"
								position="absolute"
								rounded="full"
								fontSize="20px"
								bg="claret.500"
								_hover={{ bg: 'claret.300' }}
								_focus={{ bg: 'claret.300' }}
								_active={{ bg: 'claret.300' }}
								icon={<FiPlus style={{ color: '#fff' }} />}
							/>
						</Avatar>
						<Body color="neutral.100" fontSize="11px">
							Tab to change picture
						</Body>
					</Stack>
					<HStack>
						<Divider my="40px" maxH="100px" borderLeftWidth="1.5px" orientation="vertical" ml={3} mr={4} borderColor="#E086AE" />
						<Stack alignItems="flex-start" justify="center" spacing={0}>
							<Body variant="semibold16">
								{user?.first_name} {user?.last_name}
							</Body>
							<Body variant="regular13" color="neutral.100">
								Membership ID: {engage_id}
							</Body>
						</Stack>
					</HStack>
				</Flex>

				<Stack maxW="750px">
					<Grid my="30px" rowGap={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))" columnGap={6}>
						<Input
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
							isBold={true}
							value={user?.first_name}
							isDisabled={isDisabled}
							placeholder="William"
							title="First Name"
						/>

						<Input
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
							isBold={true}
							value={user?.last_name}
							isDisabled={isDisabled}
							placeholder="Johnson"
							title="Last Name"
						/>

						<Input
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
							isBold={true}
							value={phone_number}
							isDisabled={isDisabled}
							placeholder="09024987362"
							title="Phone Number"
						/>

						<Input
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
							isBold={true}
							value={email}
							isDisabled={isDisabled}
							placeholder="Willjohnson@gmail.com"
							title="Email"
						/>

						<Input
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
							isBold={true}
							value={engage_id}
							isDisabled={isDisabled}
							placeholder="12345TY80"
							title="Membership ID"
						/>
						<Input
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
							isBold={true}
							isDisabled={isDisabled}
							placeholder="Input your source of Funds"
							title="Source of Funds"
						/>
						<Stack spacing={4}>
							{/* <Stack borderBottom="1px solid rgba(0,0,0,.15)" maxW="700px"> */}
							<Stack>
								<HStack p={0}>
									<Body fontWeight="bold" variant="regular13">
										Redemption Method
									</Body>
								</HStack>
							</Stack>
							<Stack spacing={3} maxW="400px">
								<RadioGroup defaultValue="1">
									<Stack>
										<Radio colorScheme="claret" value="1" isDisabled={isDisabled}>
											<Body variant="regular13">Use Pin</Body>
										</Radio>
										<Radio colorScheme="claret" value="2" isDisabled={isDisabled}>
											<Body variant="regular13">Use Otp</Body>
										</Radio>
									</Stack>
								</RadioGroup>
							</Stack>
						</Stack>
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
			</Stack>
		</SettingsWrapper>
	)
}

export default AccountProfile
