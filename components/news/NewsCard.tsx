import { Box, Image, LinkBox, LinkOverlay, Stack, StackDivider } from '@chakra-ui/react'
import Divider from 'components/divider'
import LinkText from 'components/link/ArrowLink'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import { random } from 'lodash'
import React from 'react'

const News = () => {
	return (
		<LinkBox
			minH="2xs"
			transition="all .2s ease-in"
			shadow="md"
			rounded="md"
			_hover={{ shadow: 'sm', bg: 'claret.100' }}
			//maxW={{md:"xs"}}
			sx={{
				':hover *': {
					color: 'neutral.0',
				},
			}}
		>
			<LinkOverlay href="" rounded="lg">
				<Stack className="hey">
					<Image
						borderTopRadius="md"
						src={`https://placeimg.com/640/480/${{ '1': 'tech', '2': 'any', '3': 'people' }[random(0, 3)]}`}
						h={{ base: 36, md: 48 }}
						backgroundSize="cover"
						backgroundPosition="center"
						objectFit="fill"
						alt="News Image"
					/>
					<Stack p="4">
						{/* <Stack > */}
						<Caption alt className="u" color="blue.300">
							Market News
						</Caption>
						<Caption>China proposes global rules for central bank digital currencies -- REUTERS</Caption>

						<Body variant="regular13">March 25th, 2021</Body>
						{/* </Stack> */}
						<Divider />
						<LinkText href="">Readmore</LinkText>
					</Stack>
				</Stack>
			</LinkOverlay>
		</LinkBox>
	)
}

export default News
