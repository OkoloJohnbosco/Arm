import { Box, CircularProgress, CircularProgressLabel, CircularProgressProps, Stack } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import Caption from 'components/typography/Caption'
import { colors } from 'lib/theme'
import React from 'react'
import { CirleProgressType } from './type'
import SubHeading from 'components/typography/SubHeading'

const Circular = ({ steps, currentStep, ...others }: { steps: CirleProgressType[]; currentStep?: CirleProgressType }) => {
	const stepIndex = currentStep ? steps.indexOf(currentStep) + 1 : 1
	const completePercent = (stepIndex / steps.length) * 100
	return (
		<Stack>
			<SubHeading> Investment Configuration </SubHeading>

			<Stack direction="row" align="center">
				<Box>
					<CircularProgress value={completePercent} trackColor={colors['neutral-50']} thickness={6} size={24} color={colors['green-400']}>
						<CircularProgressLabel>{<Body variant="semibold18">{stepIndex}</Body>}</CircularProgressLabel>
					</CircularProgress>
				</Box>
				<Box>
					<Caption> {currentStep?.progressTitle} </Caption>
					<Small color="neutral-500">{currentStep?.progressDescription}</Small>
				</Box>
			</Stack>
		</Stack>
	)
}

export default Circular
