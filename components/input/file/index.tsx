import { useToast, Box, Stack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import IfElse from 'components/if-else'
import { colors } from 'lib/theme'
import React, { useEffect, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import uniqid from 'uniqid'
import InputWrapper from '../InputWrapper'
import { InputWrapperProps } from '../type'
import { AvaterPlaceholder, DefaultPlaceholder } from './placeholders'
import { FileUploadPlaceholderNameType } from './type'

const uploadPlaceholders: Record<FileUploadPlaceholderNameType, React.FC<{ file: any }>> = {
	image: AvaterPlaceholder,
	default: DefaultPlaceholder,
	document: DefaultPlaceholder,
	avater: AvaterPlaceholder,
}

const getPlaceHolder = (placeholderName: FileUploadPlaceholderNameType) => {
	switch (placeholderName) {
		case 'avater':
			return uploadPlaceholders[placeholderName]
		case 'default':
			return uploadPlaceholders[placeholderName]
		case 'document':
			return uploadPlaceholders[placeholderName]
		case 'image':
			return uploadPlaceholders[placeholderName]
		default:
			return uploadPlaceholders.default
	}
}

export interface FileUploadType extends InputWrapperProps {
	onSelectFile?: (file: any) => void
	isLoading?: boolean
	file?: any
	buttonLabel?: React.ReactNode
	accept?: string[]
	previewComp?: React.FC<{ file: any }> | FileUploadPlaceholderNameType
}

const FileUpload = ({
	file,
	onSelectFile: onSubmit = () => {},
	accept,
	previewComp: PreviewComp = 'default',
	containerStyle = { w: 'full', p: -1, align: 'center', justify: 'center', background: 'none' },
	title,
	error,
	icon,
	isDisabled,
	iconPosition,
	underline,
	isRequired,
	isLoading,
	name,
	trapError,
}: FileUploadType) => {
	// const [inputFiles, setInputFiles] = useState<FileList | string>(file)
	// useEffect(() => {
	// 	setInputFiles(file)
	// }, [file])
	// const fileUrl = inputFiles?.length && (typeof inputFiles === 'string' ? inputFiles : URL.createObjectURL(inputFiles[0]))
	const inputId = uniqid()
	const [previewFile, setPreviewFile] = useState()
	const toast = useToast()
	useEffect(() => {
		//@ts-ignore
		setPreviewFile()
	}, [name])

	useEffect(() => {
		setPreviewFile(file)
		console.log('Changed')
	}, [file])

	const fileUrl = file?.length && (typeof file === 'string' ? file : URL.createObjectURL(file[0]))
	const PlaceHolder = typeof PreviewComp === 'string' ? getPlaceHolder(PreviewComp) : PreviewComp

	const fileChangeHandler = (e) => {
		e.preventDefault()
		const file = e.target.files
		if (file?.[0]?.size > 5242880) {
			toast({
				title: 'Caution',
				status: 'warning',
				duration: 4000,
				position: 'top-right',
				description: 'Document size should not exceed 5mb',
				isClosable: true,
			})
			//@ts-ignore
			setPreviewFile()
			return
		}
		setPreviewFile(file)
		onSubmit(file)
	}
	return (
		<Stack>
			{
				//@ts-ignore
				previewFile && (
					//@ts-ignore
					<PlaceHolder.Preview file={previewFile} onRemoveFile={() => setPreviewFile()} />
				)
			}
			<InputWrapper
				name={name}
				trapError={trapError}
				underline={underline}
				title={title}
				error={error}
				isRequired={isRequired}
				icon={icon}
				isDisabled={isDisabled}
				containerStyle={containerStyle}
			>
				<input accept={accept?.join(',')} type="file" id={`actual-btn-${inputId}`} hidden onChange={fileChangeHandler} />

				<Box
					position="relative"
					as="label"
					w={containerStyle?.w}
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
							rounded="md"
							size="xs"
							top={-0}
							right={-0}
							position="absolute"
							as="label"
							responsive={false}
							//@ts-ignore
							htmlFor={`actual-btn-${inputId}`}
							rightIcon={<BiImageAdd />}
							looks="accent"
						>
							Select File
						</Button>
					</Box>

					<Box className="upload-container" as="label" htmlFor={`actual-btn-${inputId}`}>
						<PlaceHolder file={previewFile} />
					</Box>
				</Box>
			</InputWrapper>
		</Stack>
	)
}

export default FileUpload
