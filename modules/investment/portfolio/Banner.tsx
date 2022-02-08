import React from 'react'
import { Stack, Box } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import Body from 'components/typography/Body'
import { ChevronLink } from 'components/link/ArrowLink'
import BannerImg from 'public/img/Banner3.svg'

function Banner() {
	return (
		<Stack
			rounded={6}
			alignItems="center"
			maxH="240px"
			px={6}
			py="30px"
			bg="rgba(170, 155, 142, 0.44)"
			direction="row"
			justifyContent="space-between"
		>
			<Stack spacing={5} w="350px">
				<SubHeading className="playfair-header" fontWeight="bolder" color="claret.500" fontSize="2rem">
					Investment Manager
				</SubHeading>
				<Body color="#1B365D" fontSize="1.2rem">
					Grow your Money with ARM Investment Managers
				</Body>
				{/* <ChevronLink>Learn More</ChevronLink> */}
			</Stack>

			<Box display={{ base: 'none', md: 'block' }} mr={-2} pos="relative" top={-3}>
				<BannerImg />
			</Box>
		</Stack>
	)
}

export default Banner
