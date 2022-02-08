import { Box, Flex, Stack } from '@chakra-ui/react'
import { Card } from 'components/card'
import ArrowLink from 'components/link/ArrowLink'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import Background from 'modules/svg/CheckBackground.svg'
import React, { FC } from 'react'

const RewardBox = () => (
	<svg width="84" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g clipPath="url(#clip0)">
			<path
				d="M78.52 16.36h-6.11a9.73 9.73 0 001.49-4.22 10.78 10.78 0 00-6.41-11.11c-4-1.77-8.48-1.05-11.7 1.88l-7.73 7a8.2 8.2 0 00-12.13 0l-7.73-7a10.74 10.74 0 00-11.71-1.88 10.78 10.78 0 00-6.4 11.11 9.72 9.72 0 001.49 4.22h-6.1A5.48 5.48 0 000 21.84v8.22a2.74 2.74 0 002.74 2.74h78.52A2.74 2.74 0 0084 30.06v-8.22a5.48 5.48 0 00-5.48-5.48zm-44.74-.91v.91H20.9a5.4 5.4 0 113.62-9.39l9.26 8.4v.08zm34.68-4.04c-.2 2.85-2.77 4.95-5.63 4.95H50.22v-.91-.1l9.12-8.27a5.48 5.48 0 015.18-1.32c2.6.78 4.13 3 3.94 5.65z"
				fill="rgba(0, 0, 0, 0.5)"
			/>
			<path d="M5.48 38.27v40.18a5.48 5.48 0 005.48 5.48h25.56V38.27H5.48z" fill="#fff" />
			<path d="M47.48 38.27v45.66h25.56a5.48 5.48 0 005.48-5.48V38.27H47.48z" fill="rgba(0, 0, 0, 0.5)" />
		</g>
		<defs>
			<clipPath id="clip0">
				<path fill="#fff" d="M0 0h84v84H0z" />
			</clipPath>
		</defs>
	</svg>
)
const Referal: FC = () => {
	return (
		<Stack
			spacing={4}
			rounded={{ md: 'md', base: 'sm' }}
			direction={{ base: 'row', md: 'column' }}
			// spacing={8}
			p={5}
			background="claret.500"
		>
			<Box className="item">
				<RewardBox />
			</Box>
			<Stack spacing={2} className="item">
				<Caption alt color="neutral.0">
					Get free N1,000
				</Caption>
				<Body variant="regular12" color="#fff">
					Refer and get paid for every friend that signs up and invest with ARM Engage
				</Body>
			</Stack>
		</Stack>
	)
}

export default Referal
