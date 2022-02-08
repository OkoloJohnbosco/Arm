import React from 'react'
import { Stack, Box } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import Body from 'components/typography/Body'
import { ChevronLink } from 'components/link/ArrowLink'
import BannerImg from 'public/img/Banner1.svg'

function BannerOne() {
	return (
		<Stack rounded={8} alignItems="center" px={6} py="20px" bg="rgba(170, 155, 142, 0.44)" direction="row" justifyContent="space-between">
			<Stack spacing={5} w="350px">
				<SubHeading className="playfair-header" fontWeight="normal">
					Set up Direct Debit
				</SubHeading>
				<Body>Grow your Money with ARM Investment Managers</Body>
				<ChevronLink>Learn More</ChevronLink>
			</Stack>

			<Box display={{ base: 'none', md: 'block' }} mr={-2}>
				<BannerImg />
			</Box>
		</Stack>
	)
}

export default BannerOne
