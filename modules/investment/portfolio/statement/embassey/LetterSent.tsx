import { Stack } from '@chakra-ui/react'
import SuccessSpinner from 'components/animations/successSpinner'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import React from 'react'

const LetterSent = ({ data }) => {
	return (
		<Stack spacing={12} textAlign="center" responsive={false}>
			<SuccessSpinner />

			<Stack>
				<Heading color="neutral-500" variant="h3">
					That was Succesful
				</Heading>
				<Body>Your Statement is in it way!</Body>
				<Body>{JSON.stringify(data)}</Body>
			</Stack>
		</Stack>
	)
}

export default LetterSent
