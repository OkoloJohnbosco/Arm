import { Avatar, Box, ButtonGroup, Flex } from '@chakra-ui/react'
import { Button } from 'components/button'
import { Card } from 'components/card'
import IfElse from 'components/if-else'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import React, { useEffect, useState } from 'react'
import { BiCheck, BiImageAdd } from 'react-icons/bi'
import uniqid from 'uniqid'

export interface FileUploadType {
	onSubmit?: (file: any) => void
	isLoading?: boolean
	file?: any
	buttonLabel?: React.ReactNode
	accept: string[]
}

const Upload = ({ file, onSubmit = () => {}, accept, isLoading }: FileUploadType) => {
	// const [inputFiles, setInputFiles] = useState<FileList | string>(file)
	// useEffect(() => {
	// 	setInputFiles(file)
	// }, [file])
	// const fileUrl = inputFiles?.length && (typeof inputFiles === 'string' ? inputFiles : URL.createObjectURL(inputFiles[0]))
	const inputId = uniqid()
	const fileUrl = file?.length && (typeof file === 'string' ? file : URL.createObjectURL(file[0]))
	return (
		<Card padding={4} transition="all .3s ease" background={colors.white} rounded={0} onClick={(event) => event.stopPropagation()}>
			<input
				accept={accept?.join(',')}
				type="file"
				id={`actual-btn-${inputId}`}
				hidden
				onChange={(event) => {
					event.preventDefault()
					//	setInputFiles(event.target.files)
					onSubmit(event.target.files)
				}}
			/>

			<Box
				position="relative"
				as="label"
				//@ts-ignore
				//htmlFor={`actual-btn-${inputId}`}
				display="inline-block"
			>
				<Box
					position="absolute"
					as="label"
					//display="block"
					height="full"
					w="full"
					zIndex={90}
					opacity={0}
					//@ts-ignore
					htmlFor={`actual-btn-${inputId}`}
					_hover={{
						opacity: 1,
					}}
				>
					<Button
						size="xs"
						top={-3}
						right={-3}
						position="absolute"
						as="label"
						//@ts-ignore
						htmlFor={`actual-btn-${inputId}`}
						rightIcon={<BiImageAdd />}
					>
						Select File
					</Button>
				</Box>
				<Avatar border={`1.5px dashed ${colors['grey-100']}`} size="2xl" src={fileUrl} />
			</Box>
		</Card>
	)
}

export default Upload
