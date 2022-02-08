import { Stack } from '@chakra-ui/react'
import SuccessSpinner from 'components/animations/successSpinner'
import Button from 'components/button/Button'
import Divider from 'components/divider'
import Body from 'components/typography/Body'
import SubHeading from 'components/typography/SubHeading'
import React from 'react'

const RedemptionSucess = ({ onClose }: { onClose: () => void }) => {
	return (
		<Stack align="center" justify="center" textAlign="center" spacing="16">
			<Stack textAlign="start">
				<SubHeading color="claret.500">Completed</SubHeading>
				<Divider />
			</Stack>
			<SuccessSpinner />
			<Stack>
				<SubHeading>Your Redemption is on the Way</SubHeading>
				<Body>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque molestiae modi voluptate incidunt voluptates, explicabo animi
					exercitationem eum mollitia odit labore rem! Itaque laudantium, explicabo porro quos saepe minima quisquam?{' '}
				</Body>
			</Stack>

			<Button w="full" onClick={onClose}>
				I am Done
			</Button>
		</Stack>
	)
}

export default RedemptionSucess
