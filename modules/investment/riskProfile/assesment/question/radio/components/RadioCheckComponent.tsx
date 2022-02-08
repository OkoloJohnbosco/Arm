import { Box, HStack, useRadio } from '@chakra-ui/react'
import { colors } from 'lib/theme'

const RadioCheckComponent = (props) => {
	const { getInputProps, getCheckboxProps } = useRadio(props)

	const input = getInputProps()
	const checkbox = getCheckboxProps()

	return (
		<HStack as="label" spacing="10px" textAlign="left" align="flex-start">
			<input {...input} />
			<Box
				{...checkbox}
				cursor="pointer"
				borderWidth="1px"
				width="13px"
				height="13px"
				borderRadius="50%"
				padding="0px"
				borderColor={colors['neutral-500']}
				_checked={{
					color: 'white',
					borderColor: colors['green-500'],
					borderWidth: 3,
				}}
				_focus={{
					boxShadow: 'outline',
				}}
			></Box>
			<Box flex={1}>
				<Box mt="-4px" pr="10px">
					{props.children}
				</Box>
			</Box>
		</HStack>
	)
}

export default RadioCheckComponent
