import { Box } from '@chakra-ui/react'
import React from 'react'
import { FormInputFieldConfigType } from '../type'

const NothingInput = (props: FormInputFieldConfigType) => {
	return (
		<Box>
			No Input matched {props.type} {JSON.stringify(props)}
		</Box>
	)
}

export default NothingInput
