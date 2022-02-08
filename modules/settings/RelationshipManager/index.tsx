import React from 'react'
import { Box, Stack, Avatar, HStack, Grid } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Divider from 'components/divider'
import { FiMail } from 'react-icons/fi'
import Icon from 'components/icon'
import { ImPhone } from 'react-icons/im'
import SettingsWrapper from '../SettingsWrapper'
import { getLogin } from 'modules/account/helper'

// import Select, { OptionType } from 'components/input/select'
// import Button from 'components/button/Button'
import { RiMailSendLine, RiHeadphoneLine } from 'react-icons/ri'

// const gender = [
// 	{ value: 1, label: 'Male', option: 'Gender' },
// 	{ value: 2, label: 'Femail', option: 'Gender' },
// ]

function RelationshipManager() {
	const { user, engage_id, email, phone_number } = getLogin()?.login.user_account || {}

	return (
		<SettingsWrapper>
			<Grid templateColumns={{ base: '1fr', md: '4fr 0.2fr 4fr' }} w="full" gap={8}>
				<Stack spacing={8}>
					<Stack spacing={0}>
						<Body variant="semibold16" color="neutral-500">
							Stay in touch with your us
						</Body>
						<Body variant="regular13" color="neutral.200">
							Lorem ipsum, dolor sit amet consectetur adipisicing
						</Body>
					</Stack>
					<HStack>
						<Box mr={2} rounded="full" p={1} border="3px solid" borderColor="claret.500">
							<Avatar name={`${user?.first_name} ${user?.last_name}`} src="https://bit.ly/code-beast" />
						</Box>
						<Stack spacing={1}>
							<Body variant="semibold16" fontWeight="normal" color="neutral.100">
								Your Relationship Manager
							</Body>
							<Body variant="bold18" fontSize="20px" color="neutral-500">
								Funmilayo Ruth
							</Body>
						</Stack>
					</HStack>

					<Stack spacing={4}>
						<Stack px={4} py={3} maxW="400px" bg="#F4EBE8" rounded={10}>
							<HStack>
								<Icon mr={2} iconComp={ImPhone} boxSize={10} p={2} rounded="full" color="#fff" bg="claret.500" />
								<Stack spacing={0} justify="center">
									<Body variant="regular14" fontWeight="bold">
										+2349024987362
									</Body>
									<Body variant="regular13" color="neutral.200">
										Call your Relationship Manager
									</Body>
								</Stack>
							</HStack>
						</Stack>

						<Stack px={4} py={3} maxW="400px" bg="#F4EBE8" rounded={10}>
							<HStack>
								<Icon mr={2} iconComp={FiMail} boxSize={10} p={2} rounded="full" color="#fff" bg="#4C473D" />
								<Stack spacing={0} justify="center">
									<Body variant="regular14" fontWeight="bold">
										funmiladai@arm.com
									</Body>
									<Body variant="regular13" color="neutral.100">
										Send an email to your Relationship Manager
									</Body>
								</Stack>
							</HStack>
						</Stack>
					</Stack>
				</Stack>
				<Divider orientation="vertical" />
				<Stack spacing="50px" maxW="400px">
					<Stack spacing={2}>
						<Body variant="semibold16" fontWeight="bolder" color="neutral-500">
							Contact ARM Support
						</Body>
						<Body variant="regular13" color="neutral-500">
							Lorem ipsum, dolor sit amet consectetur adipisicin
						</Body>
					</Stack>

					<Stack spacing={3}>
						<HStack>
							<Icon mr={2} iconComp={RiHeadphoneLine} fontWeight="bold" />
							<Body variant="regular13" color="neutral-500">
								01-2715002
							</Body>
						</HStack>
						<Divider maxW="300px" />
						<HStack>
							<Icon mr={2} iconComp={RiMailSendLine} fontWeight="bold" />
							<Body variant="regular13" color="neutral-500">
								enquiries@arm.com
							</Body>
						</HStack>
					</Stack>
					{/* <Stack spacing={0}>
						<Body variant="semibold16" color="neutral-500">
							Send Request to your Relationship Manager
						</Body>
						<Body variant="regular13" color="neutral.200">
							Lorem ipsum, dolor sit amet consectetur adipisicin
						</Body>
					</Stack>

					<Stack spacing={20}>
						<Select
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							options={gender}
							color="neutral-500"
							isBold={true}
							// isLoading={accountType.isFetching}
							// onChange={(option) => setAccountTypeOption(option)}
							// options={accountTypeOptions}
							// icon={{ iconComp: BsPeople }}
							// value="Brother"
							title="Type of interaction"
						/>

						<Button looks="accent" w={{ base: 'full', md: 'auto' }} size="md" px={10} py={3} fontWeight="normal" rounded={3}>
							Proceed
						</Button>
					</Stack>

					 */}
				</Stack>
			</Grid>
		</SettingsWrapper>
	)
}

export default RelationshipManager
