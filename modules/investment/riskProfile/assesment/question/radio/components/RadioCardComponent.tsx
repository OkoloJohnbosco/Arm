import { Box, BoxProps, useRadio } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import { colors } from 'lib/theme'
import React from 'react'
import { hexToRGBA2 } from 'utils/helpers'
import { RadioComponentProps } from '../../type'

function RadioCard({ value, isChecked, children, name, onChange, ...others }: Omit<BoxProps, 'onchage'> & RadioComponentProps) {
	const { getInputProps, getCheckboxProps } = useRadio({ value, isChecked, name, onChange })

	const input = getInputProps()
	const checkbox = getCheckboxProps()

	return (
		<Box as="label" w="fit-content">
			<input {...input} />
			<Box
				{...checkbox}
				cursor="pointer"
				borderWidth="1px"
				borderRadius="md"
				willChange="transform"
				transition="box-shadow .2s ease-in-out"
				_checked={{
					bg: hexToRGBA2('blue-200', 0.1),
					color: 'neutral-800',
					borderColor: colors['blue-100'],
				}}
				_hover={{
					boxShadow: 'md',
				}}
				_focus={{
					boxShadow: 'md',
					//boxShadow: 'outline',
				}}
				px={4}
				py={3}
				w="fit-content"
				{...others}
			>
				<Body variant="semibold13">{children}</Body>
			</Box>
		</Box>
	)
}
export default RadioCard
