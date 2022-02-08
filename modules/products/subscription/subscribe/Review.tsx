import { Flex, HStack, Stack } from '@chakra-ui/layout'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Divider from 'components/divider'
import IfElse from 'components/if-else'
import LoadingSpinner from 'components/animations/loadingSpinner'
import Money from 'components/money'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import { InvestmentMixContext } from 'modules/account/types'
import React, { useContext } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import useInvestmentMix from 'modules/hooks/investment/useApiGetInvestmentMix'
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import LoadingWrapper from 'components/layout/loading-wrapper'
import { InvestmentProcessContext } from '../type'
import SubHeading from 'components/typography/SubHeading'
import { scrollToSelector } from 'utils/helpers'
import { hexToRGBA3 } from 'lib/theme/color'

const MixReview = () => {
	const { mixedProducts, setCurrentMixProduct, initiateInvestmentData } = useContext(InvestmentMixContext)
	const { mixId } = useContext(InvestmentProcessContext)

	return (
		<StackCard borderBottomColor="claret.500" borderBottomWidth="1px" background={colors.white} flex={4} spacing={8} maxH="lg" overflow="scroll">
			<IfElse
				ifOn={initiateInvestmentData}
				// ifOn={mixedProducts?.length && initiateInvestmentData}
				elseThen={
					<Flex h="100%" w="100%" alignContent="center" justifyContent="center">
						<LoadingSpinner />
					</Flex>
				}
			>
				<Stack spacing={4}>
					<Stack spacing="4">
						<Caption alt>Your Financial Commitments</Caption>
						<Stack>
							{mixedProducts?.map((mixProduct) => (
								<HStack justify="space-between" key={mixProduct.product?.name}>
									<Flex align="center">
										<Small color="neutral.400">{mixProduct.product?.name}:</Small> &nbsp;
										<Money color="neutral.600" variant="semibold12" currency={mixProduct.product?.currency.currency_code}>
											{mixProduct.amountInvested}
										</Money>
									</Flex>
									<Button
										_hover={{
											bg: 'green.500',
										}}
										border="none"
										//color='neutral.600'
										py="2"
										w="16"
										h="6"
										background={'green'}
										alt
										fontSize="xs"
										rightIcon={<BiEditAlt />}
										onClick={() => {
											scrollToSelector('#mix-container')
											setCurrentMixProduct?.(mixProduct)
										}}
									>
										Edit
									</Button>
								</HStack>
							))}
						</Stack>
					</Stack>
				</Stack>
			</IfElse>
		</StackCard>
	)
}

export default MixReview
