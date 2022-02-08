import { Box, ButtonGroup, Flex, Stack, VStack } from '@chakra-ui/react'
import { Button } from 'components/button'
import Divider from 'components/divider'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Heading from 'components/typography/Heading'
import { PAGES } from 'constant'
import StartPage from 'components/layout/components/start/Page'
import React from 'react'
import LeftBanner from '../components/start/StartHero1'

const HomePage = () => {
	return (
		<StartPage>
			<Flex justify="space-evenly" flexDir={{ base: 'column', md: 'row' }}>
				<Box>
					<LeftBanner />
				</Box>

				<Divider orientation="vertical" display={{ base: 'none', md: 'block' }} maxH="xl" />
				<Stack justify="center" spacing={8}>
					<Stack spacing={4}>
						<Heading>Welcome to ARM</Heading>
						<Box w="50ch">
							<Body display="inline">Hey there... I’m John and I am here to help you personalize your</Body>
							<Caption alt display="inline">
								{' '}
								Investment Experience
							</Caption>
							<Body display="inline" variant="regular16">
								Trust me, it’s going to be FUN!
							</Body>
						</Box>
					</Stack>
					<Stack spacing={4}>
						<Body>Are you already and ARM Customer?</Body>

						<ButtonGroup spacing={6}>
							<Button href={PAGES.ACCOUNT_MANAGE_SUBSIDIARIES} w="120px" looks="primary">
								Yes
							</Button>

							<Button href={PAGES.ACCOUNT_SIGNUP} w="120px">
								No
							</Button>
						</ButtonGroup>
					</Stack>
				</Stack>
			</Flex>
		</StartPage>
	)
}

export default HomePage
