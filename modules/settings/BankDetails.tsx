import React from 'react'
import SettingsWrapper from './SettingsWrapper'
import { Stack, HStack, Grid } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import Body from 'components/typography/Body'

function BankDetails() {
	return (
		<SettingsWrapper>
			<Stack spacing={7}>
				<Stack borderBottom="1px solid rgba(0,0,0,.15)" maxW="400px">
					<HStack p={4}>
						<SubHeading>Bank Details</SubHeading>
					</HStack>
				</Stack>
				<Stack spacing={3} maxW="400px">
					<Grid w="full" templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 1, md: 5 }}>
						<SubHeading fontSize="18px">Account Number:</SubHeading>
						<Body color="neutral.100">0073573781</Body>
					</Grid>
					<Grid w="full" templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 1, md: 5 }}>
						<SubHeading fontSize="18px">Name on Account:</SubHeading>
						<Body color="neutral.100">Okolo Johnbosco</Body>
					</Grid>
					<Grid w="full" templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 1, md: 5 }}>
						<SubHeading fontSize="18px">Bank Name:</SubHeading>
						<Body color="neutral.100">Zenith Bank</Body>
					</Grid>
					<Grid w="full" templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 1, md: 5 }}>
						<SubHeading fontSize="18px">BVN:</SubHeading>
						<Body color="neutral.100">22455****</Body>
					</Grid>
				</Stack>
			</Stack>
		</SettingsWrapper>
	)
}
export default BankDetails
