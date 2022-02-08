import { Stack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import FileUpload from 'components/input/file'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import useApiUploadKycFile from 'modules/hooks/kyc/useApiUploadKycFile'
import useKycContext from 'modules/hooks/kyc/useKycContext'
import React, { useState } from 'react'
import { KycProps } from '../type'

const FileForm = ({ controller, onComplete: onCompleteStage, name }: KycProps & { name?: string }) => {
	const stage = controller.getPendingStage()
	const [fileUpload, setFileUpload] = useState<FileList>()
	const { refetchKyc } = useKycContext()
	const postKyc = useApiUploadKycFile()
	return (
		<Stack
			justify="space-between"
			spacing={{ base: 8, md: 10 }}
			onSubmit={(event) => {
				event.preventDefault()
				console.log(stage?.stage.code, stage?.unique_id, fileUpload?.[0])
				if (fileUpload?.length) {
					const formData = new FormData()
					formData.append('stage', stage?.stage.code as string)
					formData.append('unique_id', stage?.unique_id as string)
					formData.append(name || '', fileUpload?.[0])
					postKyc.mutateAsync(formData).then(refetchKyc)
				}
			}}
			//	background={colors.white}
			//spacing={8}
			as="form"
			flex={6}
			p="0"

			//	px={{ md: 8, base: 4 }}
		>
			<Caption alt textAlign="center">
				{stage?.stage.name}
			</Caption>
			<Stack>
				<Caption alt>{`${stage?.first_name} ${stage?.last_name}`}</Caption>
				<Small alt> Please answer a few more questions for me</Small>
			</Stack>
			<Stack>
				<FileUpload trapError name={name} onSelectFile={setFileUpload} accept={stage?.stage.mimi_type} isRequired title={stage?.stage.name} />
			</Stack>
			<Button size="sm" type="submit" looks="primary" isLoading={postKyc.isLoading}>
				Continue
			</Button>
		</Stack>
	)
}

export default FileForm
