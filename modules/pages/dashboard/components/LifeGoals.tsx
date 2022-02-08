import { Box, Flex, Stack } from '@chakra-ui/react'
import { Card, StackCard } from 'components/card'
import ArrowLink from 'components/link/ArrowLink'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import Background from 'modules/svg/CheckBackground.svg'
import React, { FC } from 'react'

export const ArrowBoard = () => (
	<svg width="69" height="69" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M64.07 16.73C66.9 22.09 69 28 69 34.5A34.5 34.5 0 1134.5 0c6.62 0 13.07 2.03 18.32 5.26 0 0 8.15 5.58 11.25 11.47z" fill="#FF405C" />
		<path
			d="M69 34.5c0-6.5-2.1-12.41-4.93-17.77-3.1-5.89-11.25-11.47-11.25-11.47A35.42 35.42 0 0034.5 0v69A34.5 34.5 0 0069 34.5z"
			fill="#C1126B"
		/>
		<path d="M54.53 24.56A22.36 22.36 0 1134.5 12.14c3.9 0 7.26.83 10.45 2.59 0 0 6.8 3.88 9.58 9.83z" fill="#FFF4F4" />
		<path
			d="M56.86 34.5c0-3.7-.85-6.8-2.33-9.94-2.79-5.95-9.58-9.83-9.58-9.83a20.96 20.96 0 00-10.45-2.59v44.72A22.36 22.36 0 0056.86 34.5z"
			fill="#EEE1DC"
		/>
		<path d="M34.5 45.02a10.52 10.52 0 100-21.04 10.52 10.52 0 000 21.04z" fill="#FF405C" />
		<path d="M45.02 34.5c0-5.81-4.7-10.52-10.52-10.52v21.04c5.81 0 10.52-4.7 10.52-10.52z" fill="#C1126B" />
		<path d="M34.07 37.3a2.12 2.12 0 01-1.5-3.63L58.83 7.59a2.13 2.13 0 013 3.02L35.57 36.68c-.41.41-.95.62-1.5.62z" fill="#00337A" />
		<path
			d="M61.77 6.55L59.83.95a1.33 1.33 0 00-2.19-.5l-11 11c-.31.32-.45.78-.35 1.22l1.61 7.43c.1.48.48.87.95 1l7.64 2.05c.46.12.95-.01 1.28-.35l10.84-10.83c.66-.67.45-1.79-.4-2.16L62.5 7.33c-.34-.15-.6-.43-.73-.78z"
			fill="#00AEEE"
		/>
		<path d="M61.83 7.6l-.05-.05-29.16 29.17a2.12 2.12 0 002.95-.04l26.25-26.07c.83-.83.84-2.18.01-3z" fill="#002659" />
		<path
			d="M68.2 9.82l-5.7-2.49a1.32 1.32 0 01-.31-.18L48.43 20.9c.13.1.27.16.42.2l7.64 2.05c.46.12.94 0 1.28-.34L68.6 11.97c.66-.66.45-1.78-.41-2.15z"
			fill="#0089FF"
		/>
	</svg>
)
const LifeGoal: FC = () => {
	return (
		<Stack w="full" position="relative" p={5} rounded={{ md: 'md', base: 'sm' }} spacing={4} bg="#fff" color="#000">
			<Flex justify={{ base: 'center', md: 'flex-start' }} className="item">
				<ArrowBoard />
			</Flex>
			<Stack position="relative">
				<Body variant="regular12" color="gray.500">
					Introducing ARM Financial Goals
				</Body>
				<Caption alt>Create Life Goal</Caption>

				<ArrowLink href="" cursor="pointer" textDecoration="underline" color="black.300">
					Create a Goal Now
				</ArrowLink>
			</Stack>
		</Stack>
	)
}

export default LifeGoal
