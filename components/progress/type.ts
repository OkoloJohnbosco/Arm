import { CircularProgressProps } from '@chakra-ui/react'

export type ProgressStepType = {
	progressStepLabel?: string | number
	progressTitle: string
	progressDescription: string
	id: number | string
}
// & Omit<CircularProgressProps, 'id'>

export type CirleProgressType = ProgressStepType

export interface LinearProgressType extends Omit<ProgressStepType, keyof CircularProgressProps> {}
