import { Flex, FlexProps, Avatar } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import Body from 'components/typography/Body'

import { colors } from 'lib/theme'
import React from 'react'
import { hexToRGBA, randomColorNames } from 'utils/helpers'

type Size = 'xs' | 'sm' | 'md' | 'lg'

const sizes: Record<Size, number> = {
	xs: 6,
	sm: 8,
	md: 10,
	lg: 16,
}

const sizesMobile: Record<Size, number> = {
	xs: 2,
	sm: 4,
	md: 6,
	lg: 12,
}

const NameAvater = ({
	name,
	src,
	size,
	responsive = true,
	...others
}: FlexProps & { size?: Size; name: string; src?: string; responsive?: boolean }) => {
	const names = name?.replace(/\s{2,}/gi, ' ').split(' ')
	const value = names?.length > 1 ? names[0][0] + names[1][0] : name?.length > 1 ? name[0] + name[1] : name
	const colorName = randomColorNames()

	const _size = size ? sizes[size] : sizes.sm

	return (
		<IfElse ifOn={!src} elseThen={<Avatar src={src} boxSize={{ md: _size, base: responsive ? 8 : _size }} />}>
			<Flex
				boxSize={{ md: _size, base: responsive ? _size || sizes.sm : _size }}
				justify="center"
				align="center"
				backgroundColor={colorName}
				rounded="full"
				{...others}
			>
				<Body
					variant="semibold14"
					color="white"
					fontSize={{ md: _size * 2, base: responsive ? sizesMobile.lg : _size * 2 }}
					textTransform="uppercase"
				>
					{value}
				</Body>
			</Flex>
		</IfElse>
	)
}

export default React.memo(NameAvater)
