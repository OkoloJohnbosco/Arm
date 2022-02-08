import { Flex, Stack } from '@chakra-ui/react'
import ArrowLink from 'components/link/ArrowLink'
import Body from 'components/typography/Body'
// import Background from 'modules/svg/CheckBackground.svg'
import React, { FC } from 'react'
import { Card } from 'components/card'
import Caption from 'components/typography/Caption'
import { ArrowBoard } from './LifeGoals'

const DuoGoals: FC = () => {
	return (
		<Stack p={5} rounded={{ md: 'md', base: 'sm' }} color="#fff" bg="#000" spacing={4}>
			{/* <Box position="absolute" bottom={0} left={0} right={0}>
				<Background />
			</Box> */}
			<Flex justify={{ base: 'center', md: 'flex-start' }} className="item">
				<ArrowBoard />
			</Flex>
			<Stack position="relative">
				<Caption alt>Create Duo Goal</Caption>
				<Body variant="regular12" color="gray.300">
					Start saving money towards a specific goal with that special today!!
				</Body>

				<ArrowLink href="" cursor="pointer" color="#fff" textDecoration="underline">
					Create a Goal Now
				</ArrowLink>
			</Stack>
		</Stack>
	)
}

export default DuoGoals
