import { Avatar } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import React from 'react'

const Avater = ({ file }: { file: FileList }) => {
	const fileUrl = file?.length ? (typeof file === 'string' ? file : URL.createObjectURL(file[0])) : ''
	return <Avatar border={`1.5px dashed ${colors['grey-100']}`} size="xl" src={fileUrl} />
}

export default Avater
