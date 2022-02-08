import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import IconBox from './IconBox'

const LeftBanner2 = () => {
	return (
		<Flex>
			<Flex
				//w={{ base: 'full', md: '350px' }} pos="relative" alignItems="center"
				height={{ base: '250px', md: '450px' }}
				w={{ base: '200px', md: '350px' }}
				pos="relative"
				alignItems="center"
			>
				<Image
					borderRadius={{ base: 0, md: 5 }}
					src="/img/onboard/intro-image-2.webp"
					width="full"
					//height="full"
					objectFit="contain"
					alt="banner image 1"
				/>

				<IconBox
					display={{ base: 'none', md: 'flex' }}
					position="absolute"
					right="-30px"
					bottom="-5px"
					bg="#F4F8FF"
					boxShadow="md"
					transform={{ base: 'scale(0.7)', md: 'scale(1)' }}
				>
					<Image src="/img/icons/shield-circle.svg" boxSize={'50px'} />
				</IconBox>

				<IconBox
					display={{ base: 'none', md: 'flex' }}
					position="absolute"
					left="-30px"
					bg="#FFFBF3"
					boxShadow="md"
					transform={{ base: 'scale(0.7)', md: 'scale(1)' }}
				>
					<Image src="/img/icons/flame-circle.svg" boxSize={'50px'} />
				</IconBox>
			</Flex>
		</Flex>
	)
}

export default LeftBanner2
