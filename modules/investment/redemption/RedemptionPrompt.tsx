import { Box, Flex, Stack, VStack } from '@chakra-ui/react'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'
import { colors } from 'lib/theme'
import React, { useMemo, useState } from 'react'
import { Button } from 'components/button'
import LinkText from 'components/link/ArrowLink'
import { PAGES } from 'constant'
import { useRouter } from 'next/router'
import Baloon from 'components/animations/Baloon'
import Select, { OptionType } from 'components/input/select'
import useInvestedProducts from 'modules/hooks/investment/useApiListInvestmentsDetails'
import { ProductInvestmentType } from 'modules/account/types'

type Props = {
	onContinue: (product: ProductInvestmentType) => void
}

const RedemptionPrompt = ({ onContinue }: Props) => {
	const router = useRouter()
	const { value } = useInvestedProducts()
	const [redemptionOption, setRedemptionOption] = useState<ProductInvestmentType>()

	const redemptionOptions = useMemo(
		() =>
			value?.customer_businesses.reduce(
				//@ts-ignore
				(accum, business) => {
					const businessProducts = business.products.map((p) => ({ value: p.id, label: p.name, option: p }))
					return [...accum, ...businessProducts]
				},
				[]
			),
		[value]
	)

	return (
		<Stack height="md" color="neutral.0">
			<VStack
				align="flex-start"
				justify="center"
				position="relative"
				top="-2px"
				flex="4"
				bg="claret.200"
				px={{ base: '6', md: '8' }}
				rounded="lg"
				borderBottomRadius="0"
			>
				<SubHeading>Instant Redemption</SubHeading>
				<Small>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus amet, nibh nec arcu arcu, risus, magna a volutpat. Non enim platea
					rutrum aliquet elementum.
				</Small>
			</VStack>
			<Stack flex="6" px={{ base: '6', md: '8' }} py="4" rounded="lg" spacing="0">
				<SubHeading color="claret.600" alt>
					Pick an Investment Solution to redeem funds from
				</SubHeading>

				<Select
					value={redemptionOption?.id}
					//@ts-ignore
					options={redemptionOptions}
					title="Select Investment Solution"
					onChange={({ option }) => setRedemptionOption(option)}
				/>
				<Box pt="8" w="full">
					<Button
						isDisabled={!redemptionOption?.id}
						w="full"
						size="lg"
						alt
						onClick={() => redemptionOption && onContinue(redemptionOption)}
						looks="primary"
					>
						Continue
					</Button>
				</Box>
			</Stack>
		</Stack>
	)
}

export default RedemptionPrompt
