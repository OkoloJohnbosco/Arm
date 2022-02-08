import { Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import useApiPostKyc from 'modules/hooks/kyc/useApiPostKyc'
import useKycContext from 'modules/hooks/kyc/useKycContext'
import useApiListCities, { CityType } from 'modules/hooks/useApiListCities'
import useApiListCountries, { CountryType } from 'modules/hooks/useApiListCountries'
import useApiListStates, { StateType } from 'modules/hooks/useApiListStates'
import React, { useMemo, useState } from 'react'
import { AiOutlineBank } from 'react-icons/ai'
import { RiBankLine } from 'react-icons/ri'
import { KycProps } from '../type'

enum Field {
	Country = 'country',
	State = 'state',
	LocalGovermentArea = 'local_government_area',
	City = 'city',
	Street = 'street',
	LandMark = 'landmark',
}

const UserAddress = ({ controller }: KycProps) => {
	const [countryOption, setCountryOption] = useState<OptionType<CountryType>>()
	const [street, setStreet] = useState('')
	const [landMark, setLandMark] = useState('')
	const [stateOption, setStateOption] = useState<OptionType<StateType>>()
	const [localGovermentArea, setLocalGovermentArea] = useState<OptionType>()
	const [cityOption, setCityOption] = useState<OptionType<CityType>>()
	const { refetchKyc } = useKycContext()
	const stage = controller.getPendingStage()
	const postKyc = useApiPostKyc()
	const countries = useApiListCountries()

	const countryOptions = useMemo(
		() => countries.value?.countries.sort((a, b) => (a.name > b.name ? 1 : -1)).map((option) => ({ value: option.id, label: option.name, option })),
		[countries.isFetching]
	)

	// const states = useStates({ mode: 'iso', id: countryOption?.option?.iso })

	// const stateOptions = useMemo(
	// 	() => states.value?.data.data.country.states.map((state) => ({ value: state.name, label: state.name, option: state })),
	// 	[countryOption?.value]
	// )

	const states = useApiListStates(countryOption?.value)

	const stateOptions = useMemo(() => states.value?.states?.map((state) => ({ value: state.id, label: state.name, option: state })), [states?.value])

	const cities = useApiListCities({ stateId: stateOption?.value, countryId: countryOption?.value })
	const cityOptions = useMemo(() => cities.value?.cities.map((state) => ({ value: state.name, label: state.name, option: state })), [cities?.value])
	// const cityOptions = useMemo(() => stateOption?.option?.cities.map((state) => ({ value: state.name, label: state.name, option: state })), [stateOption?.value])

	return (
		<Stack
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
											{ [Field.Country]: countryOption?.value },
											{ [Field.State]: stateOption?.value },
											{ [Field.Street]: street },
											{ [Field.LandMark]: landMark },
											{ [Field.LocalGovermentArea]: localGovermentArea?.value },
											//	{ [Field.AccountType]: accountTypeOption?.value },
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
			p="0"

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
						title="State"
					/>
				</Stack>
				<Stack direction={{ md: 'row', base: 'column' }}>
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

					<Select
						isRequired
						name={Field.LocalGovermentArea}
						// dropDownMatchContainer
						onChange={(option) => setLocalGovermentArea(option)}
						options={cityOptions}
						icon={{ iconComp: AiOutlineBank }}
						value={cityOption?.value}
						title="Province/Local Goverment"
					/>
				</Stack>
				<Input
					name={Field.Street}
					isRequired
					value={street}
					onChange={({ target }) => setStreet(target.value)}
					icon={{ iconComp: RiBankLine }}
					title="Street"
				/>
				<Input
					name={Field.LandMark}
					value={landMark}
					onChange={({ target }) => setLandMark(target.value)}
					icon={{ iconComp: RiBankLine }}
					title="Land Mark"
				/>
			</Stack>
			<Button type="submit" alt size="kg" looks="primary" isLoading={postKyc.isLoading}>
				Continue
			</Button>
		</Stack>
	)
}

export default UserAddress
