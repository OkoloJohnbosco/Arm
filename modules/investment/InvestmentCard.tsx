import { Badge, Box, Flex, HStack, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import Money from 'components/money'
import Tag, { colorOptions } from 'components/tag'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import { CustomerBusinessDetailsType, ProductInvestmentType } from 'modules/account/types'
import { BullIcon, HouseIcon, NavigationIcon } from 'modules/svg'
import React, { FC } from 'react'
import { hexToRGBA2 } from 'utils/helpers'
import CardPattern from 'modules/svg/CardPattern.svg'
import { PAGES } from 'constant'
import product from 'modules/products/product'
// const Pattern = () => (

interface Props {
	investment: ProductInvestmentType
	alt?: boolean
	business?: CustomerBusinessDetailsType
}

const productIcon = [HouseIcon, NavigationIcon, BullIcon]

const ProductInvestmentCard = ({ investment, alt, business }: Props) => {
	console.log(investment, alt)
	const { risk_level, name, currency, summary } = investment || {}
	const ProductIcon = productIcon[Math.floor(Math.random() * productIcon.length)]

	return (
		<LinkBox>
			<LinkOverlay href={PAGES.DASHBOARD.INVESTMENT_PORTFOLIO(investment.id)}>
				<Box
					className="investment-card"
					//w={{ base: '2xs', md: 'xs' }}
					w={{ md: '19rem', base: '280px' }}
					position="relative"
				>
					{/* <Box position="absolute" bottom={0} left={0} right={0}>
						<CardPattern />
					</Box> */}
					<Stack
						shadow="sm"
						rounded={6}
						boxSizing="content-box"
						// bg={hexToRGBA2(colorOptions[risk_level.name.toUpperCase()].backgroundValue, 0.01)}
						// border={`1px solid ${colorOptions[risk_level.name.toUpperCase()].backgroundColor}`}
						border="1px solid"
						// _hover={{ shadow: 'B30', border: `1px solid ${hexToRGBA2('orange-200', 0.2)}`, bg: hexToRGBA2('yellow-200', 0.2) }}
						_hover={{ shadow: 'lg' }}
						//	bg="white"
						cursor="pointer"
						transition=" all .3s ease-in-out"
						p={5}
						//px={5}
						spacing={4}
						direction="column"
						justify="space-around"
						align="auto"
						position="relative"
						background="#73103D"
						color="#fff"
					>
						<HStack align="flex-start" spacing={4} alignItems="center">
							{/* <Flex display="flex" as={ProductIcon} rounded="full" boxSize={9} align="center" justify="center" background={colors['yellow-100']} /> */}
							<Stack spacing={1}>
								<Body variant="semibold13">{name}</Body>
								<Badge colorScheme="red" w="min-content" textTransform="capitalize" mt={2}>
									Low Risk
								</Badge>
								{/* <Tag looks={risk_level.name.toString().toUpperCase() as any}>Low Risk</Tag> */}
							</Stack>
						</HStack>
						<Stack>
							<Small color="neutral-200">Current Balance</Small>

							<Flex justify="space-between" align="center">
								<Money variant="semibold14" currency={currency.name} letterSpacing={1}>
									{summary.current_balance}
								</Money>
								<Small textDecoration="underline" variant="semibold13">
									View Account
								</Small>
							</Flex>
						</Stack>
					</Stack>
				</Box>
			</LinkOverlay>
		</LinkBox>
	)
}

export default ProductInvestmentCard
