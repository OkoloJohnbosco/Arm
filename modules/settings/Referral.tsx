import React from 'react'
import SettingsWrapper from './SettingsWrapper'
import { Stack, HStack, Grid, Kbd } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import Body from 'components/typography/Body'
import Input from 'components/input'
import Button from 'components/button/Button'

function Referral() {
	return (
		<SettingsWrapper>
			<Stack spacing={7}>
				<Stack borderBottom="1px solid rgba(0,0,0,.15)" maxW="500px">
					<HStack p={4}>
						<SubHeading>Referral</SubHeading>
					</HStack>
				</Stack>
				<Stack spacing={3} maxW="500px">
					<Body>
						Your unique referal code is <Kbd>Zys57uIt6</Kbd>
					</Body>

					<Stack pt={7}>
						<Input
							containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
							backgroundColor="#F4F5F7"
							color="neutral-500"
							isBold={true}
							placeholder="Willjohnson@gmail.com"
							title="Invite peopele to join ARM Engage"
						/>

						<Stack w="full" spacing={4} direction={{ base: 'column', md: 'row' }}>
							<Button looks="accentOutline" w={{ md: 'auto', base: 'full' }} size="md" px={10} py={3} rounded={3}>
								Send Invite
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</SettingsWrapper>
	)
}
export default Referral
