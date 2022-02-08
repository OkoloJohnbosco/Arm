import { Box, BoxProps, Flex, HStack, Stack, Image } from '@chakra-ui/react'
import { ButtonVariantType } from 'components/button'
import { StackCard } from 'components/card'
import Modal from 'components/modal'
import Money from 'components/money'
import Tag from 'components/tag'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import { ProductType } from 'modules/account/types'
import React, { FC, useMemo, useState } from 'react'
import { hexToRGBA2 } from 'utils/helpers'
import { BullIcon, HouseIcon, NavigationIcon } from 'modules/svg'
import DiscoveryFund from 'modules/svg/DiscoveryFund.svg'
import Equity from 'modules/svg/Equity.svg'
import EuroSvg from 'modules/svg/Euro.svg'
import TreasureKey from 'modules/svg/TreasureKey.svg'
import ProductDetails from './details'
import ProductContext from './ProductContext'
import { SESSION_STORAGE_MIX_CART } from 'constant'
import { useBroadcastStorage, setBroadcastStorage } from 'lib/broadcastStorage'
import useMainAction from 'lib/hooks/useMainAction'

interface Props extends BoxProps {
	products: ProductType
	alt?: boolean
}
const productIllustration = [EuroSvg, DiscoveryFund, Equity, TreasureKey]
const productIcon = [HouseIcon, NavigationIcon, BullIcon]

const CardHead = ({ link, image_url }: ProductType) => <Image src={image_url} h={32} w={{ md: 'inherit', base: 'full' }} alt="product image" />

// eslint-disable-next-line react/prop-types
const ProductSummaryCard: FC<Props> = ({ products: product, alt = false, ...boxProps }) => {
	const ProductImage = productIllustration[Math.floor(Math.random() * productIllustration.length)]
	const ProductIcon = productIcon[Math.floor(Math.random() * productIcon.length)]
	const { name, risk_level, management_fee, minimum_investment, currency } = product
	const [openModal, setOpenModal] = useState(false)

	const storage = useBroadcastStorage(SESSION_STORAGE_MIX_CART)
	const investmentMix: ProductType[] = JSON.parse(storage || '[]') || []
	const isQueuedForMix = useMemo(() => investmentMix.some((p) => p.id == product.id), [investmentMix])
	const { pushRoboNotice } = useMainAction()

	const handleAddProduct = (isQueue: boolean) => {
		if (isQueue) {
			const update = [...investmentMix, product]
			setBroadcastStorage(SESSION_STORAGE_MIX_CART, JSON.stringify(update), 'sessionStorage')
		} else {
			const filter = investmentMix.filter((p) => p.id !== product.id)
			setBroadcastStorage(SESSION_STORAGE_MIX_CART, JSON.stringify(filter), 'sessionStorage')
		}
		pushRoboNotice({ message: `${product.name} ${isQueue ? 'added to' : 'removed from'} investment mix` })
	}

	return (
		<ProductContext.Provider value={{ isQueuedForMix, setQueueMix: handleAddProduct, product, closeDetails: () => setOpenModal(false) }}>
			<Modal
				size="4xl"
				content={{
					w: { md: '4xl', base: 'sm' },
				}}
				isOpen={openModal}
				onClose={() => setOpenModal(!openModal)}
			>
				<ProductDetails />
			</Modal>

			<Flex direction="column" w="inherit">
				<CardHead {...product} />

				<Stack
					onClick={() => setOpenModal(true)}
					rounded={4}
					border="1px solid white"
					_hover={{ border: `1px solid ${hexToRGBA2('orange-200', 0.2)}`, bg: hexToRGBA2('yellow-200', 0.2) }}
					bg="white"
					cursor="pointer"
					transition=" all .3s ease-in-out"
					p={3}
					direction={alt ? 'row' : 'column'}
					justify="space-around"
					align={alt ? 'center' : 'auto'}
				>
					<HStack align="flex-start" spacing={4} alignItems="center">
						<Flex
							display={alt ? 'none' : 'flex'}
							as={ProductIcon}
							rounded="full"
							boxSize={9}
							align="center"
							justify="center"
							background={colors['yellow-100']}
						/>
						<Stack spacing={1}>
							<Body variant="semibold13">{name}</Body>
							<Tag
								//@ts-ignore
								looks={risk_level.name}
							>
								{risk_level.description}
							</Tag>
						</Stack>
					</HStack>
					<Stack justify="space-between" align={alt ? 'center' : 'flex-end'} direction={alt ? 'column' : 'row'}>
						<Box textAlign={alt ? 'end' : 'start'} display={alt ? 'none' : 'block'}>
							<Body variant="bold14">{management_fee || 0}%</Body>
							<Small color="neutral-200">Management Fee</Small>
						</Box>
						<Box textAlign="end">
							<Money variant="bold14" color="green" currency={currency.currency_code}>
								{minimum_investment}
							</Money>

							<Small color="neutral-200">Minimum Investment</Small>
						</Box>
					</Stack>
				</Stack>
			</Flex>
		</ProductContext.Provider>
	)
}

export default ProductSummaryCard
