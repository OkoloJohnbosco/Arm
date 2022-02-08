import React from 'react'
import Body from './Body'
import { BodyTypography } from './types'

const Small = ({ alt, ...others }: BodyTypography) => (
	<Body variant={alt ? 'regular14' : 'regular12'} fontSize="clamp(12px, .10vw, 1rem)" {...others} />
)

export default Small
