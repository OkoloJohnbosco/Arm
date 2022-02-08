import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import { getFileCategory } from '../utils'

const ImagePreview = ({ file }: { file: FileList }) => {
	const fileUrl = file?.length ? (typeof file === 'string' ? file : URL.createObjectURL(file[0])) : undefined
	const ext = typeof file !== 'string' ? file[0].type : null
	const fileCategory = getFileCategory(ext)

	return (
		<Box>
			{fileCategory === 'image' && <Image src={fileUrl} backgroundSize="contain" />}
			{fileCategory === 'video' && <video src={fileUrl} controls />}
		</Box>
	)
}

export default ImagePreview
