import Body from './Body'
import React from 'react'
import { BodyTypography } from './types'

const Mini = ({ alt, ...others }: BodyTypography) => (
	<Body variant={alt ? 'semibold11' : 'regular11'} fontSize="clamp(10px, .9vw, 1rem)" {...others} />
)

export default Mini
