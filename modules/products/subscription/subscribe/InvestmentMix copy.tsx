import { HStack, Stack } from '@chakra-ui/layout'
import { Box, ButtonGroup, Switch } from '@chakra-ui/react'
import Back from 'components/navigation'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'
import Questions from 'components/progress/Circular'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import ProductSummaryCard from 'modules/products/product/ProductCard2'
import { InvestmentMixContext, InvestMentMixType, ProductType } from 'modules/account/types'
import StartPage from 'components/layout/components/start/Page'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCalendar, AiOutlineFileDone } from 'react-icons/ai'
import { HiOutlineCash } from 'react-icons/hi'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { investmentFrequencyOption, investmentDurationOption } from '../shared/config'
import { MdArrowForward } from 'react-icons/md'

type InvestMentMixProps = {
	limit: { max: number; min: number }
	mixProduct: InvestMentMixType
	onSaveMix: (mixedProduct: InvestMentMixType) => void
	onBack: () => void
	onContinue?: () => void
	isLoading: boolean
}

const InvestmentMix = ({ mixProduct, limit, onSaveMix, onContinue, isLoading, onBack }: InvestMentMixProps) => {
	const [currentMix, setCurrenMix] = useState<InvestMentMixType>(mixProduct)
	const { mixedProducts } = useContext(InvestmentMixContext)
	const { product, amountInvested: investedAmount } = currentMix

	useEffect(() => {
		setCurrenMix({ ...mixProduct, amountInvested: mixProduct.amountInvested || limit.min })
	}, [mixProduct])

	const onInvestmentChange = (field: keyof InvestMentMixType, value: any) => {
		switch (field) {
			case 'amountInvested':
				setCurrenMix({ ...currentMix, [field]: value || product?.minimum_investment })
				break
			default:
				setCurrenMix({ ...currentMix, [field]: value })
		}
	}

	const submitMix = (event) => {
		event.preventDefault()
		onSaveMix(currentMix)
	}

	return (
		<StackCard background={colors.white} spacing={4}>
			<Back onClick={onBack} />
			<Box>
				<ProductSummaryCard products={product as ProductType} />
			</Box>
			{/* <Stack spacing={4}>
				<Caption> Our Recommendation on Treasury Bill</Caption>
			</Stack> */}

			{/* <Stack spacing={8}>
				<Stack>
					<Body>William, here’s our Investment Mix Suggestion</Body>
					<Box>
						<HStack>
							<Box boxSize={2} background={colors['green']} rounded="full" />
							<Small color="green">Portfolio Percentage:</Small>
							<Small variant="semibold12" color="green">
								20%
							</Small>
						</HStack>
						<HStack>
							<Box boxSize={2} background={colors['green']} rounded="full" />
							<Small color="green">Amount:</Small>
							<Small variant="semibold12" color="green">
								N150,000
							</Small>
						</HStack>
					</Box>
				</Stack>
			</Stack> */}
			<Stack as="form" spacing={8} onSubmit={submitMix}>
				<Stack position="relative">
					<Input
						min={limit.min}
						max={limit.max}
						placeholder={`Amount ${product?.minimum_investment}`}
						error={
							investedAmount
								? investedAmount < limit.min || investedAmount > limit.max
									? `Amount cannot be less ${limit.min} or greater than ${limit.max}`
									: undefined
								: undefined
						}
						value={investedAmount}
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
					</Stack> */}
					{/* <HStack>
						<Switch size="sm" colorScheme="green" _focus={{ outline: 'none', shadow: 'none' }} _active={{ outline: 'none' }} />{' '}
						<Body variant="semibold12">Do you want this rolled over ?</Body>
					</HStack> */}
				</Stack>
				{/* <Stack w="full" direction={{ base: 'column', md: 'row' }}>
					<Box w="40%" as={Button} type="submit" looks="primary">
						Edit Next
					</Box>
					<Button
						isLoading={isLoading}
						isDisabled={!onContinue}
						onClick={(event) => {
							event.preventDefault()
							onContinue?.()
						}}
						w="full"
						looks="primary"
						type="submit"
					>
						Submit Product(s)
					</Button>
				</Stack> */}
				<Stack w="full" direction={{ base: 'column', md: 'row' }}>
					{/* <Box w="40%" as={Button} type="submit" looks="primary">
						Edit Next
					</Box> */}
					<Button
						isLoading={isLoading}
						//isDisabled={!onContinue}
						onClick={(event) => {
							event.preventDefault()
							if (onContinue) {
								onContinue?.()
							} else {
								onSaveMix(currentMix)
							}
						}}
						size="md"
						w="full"
						looks="primary"
						type="submit"
					>
						{onContinue ? ' Submit Product' : 'Edit Next'}
					</Button>
				</Stack>
			</Stack>
		</StackCard>
	)
}

export default React.memo(InvestmentMix)
