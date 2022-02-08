import { Box, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import useApiListRelationship from 'modules/hooks/account/useApiListRelationship'
import useApiPostKyc from 'modules/hooks/kyc/useApiPostKyc'
import useKycContext from 'modules/hooks/kyc/useKycContext'
import useApiListCities, { CityType } from 'modules/hooks/useApiListCities'
import useApiListCountries, { CountryType } from 'modules/hooks/useApiListCountries'
import useApiListStates, { StateType } from 'modules/hooks/useApiListStates'
import React, { useMemo, useState } from 'react'
import { AiOutlineBank, AiOutlineCalendar, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { BiChurch } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { FaAddressBook } from 'react-icons/fa'
import { HiPhone } from 'react-icons/hi'
import { IoPersonOutline } from 'react-icons/io5'
import { RiBankLine } from 'react-icons/ri'
import { genderOptionType } from '../../products/subscription/shared/config'
import { KycProps } from '../type'

enum Field {
	Title = 'title',
	FirstName = 'first_name',
	LastName = 'last_name',
	Country = 'nationality',
	State = 'state',
	LocalGovermentArea = 'local_government_area',
	BirthDate = 'date_of_birth',
	PlaceOfBirth = 'place_of_birth',
	MaritalStatus = 'marital_status_id',
	City = 'city',
	LandMark = 'landmark',
	Gender = 'gender_id',
	Relationship = 'relationship_id',
	OtherNames = 'other_names',
	Address = 'address',
	Email = 'email',
}

const titleOptions = ['Mr', 'Mrs', 'Miss', 'Master'].map((option) => ({ value: option, label: option, option }))
const genderOptions = ['Male', 'Female', 'Transgender', 'Prefer to not mention'].map((option) => ({ value: option, label: option, option }))
const maritalStatusOptions = ['Single', 'Married', 'Divource', 'Widow', 'Prefer to not mention'].map((option) => ({
	value: option,
	label: option,
	option,
}))

const NextOfKinsForm = ({ controller, onComplete }: KycProps) => {
	const [email, setEmail] = useState('')
	const [placeOfBirth, setPlaceOfBirth] = useState('')
	const [titleOption, setTitleOption] = useState<OptionType<string>>()
	const [genderOption, setGenderOption] = useState<OptionType<string>>()
	const [address, setAdress] = useState('')
	const [relationshipOption, setRelationshipOption] = useState<OptionType<string>>()
	const [maritalStatus, setMaritalStatus] = useState<OptionType<string>>()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [otherNames, setOtherNames] = useState('')
	const [stateOption, setStateOption] = useState<OptionType<StateType>>()
	const [birthDate, setBirthDate] = useState('')
	const [countryOption, setCountryOption] = useState<OptionType<CountryType>>()
	const [cityOption, setCityOption] = useState<OptionType<CityType>>()
	const countries = useApiListCountries()
	const countryOptions = useMemo(
		() => countries.value?.countries.sort((a, b) => (a.name > b.name ? 1 : -1)).map((option) => ({ value: option.id, label: option.name, option })),
		[countries.isFetching]
	)

	const states = useApiListStates(countryOption?.value)
	const stateOptions = useMemo(() => states.value?.states?.map((state) => ({ value: state.id, label: state.name, option: state })), [states?.value])

	const cities = useApiListCities({ stateId: stateOption?.value, countryId: countryOption?.value })
	const cityOptions = useMemo(() => cities.value?.cities.map((state) => ({ value: state.name, label: state.name, option: state })), [cities?.value])

	const relationship = useApiListRelationship()
	const relationShipOptions = relationship.value?.relationships.map((option) => ({
		value: option.code,
		label: option.name,
		option,
	}))
	const stage = controller.getPendingStage()
	const { refetchKyc } = useKycContext()
	const postKyc = useApiPostKyc()

	return (
		<Stack
			maxH="lg"
			overflowY="scroll"
			onSubmit={(event) => {
				event.preventDefault()
				postKyc
					.mutateAsync({
						customer_kyc: [
							{
								unique_code: stage?.unique_id as string,
								stages: [
									{
										stage: stage?.stage.code as any,
										data: [
											{ [Field.Title]: titleOption?.value },
											{ [Field.FirstName]: firstName },

											{ [Field.LastName]: lastName },
											{ [Field.OtherNames]: otherNames },
											{ [Field.Gender]: genderOption?.value },
											{ [Field.MaritalStatus]: maritalStatus?.value },
											{ [Field.PlaceOfBirth]: placeOfBirth },
											{ [Field.Country]: countryOption?.value },
											{ [Field.Relationship]: relationshipOption?.value },
											{ [Field.Email]: email },
											{ [Field.State]: stateOption?.value },
											{ [Field.Address]: address },
											{ [Field.City]: cityOption?.value },
										],
									},
								],
							},
						],
					})
					.then(refetchKyc)
			}}
			background={colors.white}
			spacing={8}
			as="form"
			flex={6}

			//	px={{ md: 8, base: 4 }}
		>
			<Caption alt textAlign="center">
				{stage?.stage.name}
			</Caption>
			<Stack>
				<Caption alt>{`${stage?.first_name} ${stage?.last_name}`}</Caption>
				<Small alt> Please answer a few more questions for me</Small>
			</Stack>
			<Stack>
				<Select
					isRequired
					name={Field.Title}
					onChange={(option) => setTitleOption(option)}
					options={titleOptions}
					icon={{ iconComp: IoPersonOutline }}
					value={titleOption?.value}
					title="Title"
				/>
				<Input
					icon={{ iconComp: AiOutlineMail }}
					type="email"
					value={email}
					onChange={({ target }) => setEmail(target.value)}
					//	options={investmentDurationOption(currentMix.duration?.label)}
					title="Email Address"
				/>
				<Stack direction={{ md: 'row', base: 'column' }}>
					<Input
						isRequired
						name={Field.FirstName}
						onChange={({ target }) => setFirstName(target.value)}
						icon={{ iconComp: IoPersonOutline }}
						value={firstName}
						title="First Name"
					/>
					<Input
						isRequired
						name={Field.LastName}
						onChange={({ target }) => setLastName(target.value)}
						icon={{ iconComp: BsPeople }}
						value={lastName}
						title="Last Name"
					/>
				</Stack>
				<Stack direction={{ md: 'row', base: 'column' }}>
					<Input
						isRequired
						name={Field.OtherNames}
						onChange={({ target }) => setOtherNames(target.value)}
						icon={{ iconComp: BsPeople }}
						value={otherNames}
						title="Other Names"
					/>
					<Select
						isRequired
						name={Field.Gender}
						onChange={(option) => setGenderOption(option)}
						options={genderOptions}
						icon={{ iconComp: BsPeople }}
						value={genderOption?.value}
						title="Gender"
					/>
				</Stack>
				<Stack direction={{ md: 'row', base: 'column' }}>
					<Select
						isRequired
						isLoading={!countryOptions?.length && countries.isFetching}
						name={Field.Country}
						// dropDownMatchContainer
						onChange={(option) => setCountryOption(option)}
						options={countryOptions}
						icon={{ iconComp: AiOutlineBank }}
						value={countryOption}
						title="Country"
					/>
					<Select
						isLoading={states.isFetching}
						isRequired
						name={Field.State}
						// dropDownMatchContainer
						onChange={(option) => setStateOption(option)}
						options={stateOptions}
						icon={{ iconComp: AiOutlineBank }}
						value={stateOption}
						isDisabled={!countryOption}
						title="State"
					/>
				</Stack>
				<Select
					isRequired
					name={Field.City}
					// dropDownMatchContainer
					onChange={(option) => setCityOption(option)}
					options={cityOptions}
					icon={{ iconComp: AiOutlineBank }}
					value={cityOption?.value}
					title="City"
				/>
				<Stack direction={{ md: 'row', base: 'column' }}>
					<Input
						name={Field.PlaceOfBirth}
						isRequired
						value={placeOfBirth}
						onChange={({ target }) => setPlaceOfBirth(target.value)}
						icon={{ iconComp: RiBankLine }}
						title="Birth Place"
						placeholder="Birth Place"
					/>
					<Input
						name={Field.BirthDate}
						isRequired
						value={birthDate}
						type="date"
						onChange={({ target }) => setBirthDate(target.value)}
						icon={{ iconComp: RiBankLine }}
						title="Date of Birth"
						placeholder="Date of Birth"
					/>
				</Stack>

				<Stack direction={{ md: 'row', base: 'column' }}>
					<Select
						isLoading={!relationShipOptions?.length && relationship.isFetching}
						isRequired
						name={Field.Relationship}
						onChange={(option) => setRelationshipOption(option)}
						options={relationShipOptions}
						icon={{ iconComp: BsPeople }}
						value={relationshipOption?.value}
						title="Relationship"
					/>
					<Select
						isRequired
						name={Field.MaritalStatus}
						onChange={(option) => setMaritalStatus(option)}
						options={maritalStatusOptions}
						icon={{ iconComp: BiChurch }}
						value={maritalStatus?.value}
						title="Marital Status"
					/>
				</Stack>
				<Input
					name={Field.Address}
					isRequired
					value={address}
					onChange={({ target }) => setAdress(target.value)}
					icon={{ iconComp: RiBankLine }}
					title="Street"
				/>
			</Stack>
			<Button type="submit" looks="primary">
				Continue
			</Button>
		</Stack>
	)
}

export default React.memo(NextOfKinsForm)
