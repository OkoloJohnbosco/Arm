import React from 'react'
import { KycProps } from '../type'
import FileForm from './FileForm'

const PassportForm = (props: KycProps) => {
	return <FileForm {...props} name="passport" />
}

export default PassportForm
