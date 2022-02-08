import { Flex, Stack, Box, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import { Card, StackCard } from 'components/card'
import Tag from 'components/tag'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import React, { useContext } from 'react'
import { Button } from 'components/button'
import ProductContext from '../ProductContext'
import Money, { moneyTostring } from 'components/money'
import { SESSION_STORAGE_MIX_CART } from 'constant'
import { useBroadcastStorage, setBroadcastStorage } from 'lib/broadcastStorage'
import { ProductType } from 'modules/account/types'
import IfElse from 'components/if-else'
import { filter } from 'lodash'
import Caption from 'components/typography/Caption'

const Details = () => {
	// const storage = useBroadcastStorage(SESSION_STORAGE_MIX_CART)
	const { product, isQueuedForMix, setQueueMix } = useContext(ProductContext)
	const { name, fund_size, currency, incentive_fee, risk_level, date_created, offer_price, bid_price, effective_yield, management_fee } = product
	// const investmentMix: ProductType[] = JSON.parse(storage || '[]') || []
	// const isAdded = investmentMix.some((p) => p.id == product.id)

	// const handleAddProduct = ({ product, action }: { product: ProductType; action: 'add' | 'remove' }) => {
	// 	switch (action) {
	// 		case 'add':
	// 			const update = [...investmentMix, product]
	// 			console.log(update)
	// 			setBroadcastStorage(SESSION_STORAGE_MIX_CART, JSON.stringify(update), 'sessionStorage')
	// 			break
	// 		case 'remove':
	// 			const filter = investmentMix.filter((p) => p.id !== product.id)
	// 			setBroadcastStorage(SESSION_STORAGE_MIX_CART, JSON.stringify(filter), 'sessionStorage')
	// 	}
	// }
	// <Stack justify="space-between" spacing={4} background="gray.50" p={4} rounded={2}>

	// 			<Stack justify="space-between" direction='row' spacing={4} background="gray.50" p={4} rounded={2}>
	// 				<Flex direction="column" textAlign="center">
	// 					<Small variant="semibold13" color="primary">
	// 						{bid_price}
	// 					</Small>
	// 					<Small fontSize={10}>Bid Price</Small>
	// 				</Flex>
	// 				<Flex direction="column" textAlign="center">
	// 					<Small variant="semibold13" color="primary">
	// 						{offer_price}
	// 					</Small>
	// 					<Small fontSize={10}>Offer Price</Small>
	// 				</Flex>
	// 			</Stack>
	// 			<Flex direction="column" textAlign="center">
	// 				<Small variant="semibold13" color="primary">
	// 					{effective_yield}
	// 				</Small>
	// 				<Small fontSize={10}>Annual Return</Small>
	// 			</Flex>
	// 		</Stack>
	return (
		<StackCard color="neutral.500" spacing={6} minW="xs" shadow="float" border="none" rounded={0} h="full" justify="space-between">
			<Stack>
				<Caption>{name}</Caption>
				<Tag looks={risk_level.name}>{risk_level.description}</Tag>
			</Stack>
			<Wrap justify={{ base: 'center', md: 'space-between' }} align="center" direction="row" spacing={4} background="gray.50" p={4} rounded={2}>
				<WrapItem>
					<Flex direction="column" textAlign="center">
						<Money currency="NGN" variant="semibold13" color="primary">
							{bid_price}
						</Money>
						<Small fontSize={10}>Bid Price</Small>
					</Flex>
				</WrapItem>
				<WrapItem>
					<Flex direction="column" textAlign="center">
						<Money currency="NGN" variant="semibold13" color="primary">
							{offer_price}
						</Money>
						<Small fontSize={10}>Offer Price</Small>
					</Flex>
				</WrapItem>
				<WrapItem>
					<Flex direction="column" textAlign="center">
						<Small variant="semibold13" color="primary">
							{effective_yield}
						</Small>
						<Small fontSize={10}>Annual Return</Small>
					</Flex>
				</WrapItem>
			</Wrap>
			<Stack color="neutral.500">
				<Caption>Key Facts:</Caption>
				{/* <Flex>
					<Small variant="semibold12">Launch Date:</Small>
					&nbsp;
					<Small color="neutral-800">{new Date(date_created).toLocaleDateString()}</Small>
				</Flex> */}
				{/*
				<Flex>
					<Small variant="semibold12" color="neutral-500">
						Memurandum Listing:
					</Small>
					&nbsp;
					<Small color="neutral-800">April 1995 </Small>
				</Flex> */}
				<Flex>
					<Small variant="semibold12" color="neutral-500">
						Size of Fund:
					</Small>
					&nbsp;
					{/* <Money color="neutral-800" variant='semibold12' currency={'NGN'}>9000 </Money> */}
					<Small color="neutral-800">{fund_size}</Small>
					{/* {moneyTostring({color:"neutral-800",amount:fund_size, currency:currency.currency_code,variant:'regular12'})} */}
				</Flex>
				{/* <Flex>
					<Small variant="semibold12" color="neutral-500">
						Initial Investment Amount:
					</Small>
					&nbsp;
					<Small color="neutral-800">N3 Billion</Small>
				</Flex> */}
				<Flex>
					<Small variant="semibold12" color="neutral-500">
						Management Fee:
					</Small>
					&nbsp;
					<Small color="neutral-800">{management_fee || 0}%</Small>
				</Flex>
				<Flex wrap="wrap">
					<Small variant="semibold12" color="neutral-400">
						Incentive Fee:
					</Small>
					&nbsp;
					<Small color="neutral-800">{incentive_fee}</Small>
				</Flex>
			</Stack>

			<Button w="inherit" looks="primary" onClick={() => setQueueMix(!isQueuedForMix)}>
				{isQueuedForMix ? 'Remove Investment' : 'Add Investment'}
			</Button>
		</StackCard>
	)
}
export default Details
