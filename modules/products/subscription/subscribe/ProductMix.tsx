import { HStack, Stack } from '@chakra-ui/layout'
import { Switch } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Input from 'components/input'
import Select, { OptionType } from 'components/input/select'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import { SESSION_STORAGE_MIX_CART } from 'constant'
import { useBroadcastStorage } from 'lib/broadcastStorage'
import { colors } from 'lib/theme'
import { InvestMentMixType } from 'modules/account/types'
import React, { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { HiOutlineCash } from 'react-icons/hi'
import { IoArrowForward, IoWalletOutline } from 'react-icons/io5'
import { investmentDurationOption, investmentFrequencyOption } from '../shared/config'
import { InitiateInvestmentType } from '../type'

type InitiateInvestmentMixProps = {
	onComplete: (initiateData: InitiateInvestmentType) => void
	initiateInvestmentData?: InitiateInvestmentType
	onChange: (field: keyof InitiateInvestmentType, value: any) => void
	minimumInvestmentAmount: number
}

const InitiateInvestmentMix = ({ onComplete, initiateInvestmentData, onChange, minimumInvestmentAmount }: InitiateInvestmentMixProps) => {
	return (
		<StackCard
			onSubmit={(event) => {
				event.preventDefault()
				initiateInvestmentData && onComplete(initiateInvestmentData)
			}}
			spacing={8}
			as="form"
			//	px={{ md: 8, base: 4 }}
		>
			<Stack>
				<Input
					isRequired
					min={minimumInvestmentAmount}
					placeholder={`${initiateInvestmentData?.totalInvestmentAmount}`}
					value={initiateInvestmentData?.totalInvestmentAmount}
					onChange={({ target }) => onChange('totalInvestmentAmount', target.value)}
					icon={{ iconComp: IoWalletOutline }}
					type="number"
					title="How much do you want to start with?"
				/>

				<Input
					onChange={({ target }) => onChange('frequencyAmount', target.value)}
					isRequired
					placeholder="Enter Amount"
					icon={{ iconComp: IoWalletOutline }}
					type="number"
					title="How much do you want to pay?"
				/>
				<Stack direction="row" position="relative">
					<Select
						//	isRequired
						dropDownMatchContainer
						options={investmentFrequencyOption.map((option) => ({ ...option, option }))}
						icon={{ iconComp: AiOutlineCalendar }}
						onChange={(op) => onChange('investmentFrequencyUnit', op.option)}
						type="number"
						title="Investment Period?"
					/>
					<Select
						isRequired
						onChange={(op) => {
							console.log(op)
							onChange('investmentDuration', op)
						}}
						isDisabled={!initiateInvestmentData?.investmentFrequencyUnit?.label}
						dropDownMatchContainer
						options={investmentDurationOption(initiateInvestmentData?.investmentFrequencyUnit?.label)}
						icon={{ iconComp: AiOutlineCalendar }}
						type="number"
						title="Duration"
					/>
				</Stack>
				<Small color="purple-500">
					*The longer you save, the more your interest and investment grows. Please note that early withdrawal of investment is not allowed
				</Small>
			</Stack>

			<Button type="submit" looks="primary" rightIcon={<IoArrowForward />}>
				Continue
			</Button>
		</StackCard>
	)
}

export default React.memo(InitiateInvestmentMix)
