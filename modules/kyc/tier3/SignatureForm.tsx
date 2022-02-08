import React from 'react'
import { KycProps } from '../type'
import FileForm from './FileForm'

const SignatureForm = (props: KycProps) => {
	return <FileForm {...props} name="signature" />
}

export default SignatureForm
