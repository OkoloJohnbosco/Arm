import Facts from './Facts'
import { Flex, Stack, Box, VStack } from '@chakra-ui/layout'
import Details from './Tab'
import { StackCard } from 'components/card'
import { ProductType } from 'modules/account/types'
import React, { useContext } from 'react'
import ProductContext from '../ProductContext'
import Rocket from 'components/animations/Rocket'
import IfElse from 'components/if-else'
import Caption from 'components/typography/Caption'
import Button from 'components/button/Button'
import { ButtonGroup } from '@chakra-ui/react'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import Body from 'components/typography/Body'
type ProductDetailsPropType = {
	product: ProductType
}

const Index = () => {
	const { product, isQueuedForMix, closeDetails } = useContext(ProductContext)

	return (
		<Stack w="full" pb={0} direction={{ base: 'column-reverse', md: 'row' }} spacing={8} bg="#F7F7F7" overflow="auto">
			<Box>
				<Facts />
			</Box>

			<IfElse
				ifOn={isQueuedForMix}
				elseThen={
					<Box>
						<Details />
					</Box>
				}
			>
				<Stack spacing="4" p="8">
					<Rocket />
					<Caption alt>Added to Investment Mix Successfully</Caption>
					<Body>
						This investment solution has been added to your cart, you can click on proceed to investment mix to make payment, or click on add
						another solution
					</Body>

					<Button href={PAGES.INVESTMENT_SUBSCRIPTION} rounded="sm" alt>
						Proceed to Mix
					</Button>
				</Stack>
			</IfElse>
		</Stack>
		// </StackCard>
	)
}

export default Index
