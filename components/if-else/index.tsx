import { ScaleFade, SlideFade, Slide } from '@chakra-ui/react'
import React from 'react'

// const IfElse = ({ children = null, suspense = null, show = false }: { show?: boolean; children: any; suspense?: any }) => {
// 	return show ?  children : suspense ? suspense : null
// }

const Transitions = {
	scaleFade: ScaleFade,
	slideFade: SlideFade,
	slide: Slide,
}

const IfElse = ({
	children = null,
	elseThen = null,
	ifOn = false,
	ifOnElse = true,
	transition = 'scaleFade',
}: {
	ifOn?: any
	children: any
	elseThen?: any
	transition?: 'scaleFade' | 'slideFade' | 'slide'
	ifOnElse?: any
}) => {
	const Transition = Transitions[transition]
	return (
		<>
			{ifOn && children}

			{!ifOn && elseThen && ifOnElse ? elseThen : null}
		</>
	)
}

export default IfElse
