import { Box, HStack, Stack, Switch } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Select from 'components/input/select'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import React, { useState } from 'react'
import { BiChurch } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import FileUpload from '../../components/input/file'
import { maritalStatusOptionType, religionOptionType } from '../products/subscription/shared/config'
import { InitiateInvestmentType } from '../products/subscription/type'
import { KycProps } from './type'

type InitiateInvestmentMixProps = {
	onComplete: (initiateData: InitiateInvestmentType) => void
	initiateInvestmentData?: InitiateInvestmentType
	onChange: (field: keyof InitiateInvestmentType, value: any) => void
	minimumInvestmentAmount: number
}

const BasicDetails = (props: KycProps) => {
	const [selfie, setSelfie] = useState()
	return (
		<Stack
			onSubmit={(event) => {
				event.preventDefault()
				props.onComplete()
				// initiateInvestmentData && onComplete(initiateInvestmentData)
			}}
			background={colors.white}
			spacing={8}
			as="form"
			flex={6}

			//	px={{ md: 8, base: 4 }}
		>
			<Box onClick={() => props.onComplete()}>Skip</Box>
			<Box>
				<Caption>KYC Upload Tier 1</Caption>
				<Small alt>Please complete this section</Small>
			</Box>
			<Stack>
				<Box position="relative">
					<FileUpload
						title="Upload a selfie of yourself"
						isRequired
						containerStyle={{ w: 'fit-content', align: 'center', justify: 'center', background: 'none' }}
						accept={[]}
						file={selfie}
						onSelectFile={setSelfie}
					/>
				</Box>
				<Box position="relative">
					<Select
						//	isRequired
						dropDownMatchContainer
						options={maritalStatusOptionType.map((option) => ({ ...option, option }))}
						icon={{ iconComp: BsPeople }}
						title="Marital Status"
					/>
				</Box>

				<Box position="relative">
					<Select
						//	isRequired
						dropDownMatchContainer
						options={religionOptionType.map((option) => ({ ...option, option }))}
						icon={{ iconComp: BiChurch }}
						title="Religion"
					/>
				</Box>
				<HStack>
					<Switch size="sm" colorScheme="green" _focus={{ outline: 'none', shadow: 'none' }} _active={{ outline: 'none' }} />{' '}
					<Body variant="semibold12">There is a minor on this account? (Ages 1-17)</Body>
				</HStack>
			</Stack>
			<Button type="submit" looks="primary">
				Continue
			</Button>
		</Stack>
	)
}

export default React.memo(BasicDetails)
