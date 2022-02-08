import React from 'react'
import Heading from './Heading'
import { HeadingTypographyProps } from './types'

const SubHeading = (props: HeadingTypographyProps) => {
	return <Heading variant="h2" {...props} />
}

export default SubHeading
