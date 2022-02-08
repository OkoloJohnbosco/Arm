import React from 'react'
import SettingsWrapper from './SettingsWrapper'
import { Stack, Grid, Button } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import Body from 'components/typography/Body'
import AtmCard from 'components/atm-card'

function AccountProfile() {
	return (
		<SettingsWrapper>
			<Stack>
				<Stack p={3}>
					<SubHeading fontSize="20px">Direct Debit</SubHeading>
					<Body variant="regular13" color="neutral.300">
						See and set up ur billing accounts for where you will automatically debited from
					</Body>
				</Stack>
			</Stack>
			<Stack>
				<Grid my="30px" rowGap={4} templateColumns={{ base: 'repeat(auto-fill, minmax(270px, 270px))' }} columnGap={5}>
					<AtmCard />
					<Button h="100%" minH="140px" border="1px solid rgba(0,0,0,.15)" rounded="10px" display="grid" placeItems="center" bg="transparent">
						<Stack>
							<Body variant="bold18">+</Body>
							<Body>Add Payment Method</Body>
						</Stack>
					</Button>
				</Grid>
			</Stack>
		</SettingsWrapper>
	)
}

export default AccountProfile
