import React from 'react'
import SettingsWrapper from '../SettingsWrapper'
import { Stack, HStack, Grid } from '@chakra-ui/react'
import Input from 'components/input'
import SubHeading from 'components/typography/SubHeading'
import Button from 'components/button/Button'
import Select, { OptionType } from 'components/input/select'
import Textarea from 'components/input/textarea'
import Body from 'components/typography/Body'

const gender = [
	{ value: 1, label: 'Male', option: 'Gender' },
	{ value: 2, label: 'Femail', option: 'Gender' },
]

function Redemption() {
	return (
		<SettingsWrapper>
			<Stack spacing={3}>
				<Stack spacing={1}>
					<SubHeading fontSize="20px">William O. Johnson</SubHeading>
					<Body color="neutral.100" variant="regular13">
						Membership ID: Wil97190
					</Body>
					<Body color="neutral.100" variant="regular13">
						Phone Number: 09024987362
					</Body>
				</Stack>
			</Stack>
			<Stack maxW="800px">
				<Grid
					my="30px"
					rowGap={4}
					templateColumns={{ base: 'repeat(auto-fill, minmax(260px, 1fr))', md: 'repeat(auto-fill, minmax(300px, 1fr))' }}
					columnGap={6}
				>
					<Input
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						color="neutral-500"
						autoFocus
						isBold={true}
						placeholder="NGN 245,000"
						title="Enter Amount"
					/>

					<Select
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						isBold={true}
						color="neutral-500"
						options={gender}
						// isLoading={accountType.isFetching}
						// onChange={(option) => setAccountTypeOption(option)}
						// options={accountTypeOptions}
						// icon={{ iconComp: BsPeople }}
						// value="Male"
						title="Why are you redemping this fund?"
					/>

					<Textarea
						containerStyle={{ borderColor: '#B3BAC5', boxShadow: '', borderRadius: 5 }}
						backgroundColor="#F4F5F7"
						placeholder="Leave a note"
						color="neutral-500"
						minH="100px"
						isBold={true}
					/>
				</Grid>
			</Stack>

			<HStack w="full">
				<Button looks="accent" w={{ base: 'full', md: 'auto' }} fontFamily="inherit" size="md" px={10} py={3} fontWeight="normal" rounded={3}>
					Submit Redemption
				</Button>
			</HStack>
		</SettingsWrapper>
	)
}

export default Redemption
