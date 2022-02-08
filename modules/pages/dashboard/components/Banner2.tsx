import React from 'react'
import { Stack, Box } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import { ChevronLink } from 'components/link/ArrowLink'
import BannerImg from 'public/img/Banner2.svg'

function BannerTwo() {
	return (
		<Stack rounded={8} px={6} alignItems="center" py="20px" bg="#73103D" color="#fff" direction="row" justifyContent="space-between">
			<Stack spacing={5} w="350px">
				<SubHeading className="playfair-header" fontWeight="normal">
					Share the gift of ARM Investments with friends and family
				</SubHeading>
				<ChevronLink color="#fff">Learn More</ChevronLink>
			</Stack>

			<Box display={{ base: 'none', md: 'block' }} mr={-2}>
				<BannerImg />
			</Box>
		</Stack>
	)
}

export default BannerTwo
