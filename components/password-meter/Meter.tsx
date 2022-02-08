import { Box, Progress, Stack } from '@chakra-ui/react'
import Popover from 'components/popover'
import Body from 'components/typography/Body'
import Mini from 'components/typography/Mini'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import React from 'react'
import { IoIosHelpCircle, IoIosHelpCircleOutline } from 'react-icons/io'
import { getPasswordStrength } from './util'

const Meter = (prop: { password: string }) => {
	const { label: strength, color, value, ...props } = getPasswordStrength(prop.password)
	return (
		<Stack {...props}>
			<Progress isAnimated role="progressbar" colorScheme={color} value={value} size="xs" w="full" />

			<Stack align="center" direction="row" spacing={1} position="relative">
				<Small color="neutral.400" fontWeight="normal">
					password strength is
				</Small>

				<Small color={color as any} alt>
					{strength}
				</Small>

				<Popover placement="auto" activator={<IoIosHelpCircle color={colors['grey-500']} />}>
					<Small color="neutral.500">Use a mix of UPPER/lowercase Alphabet, Number and special characters more than 7 characters long</Small>
				</Popover>
			</Stack>
		</Stack>
	)
}
export default React.memo(Meter)
