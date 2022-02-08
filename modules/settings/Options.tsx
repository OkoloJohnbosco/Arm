import React from 'react'
import SettingsWrapper from './SettingsWrapper'
import { Stack, HStack, RadioGroup, Radio, AccordionItem, AccordionButton, Accordion, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react'
import Button from 'components/button/Button'
import PasswordInput from 'components/input/password'
import { MdRedeem } from 'react-icons/md'
import { RiLock2Fill } from 'react-icons/ri'
import Icon from 'components/icon'
import { GiLobArrow } from 'react-icons/gi'

function Options() {
	return (
		<SettingsWrapper>
			<Accordion allowToggle>
				<AccordionItem mb={3} border="none">
					<h2>
						<AccordionButton shadow="sm" _expanded={{ shadow: 'md' }} maxW="250px">
							<Box flex="1" display="flex" textAlign="left" alignItems="center" color="#777">
								<Icon iconComp={RiLock2Fill} mr={2} />
								Change Password
							</Box>
							<AccordionIcon style={{ color: '#777' }} />
						</AccordionButton>
					</h2>
					<AccordionPanel pl={-1} py={5}>
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

						<HStack justify="flex-start" mt={6}>
							<Button maxW="400px" looks="accent" size="md" w={{ base: 'full', md: 'auto' }} px={10} py={3} fontWeight="normal" rounded={0}>
								Save Changes
							</Button>
						</HStack>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem border="none">
					<h2>
						<AccordionButton maxW="250px" shadow="sm" _expanded={{ shadow: 'md' }}>
							<Box flex="1" textAlign="left" display="flex" alignItems="center" color="#777">
								<Icon iconComp={GiLobArrow} mr={2} />
								Redemption Method
							</Box>
							<AccordionIcon style={{ color: '#777' }} />
						</AccordionButton>
					</h2>
					<AccordionPanel pl={-1} py={5}>
						<Stack spacing={10}>
							<Stack spacing={3} maxW="400px">
								<RadioGroup defaultValue="1">
									<Stack>
										<Radio colorScheme="claret" value="1">
											Use Pin
										</Radio>
										<Radio colorScheme="claret" value="2">
											Use Otp
										</Radio>
									</Stack>
								</RadioGroup>
							</Stack>
							<HStack justify="flex-start">
								<Button maxW="400px" looks="accent" size="md" w={{ base: 'full', md: 'auto' }} px={10} py={3} fontWeight="normal" rounded={0}>
									Save Changes
								</Button>
							</HStack>
						</Stack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</SettingsWrapper>
	)
}
export default Options
