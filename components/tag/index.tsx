import { Box } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import { RiskProfileValue } from 'modules/hooks/useRiskProfile'
import React, { FC } from 'react'
import { hexToRGBA2 } from 'utils/helpers'

type TagProps = {
	looks?: RiskProfileValue
	children: any
}

const defaultTag = {
	color: colors['blue-300'],
	backgroundColor: hexToRGBA2('blue-300', 0.1),
}

export const colorOptions = {
	LOW: {
		color: colors['blue-300'],
		backgroundColor: hexToRGBA2('blue-300', 0.4),
		backgroundValue: 'blue-300',
	},
	MODERATE: {
		color: colors['yellow-500'],
		backgroundColor: hexToRGBA2('yellow-300', 0.4),
		backgroundValue: 'yellow-300',
	},
	MEDIUM: {
		color: colors['yellow-500'],
		backgroundColor: hexToRGBA2('yellow-300', 0.4),
		backgroundValue: 'yellow-300',
	},
	HIGH: {
		color: colors['red-300'],
		backgroundColor: hexToRGBA2('red-300', 0.4),
		backgroundValue: 'red-300',
	},
}

const Tag = (props: TagProps) => {
	const { backgroundColor, color } = colorOptions[props.looks?.toString().toUpperCase() || ''] || defaultTag
	return (
		<Box bgColor={backgroundColor} fontSize={10} textTransform="uppercase" p="1px 6px" w="fit-content" fontWeight="bold" color={color} rounded={2}>
			{props.children}
		</Box>
	)
}

export default Tag
