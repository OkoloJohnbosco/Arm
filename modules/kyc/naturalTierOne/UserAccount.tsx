import { Box, Stack, VStack } from '@chakra-ui/react'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Select, { OptionType } from 'components/input/select'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'
import { colors } from 'lib/theme'
import { AccountTypeCode } from 'modules/hooks/account/useApiListAccountTypes'
import React, { useContext, useState } from 'react'
import { AiOutlineBank } from 'react-icons/ai'
import { InvestmentProcessContext } from '../../products/subscription/type'
import { KycProps } from '../type'

enum Field {
	AccountType = 'account_type',
}

const BasicDetails = ({ controller }: KycProps) => {
	const [accountType, setAccountType] = useState<OptionType>()
	const stage = controller.getPendingStage()
	return (
		<Stack
			onSubmit={(event) => {
				event.preventDefault()
				//onNext()
				// initiateInvestmentData && onComplete(initiateInvestmentData)
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
				<Box position="relative">
					<Select
						//	isRequired
						name={Field.AccountType}
						value={accountType}
						dropDownMatchContainer
						options={[AccountTypeCode.Corporate, AccountTypeCode.Individual, AccountTypeCode.Joint, AccountTypeCode.Minor].map((option) => ({
							value: option,
							label: option,
							option,
						}))}
						onChange={({ option }) => setAccountType(option)}
						icon={{ iconComp: AiOutlineBank }}
						title="What kind of account do intend to operate?"
					/>
				</Box>
				{/* <Box position="relative">
						<Select
							//	isRequired
							dropDownMatchContainer
							icon={{ iconComp: AiOutlineUsergroupAdd }}
							title="2. Will this investment be for you alone or with someone else?"
						/>
					</Box>

					<HStack>
						<Switch size="sm" colorScheme="green" _focus={{ outline: 'none', shadow: 'none' }} _active={{ outline: 'none' }} />{' '}
						<Body variant="semibold12">There is a minor on this account? (Ages 1-17)</Body>
					</HStack> */}
			</Stack>
			<Button type="submit" looks="primary">
				Continue
			</Button>
		</Stack>
	)
}

export default React.memo(BasicDetails)
