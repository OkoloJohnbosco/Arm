import { Box } from '@chakra-ui/react'
import SubHeading from 'components/typography/SubHeading'
import React, { createElement, useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

type InformationType = {
	title: string
	description: string
}

type ErrorPlaceHolderType = {
	type: string
	information: InformationType
	portalId: string
	mount?: boolean
}

type ErrorPortalPropsTypes = {
	errorPlaceHolers?: Array<ErrorPlaceHolderType>
	children: any
}

const ErrorPortalWrapper = (props: ErrorPortalPropsTypes) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<Box>
			{/* {props.children}
			{props.errorPlaceHolers?.map((placeHolder, key) => {
				return mounted ? document.getElementById(placeHolder.portalId)?.append(<div>Hi</div>) : null
			})} */}
		</Box>
	)
}

export default ErrorPortalWrapper
