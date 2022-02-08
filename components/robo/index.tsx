import { Avatar, Box, Input } from '@chakra-ui/react'
import Small from 'components/typography/Small'
import { debounce } from 'lodash'
import React, { FC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

type RoboManProps = {
	notice?: string
	actionComp?: FC<any>
	in?: boolean
	children?: any
}

const RoboMan = ({ notice, actionComp: Action, children }: RoboManProps) => {
	const [displayRoboNotice, setDisplayRoboNotice] = useState<'block' | 'none'>('none')

	useEffect(() => {
		// debounce(() => {
		// 	setDisplayRoboNotice('block')
		// }, 4000)
		setDisplayRoboNotice('block')
		const timeout = setTimeout(() => {
			setDisplayRoboNotice('none')
		}, 5000)

		return () => clearTimeout(timeout)
	}, [notice])

	return (
		<Box zIndex="dropdown" id="robo-man" position="relative" right="5%" bottom="5%">
			<Input display="none" id="robo-content-toggle" type="checkbox" />
			<Box
				top={{ base: '-25rem', md: '3.1rem' }}
				//bottom={{base:'-25rem',md:'0rem'}}
				id="robo-content"
				//display="none"
				alt
				position="absolute"
				//	bottom="16"
				zIndex="modal"
				right="0"
				//bg="white"
				shadow="xl"
				rounded="md"
			>
				{children && children}
			</Box>

			<Small
				as="label"
				//@ts-ignore
				htmlFor="robo-content-toggle"
				transition="all .4s ease-in-out"
				opacity="1"
				transform={'translateY(0)'}
				color="neutral.500"
				zIndex="sticky"
				alt
				id="robo-message"
				data-message={notice !== undefined ? `${notice} ${children ? 'click to view' : ''}` : 'No new message'}
				display={displayRoboNotice}
				position="absolute"
				// bottom="14"
				bottom="-10"
				right="0"
				bg="white"
				shadow="xl"
				p="4"
				rounded="md"
				w="max"
				maxW="sm"
				_hover={{ shadow: 'md', bg: 'gray.100', transform: 'translateY(30px)', display: 'block', opacity: 1 }}
			/>

			<Avatar
				shadow="lg"
				src="/img/icons/robot.svg"
				borderWidth="1px"
				size="sm"
				borderStyle="solid"
				_focus={{
					borderColor: 'green.100',
				}}
				_active={{
					borderColor: 'green.100',
				}}
				_hover={{
					borderColor: 'green.100',
				}}
				as="label"
				display="block"
				htmlFor="robo-content-toggle"
				role="presentation"
				aria-label="ARM Engage Robot"
				cursor="pointer"
				// w="14"
				// h="14"
				bg="peru"
				rounded="full"
			/>
		</Box>
	)
}

export default RoboMan
