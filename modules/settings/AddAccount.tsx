import React from 'react'
import SettingsWrapper from './SettingsWrapper'
import { Stack, HStack, Grid } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import Body from 'components/typography/Body'
import Button from 'components/button/Button'
import { PAGES } from 'constant'

function AddAccount() {
	return (
		<SettingsWrapper>
			<Stack spacing={7}>
				<Stack>
					<HStack>
						<SubHeading fontSize="20px">Hi William,</SubHeading>
					</HStack>
					<Body>Click the get started button below to add other ARM accounts</Body>
				</Stack>
				<Stack pt={4} maxW="300px">
					<Button looks="accent" href={PAGES.DASHBOARD.MANAGE_SUBSIDIARY}>
						Add Account
					</Button>
				</Stack>
			</Stack>
		</SettingsWrapper>
	)
}
export default AddAccount
