import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import IconBox from './IconBox'

const LeftBanner1 = () => {
	return (
		<Flex>
			<Flex height={{ base: '250px', md: '450px' }} w={{ base: '200px', md: '350px' }} pos="relative" alignItems="center">
				<Image borderRadius={4} src="/img/onboard/intro-image-1.webp" width="full" height="full" objectFit="cover" alt="banner image 1" />

				<IconBox position="absolute" right="-30px" bg="#F4F8FF" boxShadow="md" transform={{ base: 'scale(0.7)', md: 'scale(1)' }}>
					<Image src="/img/icons/zigarrow-blue-circle.svg" boxSize={'50px'} />
				</IconBox>

				<IconBox position="absolute" bottom="20px" left="-30px" bg="#F5FBF8" boxShadow="md" transform={{ base: 'scale(0.7)', md: 'scale(1)' }}>
					<Image src="/img/icons/green-star-circle.svg" boxSize={'50px'} />
				</IconBox>
			</Flex>
		</Flex>
	)
}

export default LeftBanner1
