import { Box, BoxProps, Flex, HStack, Stack, Image, CloseButton } from '@chakra-ui/react'
import { ButtonVariantType, Button } from 'components/button'
import Modal from 'components/modal'
import Money from 'components/money'
import Tag from 'components/tag'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import { ProductType } from 'modules/account/types'
import React, { FC, useMemo, useState } from 'react'
import { hexToRGBA, hexToRGBA2 } from 'utils/helpers'
import { BullIcon, HouseIcon, NavigationIcon } from 'modules/svg'
import DiscoveryFund from 'modules/svg/DiscoveryFund.svg'
import Equity from 'modules/svg/Equity.svg'
import EuroSvg from 'modules/svg/Euro.svg'
import TreasureKey from 'modules/svg/TreasureKey.svg'
import ProductDetails from './details'
import ProductContext from './ProductContext'
import Caption from 'components/typography/Caption'
import Mini from 'components/typography/Mini'
import { useBroadcastStorage, setBroadcastStorage } from 'lib/broadcastStorage'
import { SESSION_STORAGE_MIX_CART } from 'constant'
import useMainAction from 'lib/hooks/useMainAction'
import { BiChevronRight } from 'react-icons/bi'

interface actionButton extends ButtonVariantType {
	label: string
	rightContent?: JSX.Element | null
	variant?: 'primary' | 'danger'
}

interface Props extends BoxProps {
	products: ProductType
	alt?: boolean
}
const riskHightlightColor = {}
const productIllustration = [EuroSvg, DiscoveryFund, Equity, TreasureKey]
const productIcon = [HouseIcon, NavigationIcon, BullIcon]

const isProductImage = (url: string) => url && false
const CardHead = ({ link, image_url }: ProductType) => (
	<Image borderTopRadius={6} src={image_url} h={24} w={{ md: 'fit-content', base: 'full' }} backgroundSize="cover" alt="product image" />
)

// eslint-disable-next-line react/prop-types
const Product: FC<Props> = ({ products: product, alt = false, ...boxProps }) => {
	const ProductIcon = productIcon[Math.floor(Math.random() * productIcon.length)]
	const { name, risk_level, management_fee, minimum_investment, currency } = product

	const storage = useBroadcastStorage(SESSION_STORAGE_MIX_CART)
	const investmentMix: ProductType[] = JSON.parse(storage || '[]') || []
	const isQueuedForMix = useMemo(() => investmentMix.some((p) => p.id == product.id), [investmentMix])
	// console.log(isQueuedForMix, name, 'From Product component')
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

	const [openModal, setOpenModal] = useState(false)
	return (
		<ProductContext.Provider value={{ closeDetails: () => setOpenModal(false), product, isQueuedForMix, setQueueMix: handleAddProduct }}>
			<Modal
				size="3xl"
				content={{
					w: { md: '3xl', base: 'sm' },
				}}
				isCentered
				motionPreset="scale"
				scrollBehavior="inside"
				padded={false}
				isOpen={openModal}
				onClose={() => setOpenModal(!openModal)}
			>
				<ProductDetails />
			</Modal>

			<Box
				position="relative"
				shadow="sm"
				// transition="box-shadow .2s ease-in-out"
				//w="290px"
				// _hover={{
				// 	border: 'none',
				// 	shadow: 'lg',
				// }}
				//flex='1'
				w="full"
				{...boxProps}
			>
				{isQueuedForMix && <CloseButton onClick={() => handleAddProduct(false)} position="absolute" right="-1" color="red" top="-1" />}
				{isProductImage(product.link) && <CardHead {...product} />}

				<Stack
					// shadow="B10"
					// borderTopRadius={isProductImage(product.link) ? 'none' : 6}
					py={6}
					px={5}
					border="1px solid #CAC0B677"
					bg="white"
					// cursor="pointer"
					borderRadius={6}
					// transition=" all .3s ease-in-out"
					spacing={8}
					direction={alt ? 'row' : 'column'}
					justify="space-around"
					align={alt ? 'center' : 'auto'}
				>
					<HStack align="flex-start" alignItems="center">
						<Flex
							ml="-1"
							display={alt ? 'none' : 'flex'}
							as={ProductIcon}
							rounded="full"
							boxSize={9}
							align="center"
							justify="center"
							background={colors['yellow-100']}
						/>
						<Stack spacing={1}>
							<Caption isTruncated>{name}</Caption>
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
							<Body variant="semibold14">{management_fee || 0}%</Body>
							<Small>Management Fee</Small>
						</Box>
						<Box textAlign="end">
							<Money variant="semibold14" color="green" currency={currency.currency_code}>
								{minimum_investment}
							</Money>

							<Small>Minimum Investment </Small>
						</Box>
					</Stack>

					<Stack mt={3} pt={3} textAlign="left" borderTop="1px solid #CAC0B677">
						<Button
							w="120px"
							className="chevron-link"
							justifyContent="flex-start"
							my={2}
							style={{ outline: 'none', padding: 0 }}
							onClick={() => setOpenModal(true)}
							fontWeight="bold"
							color="claret.500"
							bg="#fff"
						>
							View Details <BiChevronRight />
						</Button>
					</Stack>
				</Stack>
			</Box>
		</ProductContext.Provider>
	)
}
// 55424
export default React.memo(Product)
