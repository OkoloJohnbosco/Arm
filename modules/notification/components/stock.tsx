import React from 'react'
import { Stack, HStack, Image } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'

function Stock({ name, price, openPrice }: { name: string; price: number; openPrice: number }) {
	const percentage = ((price - openPrice) / openPrice) * 100

	return (
		<HStack alignItems="center" justifyContent="space-between">
			<Stack minW="60px">
				<SubHeading fontSize="16px" fontWeight="normal" textTransform="uppercase" color="neutral.200">
					{name}
				</SubHeading>
			</Stack>
			<Stack>
				{percentage < 0 ? (
					<Image src="/img/icons/red-stock.svg" alt="Stock illustration" width="100px" height="20px" />
				) : (
					<Image src="/img/icons/stock.svg" alt="Stock illustration" width="100px" height="20px" />
				)}
			</Stack>

			<Stack spacing={0} justifyContent="flex-start" align="flex-end">
				<Body fontWeight="bolder" color="#000" fontSize="15px">
					${price}
				</Body>
				<Small fontWeight="semi-bold" color={`${percentage < 0 ? '#de350b' : '#00875a'}`} fontSize="14px">
					{percentage > 0 ? '+' : ''} {'  '}
					{Number(percentage).toFixed(2)}%
				</Small>
			</Stack>
		</HStack>
	)
}

export default Stock
