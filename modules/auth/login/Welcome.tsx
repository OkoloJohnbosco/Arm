import { Box, Flex, Stack } from '@chakra-ui/react'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'
import { colors } from 'lib/theme'
import React from 'react'
import { Button } from 'components/button'
import LinkText from 'components/link/ArrowLink'
import { PAGES } from 'constant'
import { useRouter } from 'next/router'
import Baloon from 'components/animations/Baloon'

const Welcome = () => {
	const router = useRouter()
	return (
		<Stack height="lg">
			<Flex position="relative" top="-2px" flex="4" bg="claret.200" px={{ base: '4', md: '6' }} py="6" rounded="lg" borderBottomRadius="0">
				<Box position="absolute" left="50%" top="2" transform="translateX(-50%)">
					<Baloon />
				</Box>
				<SubHeading color="neutral.0" alignSelf="flex-end">
					Welcome to the New and Improved <br /> ARM Engage
				</SubHeading>
			</Flex>
			<Stack flex="4" px={{ base: '4', md: '6' }} py="4" rounded="lg" spacing="10">
				<Stack>
					<Caption alt>Here are some new improvements</Caption>
					<Small alt color="neutral.800">
						We noticed that this is the first time you are logging into our new app that allows you to manage all your ARM accounts from one
						place. We have plenty of new features to show you. Please tap below to continue
					</Small>
				</Stack>
				<Stack align="center" spacing="4">
					<Button alt onClick={() => router.push(PAGES.ACCOUNT_MANAGE_SUBSIDIARIES)} looks="primary">
						See Whats new on Engage
					</Button>

					<LinkText cursor="pointer" variant="semibold13" href={PAGES.DASHBOARD_HOME}>
						Proceed to Dashboard
					</LinkText>
				</Stack>
			</Stack>
		</Stack>
	)
}

export default Welcome
