import { Stack } from '@chakra-ui/layout'
import { Box, Flex } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import React, { useEffect, useState } from 'react'
import { LinearProgressType } from './type'

const ProgressStep = (props: LinearProgressType & { isCurrentStep: boolean; isStepCompleted: boolean; onClick?: () => void }) => {
	const { progressStepLabel, progressTitle, progressDescription, isCurrentStep, isStepCompleted, onClick } = props
	return (
		<Stack cursor={onClick ? 'pointer' : 'none'} direction="row" align="baseline" onClick={() => onClick?.()}>
			<Flex
				border={isCurrentStep || isStepCompleted ? 'none' : `1px solid ${colors['neutral-70']}`}
				align="center"
				justify="center"
				bg={isCurrentStep || isStepCompleted ? colors.green : colors.white}
				boxSize={8}
				rounded="full"
			>
				<Body transition="color .2s ease-in-out" variant="semibold14" color={isCurrentStep || isStepCompleted ? 'white' : 'neutral-80'}>
					{progressStepLabel}
				</Body>
			</Flex>
			<Stack spacing={1}>
				<Body transition="color .9s ease-in-out" variant="semibold12" color={isCurrentStep || isStepCompleted ? 'neutral-800' : 'neutral-80'}>
					{progressTitle}
				</Body>

				<Small transition="color .9s ease-in-out" color={isCurrentStep || isStepCompleted ? 'neutral-700' : 'neutral-80'} alt maxW="20ch">
					{progressDescription}
				</Small>
			</Stack>
		</Stack>
	)
}

const Linear = ({
	steps,
	currentStep,
	onChange,
}: {
	steps: LinearProgressType[]
	currentStep?: LinearProgressType
	onChange?: (step: LinearProgressType) => void
}) => {
	const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)

	useEffect(() => {
		const stepIndex = currentStep ? steps.indexOf(currentStep) : 1
		setCurrentStepIndex(stepIndex > -1 ? stepIndex : 0)
	}, [currentStep])

	return (
		<Stack direction="row" align="baseline">
			{steps.map((step, i) => (
				<>
					<ProgressStep
						key={i}
						{...step}
						isCurrentStep={currentStepIndex == i}
						isStepCompleted={currentStepIndex > i}
						progressStepLabel={step.progressStepLabel || i + 1}
						onClick={() => onChange?.(step)}
					/>

					<Box
						display={i + 1 < steps.length ? 'block' : 'none'}
						as="hr"
						h="1px"
						borderRadius={200}
						w={10}
						flex={1}
						bg={currentStepIndex > i ? colors.green : colors['neutral-50']}
						transition="color 4s ease-in-out"
					/>
				</>
			))}
		</Stack>
	)
}

export default Linear
