// import { Flex, HStack, Stack } from '@chakra-ui/layout'
// import { Box, Image } from '@chakra-ui/react'
// import Divider from 'components/divider'
// import Money from 'components/money'
// import {Button} from 'components/button'
// import Caption from 'components/typography/Caption'
// import Heading from 'components/typography/Heading'
// import Small from 'components/typography/Small'
// import { PAGES, SESSION_STORAGE_MIX_CART } from 'constant'
// import { setBroadcastStorage, useBroadcastStorage } from 'lib/broadcastStorage'
// import { ProductType } from 'modules/account/types'
// import React, { useEffect } from 'react'
// import Icons from 'components/icon'
// import { RiDeleteBin6Line } from 'react-icons/ri'
// import { StackCard } from 'components/card'
// import IfElse from 'components/if-else'
// import Body from 'components/typography/Body'

// export default (props: { onEmpty?: () => void }) => {
// 	const storage = useBroadcastStorage(SESSION_STORAGE_MIX_CART)
// 	console.log(storage)
// 	const investmentMix: ProductType[] = JSON.parse(storage || '[]') || []

// 	const onDelete = (id: number) => {
// 		console.log(investmentMix.filter((p) => p.id != id))
// 		setBroadcastStorage(SESSION_STORAGE_MIX_CART, JSON.stringify(investmentMix.filter((p) => p.id !== id)), 'sessionStorage')
// 	}

// 	useEffect(() => {
// 		if (!investmentMix.length) props.onEmpty?.()
// 	}, [investmentMix.length])

// 	return (
// 		<StackCard spacing={8} minW="2xs" px="6" py="8">
// 			{investmentMix.length && (
// 				<>
// 					<Heading variant="h3" textAlign="center">
// 						Your Selected Product
// 					</Heading>
// 					<Stack divider={<Divider />} maxH={{ base: '22rem', md: 'md' }} overflow="scroll">
// 						{investmentMix.map(({ link, name, management_fee, minimum_investment, currency, id }) => (
// 							// <Box>
// 							<Stack direction={{ base: 'column', md: 'row' }} spacing={{ md: 8, base: 2 }}>
// 								<Image src={link} h={32} w={{ md: '3xs', base: 'full' }} alt={name} />
// 								<Box>
// 									<Caption>{name}</Caption>
// 									<Stack spacing={1}>
// 										<Box display={management_fee ? 'block' : 'none'}>
// 											<Small color="neutral-400"> Management Fee</Small>
// 											<Money currency={currency.currency_code} variant="semibold12">
// 												{management_fee}
// 											</Money>
// 										</Box>
// 										<Box display={minimum_investment ? 'block' : 'none'}>
// 											<Small color="neutral-400">Minimum Investment</Small>
// 											<Money currency={currency.currency_code} variant="semibold12">
// 												{minimum_investment}
// 											</Money>
// 										</Box>
// 									</Stack>
// 									<Icons
// 										mt={2}
// 										onClick={() => onDelete(id)}
// 										cursor="pointer"
// 										willChange="transform"
// 										iconComp={RiDeleteBin6Line}
// 										transition="transform .5s"
// 										transform="rotate(0deg)"
// 										_hover={{
// 											color: 'red.300',
// 											// transform: 'rotate(90deg)'
// 										}}
// 									/>
// 								</Box>
// 							</Stack>
// 							// </Box>
// 						))}
// 					</Stack>

// 					<Button looks="primary" w="full" href={PAGES.INVESTMENT_SUBSCRIPTION}>
// 						Continue
// 					</Button>
// 				</>
// 			)}
// 			{!investmentMix.length && (
// 				<Body textAlign="center" color="neutral-500">
// 					Your Product selection is empty
// 				</Body>
// 			)}
// 		</StackCard>
// 	)
// }

import { Flex, HStack, Stack } from '@chakra-ui/layout'
import { Avatar, Box, Image } from '@chakra-ui/react'
import Divider from 'components/divider'
import Money from 'components/money'
import { Button } from 'components/button'
import Caption from 'components/typography/Caption'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import { PAGES, SESSION_STORAGE_MIX_CART } from 'constant'
import { setBroadcastStorage, useBroadcastStorage } from 'lib/broadcastStorage'
import { ProductType } from 'modules/account/types'
import React, { useEffect } from 'react'
import Icons from 'components/icon'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { StackCard } from 'components/card'
import IfElse from 'components/if-else'
import Body from 'components/typography/Body'

const Prompt = (props: { onEmpty?: () => void }) => {
	const storage = useBroadcastStorage(SESSION_STORAGE_MIX_CART)
	const investmentMix: ProductType[] = JSON.parse(storage || '[]') || []

	const onDelete = (id: number) => {
		setBroadcastStorage(SESSION_STORAGE_MIX_CART, JSON.stringify(investmentMix.filter((p) => p.id !== id)), 'sessionStorage')
	}

	useEffect(() => {
		if (!investmentMix.length) props.onEmpty?.()
	}, [investmentMix.length])

	return (
		<StackCard spacing={8} minW="2xs" px="6" py="8">
			{investmentMix.length && (
				<>
					<Heading variant="h3" textAlign="center">
						Your Selected Product
					</Heading>
					<Stack W="full" divider={<Divider />} maxH={{ base: '22rem', md: 'md' }} overflow="scroll">
						{investmentMix.map(({ link, name, management_fee, minimum_investment, currency, id }) => (
							// <Box>
							<Stack key={name} w="full" direction={{ base: 'column', md: 'row' }} spacing={{ md: 6, base: 2 }}>
								<Avatar src={link} alt={name} />
								<Box>
									<Caption>{name}</Caption>
									<Stack spacing={1}>
										<Box>
											<Small whiteSpace="nowrap" color="neutral-400">
												{' '}
												Management Fee
											</Small>
											<Body variant="semibold12">{management_fee || 0}%</Body>
										</Box>
										<Box>
											<Small whiteSpace="nowrap" color="neutral-400">
												Minimum Investment
											</Small>
											<Money currency={currency.currency_code} variant="semibold12">
												{minimum_investment}
											</Money>
										</Box>
									</Stack>
									<Icons
										mt={2}
										onClick={() => onDelete(id)}
										cursor="pointer"
										willChange="transform"
										iconComp={RiDeleteBin6Line}
										transition="transform .5s"
										transform="rotate(0deg)"
										_hover={{
											color: 'red.300',
											// transform: 'rotate(90deg)'
										}}
									/>
								</Box>
							</Stack>
							// </Box>
						))}
					</Stack>

					<Button looks="primary" w="full" href={PAGES.INVESTMENT_SUBSCRIPTION}>
						Continue
					</Button>
				</>
			)}
			{!investmentMix.length && (
				<Body textAlign="center" color="neutral-500">
					Your Product selection is empty
				</Body>
			)}
		</StackCard>
	)
}

export default Prompt
