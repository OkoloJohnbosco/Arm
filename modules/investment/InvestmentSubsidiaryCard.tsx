import { Avatar, Box, Flex, HStack, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import { StackCard } from 'components/card'
import Money from 'components/money'
import Icon from 'components/icon'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { armSubsidiaries } from 'modules/subsidiaries/config'
import { CustomerBusinessType } from 'modules/account/types'
import { BullIcon, HouseIcon, NavigationIcon } from 'modules/svg'
import { IoArrowRedoSharp, IoUmbrellaSharp } from 'react-icons/io5'
import { RiArrowRightUpFill } from 'react-icons/ri'
import React from 'react'
// import CardPattern from 'modules/svg/CardPattern.svg'
import useColor from 'lib/theme/useColor'
// import { PAGES } from 'constant'
// import Mini from 'components/typography/Mini'
import { hexToRGBA2 } from 'utils/helpers'

interface Props {
	business: CustomerBusinessType
	alt?: boolean
	onClick?: () => void
}

// const productIcon = [HouseIcon, NavigationIcon, BullIcon]
const cardProps = [
	{ icon: IoUmbrellaSharp, bg: '#A8005B' },
	{ icon: IoArrowRedoSharp, bg: '#AA9B8E' },
	{ icon: HouseIcon, bg: '#000000' },
	{ icon: HouseIcon, bg: '#73103D' },
]

const ProductInvestmentCard = ({ business, onClick }: Props) => {
	const { name, products, total_balance } = business
	// const ProductIcon = productIcon[Math.floor(Math.random() * productIcon.length)]
	const color = useColor()

	return (
		<StackCard
			w={{ md: '19rem', base: '300px' }}
			onClick={onClick}
			position="relative"
			shadow="md"
			// boxShadow="0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31)"
			borderRadius="8px"
			role="button"
			tabIndex={0}
			_active={{
				// boxShadow: `0 0 0 1px ${color.claret[200]}`,
				boxShadow: 'lg',
			}}
			_hover={{
				// boxShadow: `0 0 0 1px ${color.claret[200]}`,
				boxShadow: 'lg',
			}}
			//	shadow="B10"
			background="#73103D"
			// background="#000"
			color="#fff"
			responsive={false}
			// bg={hexToRGBA2(colorOptions[risk_level.name.toUpperCase()].backgroundValue, 0.01)}
			//	border={`1px solid ${colorOptions.LOW.backgroundColor}`}
			cursor="pointer"
			transition=" all .2s ease-in-out"
			px={5}
			py={4}
			spacing={3}
			direction="column"
			justify="space-around"
			align="auto"
		>
			<HStack align="flex-start" spacing={3} alignItems="center">
				{/* <Avatar src={armSubsidiaries['Wills and Trust'].icon} size="sm" /> */}
				{/* <Avatar src={IoUmbrellaSharp} size="sm" /> */}
				<Icon iconComp={IoUmbrellaSharp} bg="rgba(255, 255, 255, 0.2)" color="#fff" boxSize="7" p={1} rounded="full" />

				{/* <Flex display="flex" as={armSubsidiaries['2'].icon} rounded="full" boxSize={9} align="center" justify="center" background={colors['yellow-100']} /> */}
				<Stack spacing={1}>
					<Caption className="sf-header">{name}</Caption>
				</Stack>
			</HStack>
			<Stack direction={{ base: 'row', md: 'row' }} justify="space-between" align="center">
				<Box w="full">
					<Small color="neutral-200">Balance</Small>
					<Flex justify="space-between" align="center" w="full">
						<Money variant="semibold14" currency="NGN" letterSpacing={1}>
							{total_balance}
						</Money>
					</Flex>
				</Box>
			</Stack>

			<Stack mt={-2}>
				<Small color="#fff" textDecoration="underline" variant="semibold13">
					View Account
				</Small>
			</Stack>

			{/* <Box position="absolute" bottom={0} left={0} right={0}>
				<CardPattern />
			</Box> */}
		</StackCard>
	)
}

export default ProductInvestmentCard
