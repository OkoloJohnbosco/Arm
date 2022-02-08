import { Box, Flex, Stack, VStack } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Select from 'components/input/select'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import React, { useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { IoDocumentTextOutline } from 'react-icons/io5'
import FileUpload from '../../components/input/file'
import { maritalStatusOptionType, religionOptionType } from '../products/subscription/shared/config'
import { InitiateInvestmentType } from '../products/subscription/type'
import { KycProps } from './type'

const UploadComponent = (file: any) => {
	return (
		<Flex p={4} rounded="md" background={colors['neutral-50']} align="center" justify="center">
			<VStack spacing={0}>
				<AiOutlineCamera size={24} />
				<Body variant="semibold13">Click to upload</Body>
			</VStack>
		</Flex>
	)
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
				<Caption>Document Upload</Caption>
				<Small alt>Please complete this section</Small>
			</Box>
			<Stack>
				<Stack>
					<Body variant="semibold12" lineHeight={1.5}>
						Upload Valid ID Image (Intl. passport, NIN, drivers license, voters card, Inland Revenue Tax Clearance Certificate, Residence Permit
						issued by Immigration authorities.
					</Body>
					<FileUpload
						previewComp={UploadComponent}
						//title="Upload a selfie of yourself"
						isRequired
						containerStyle={{ w: 'full', p: -1, align: 'center', justify: 'center' }}
						accept={[]}
						file={selfie}
						onSelectFile={setSelfie}
					/>
				</Stack>
				<Box position="relative">
					<Select
						//	isRequired
						dropDownMatchContainer
						options={maritalStatusOptionType.map((option) => ({ ...option, option }))}
						icon={{ iconComp: IoDocumentTextOutline }}
						title="Proof of Residential Address"
					/>
					<FileUpload
						previewComp={UploadComponent}
						//title="Upload a selfie of yourself"
						isRequired
						containerStyle={{ w: 'full', p: -1, align: 'center', justify: 'center' }}
						accept={[]}
						file={selfie}
						onSelectFile={setSelfie}
					/>
				</Box>

				<Box position="relative">
					<Select
						//	isRequired
						dropDownMatchContainer
						options={religionOptionType.map((option) => ({ ...option, option }))}
						icon={{ iconComp: IoDocumentTextOutline }}
						title="Source of Funds Used For This Investment"
					/>
					<FileUpload
						previewComp={UploadComponent}
						//title="Upload a selfie of yourself"
						isRequired
						containerStyle={{ w: 'full', p: -1, align: 'center', justify: 'center' }}
						accept={[]}
						file={selfie}
						onSelectFile={setSelfie}
					/>
				</Box>
			</Stack>
			<Button type="submit" looks="primary">
				Continue
			</Button>
		</Stack>
	)
}

export default React.memo(BasicDetails)
