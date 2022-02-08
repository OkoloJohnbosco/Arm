// import { Color } from '@types'
import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons/lib'

export type IconProps = BoxProps & { iconComp: IconType }

const Icon: React.FC<IconProps> = (props) => {
	// eslint-disable-next-line react/prop-types
	const { boxSize = 5, iconComp, ...others } = props
	return <Box as={iconComp} boxSize={boxSize} {...others} />
}

export default React.memo(Icon)
