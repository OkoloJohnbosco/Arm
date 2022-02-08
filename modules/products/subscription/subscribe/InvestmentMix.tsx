import { HStack, Stack, Box } from '@chakra-ui/layout'
import { ButtonGroup, Switch, Progress } from '@chakra-ui/react'
import Back from 'components/navigation'
import { Button } from 'components/button'

import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'
import Questions from 'components/progress/Circular'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import ProductSummaryCard from 'modules/products/product/Product'
import { InvestmentMixContext, InvestMentMixType, ProductType } from 'modules/account/types'
import StartPage from 'components/layout/components/start/Page'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCalendar, AiOutlineFileDone } from 'react-icons/ai'
import { HiOutlineCash } from 'react-icons/hi'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { investmentFrequencyOption, investmentDurationOption } from '../shared/config'
import { MdArrowForward } from 'react-icons/md'
import { containsInvestmentMix } from './util'

type InvestMentMixProps = {
	limit?: { max: number; min: number }
	mixProduct: InvestMentMixType
	onSaveMix: (mixedProduct: InvestMentMixType) => void
	onBack: () => void
	onContinue?: () => void
	isLoading: boolean
}

const InvestmentMix = ({ mixProduct, limit, onSaveMix, onContinue, isLoading, onBack }: InvestMentMixProps) => {
	const [currentMix, setCurrenMix] = useState<InvestMentMixType>(mixProduct)
	const { mixedProducts } = useContext(InvestmentMixContext)
	const { product, amountInvested } = currentMix

	useEffect(() => {
		setCurrenMix({ ...mixProduct, amountInvested: mixProduct.amountInvested || product?.minimum_investment })
	}, [mixProduct])

	const onInvestmentChange = (field: keyof InvestMentMixType, value: any) => {
		switch (field) {
			case 'amountInvested':
				setCurrenMix({ ...currentMix, [field]: value || product?.minimum_investment })
				break
			case 'duration':
				setCurrenMix({ ...currentMix, [field]: value })
				break

			default:
				setCurrenMix({ ...currentMix, [field]: value })
		}
		console.log(field, value)
	}

	const submitMix = (event) => {
		event.preventDefault()
		onSaveMix(currentMix)
	}

	const hasUpdateAfterEditComplete = onContinue && !containsInvestmentMix(currentMix, mixedProducts)
	console.log(mixedProducts)
	return (
		<Stack as="form" spacing={6} onSubmit={submitMix}>
			{/* <Stack position="relative"> */}
			<Input
				min={product?.minimum_investment}
				// max={limit.max}
				placeholder={`Amount ${product?.minimum_investment}`}
				error={(amountInvested || 0) < (product?.minimum_investment || 0) ? `Amount cannot be less ${product?.minimum_investment}` : undefined}
				//defaultValue={product?.minimum_investment}
				value={amountInvested}
				onChange={({ target }) => onInvestmentChange('amountInvested', target.value)}
				icon={{ iconComp: HiOutlineCash }}
				type="number"
				title="How much do you want to invest here?"
			/>

			{/* <Input icon={{ iconComp: AiOutlineCalendar }} type="number" title="Select Treasury plan" /> */}
			{/* <Stack direction="row">
				<Select
					dropDownMatchContainer
					options={investmentFrequencyOption.map((option) => ({ ...option, option }))}
					icon={{ iconComp: AiOutlineCalendar }}
					onChange={(op) => onInvestmentChange('duration', op.option)}
					type="number"
					title="Repeat Every"
				/>
				<Select
					dropDownMatchContainer
					options={investmentDurationOption(currentMix.duration?.label)}
					icon={{ iconComp: AiOutlineCalendar }}
					type="number"
					title="Duration"
				/>
			</Stack>
			<HStack>
				<Switch size="sm" colorScheme="green" _focus={{ outline: 'none', shadow: 'none' }} _active={{ outline: 'none' }} />{' '}
				<Body variant="semibold12">Do you want this rolled over ?</Body>
			</HStack> */}

			<Stack justify="center" direction={{ base: 'column', md: 'row' }}>
				<Button
					isLoading={isLoading}
					//isDisabled={!onContinue}
					onClick={(event) => {
						event.preventDefault()
						if (onContinue && !hasUpdateAfterEditComplete) {
							onContinue?.()
						} else {
							onSaveMix(currentMix)
						}
					}}
					alt
					w="full"
					size="md"
					looks="primary"
					type="submit"
				>
					{onContinue ? (hasUpdateAfterEditComplete ? 'Update' : ' Submit Product') : mixProduct.amountInvested ? 'Update' : 'Edit Next'}
				</Button>
			</Stack>
		</Stack>
	)
}

export default React.memo(InvestmentMix)
