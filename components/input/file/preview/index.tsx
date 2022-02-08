import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { hexToRGBA3 } from 'lib/theme/color'
import React from 'react'
import { FaFilePdf } from 'react-icons/fa'
import { GoFilePdf } from 'react-icons/go'
import { RiDeleteBin3Line } from 'react-icons/ri'
{
	/* <PlaceHolder.Preview file={previewFile} onRemoveFile={() => setPreviewFile()} /> */
}
const icons = {
	pdf: GoFilePdf,
}

const Preview = ({ file, onRemoveFile }: { file: FileList; onRemoveFile: () => void }) => {
	const fileData = file[0]
	const size = fileData.size / 1024 / 1024
	const Icon = icons['pdf']
	console.log(size <= 1, size)
	return (
		<Flex align={{ base: 'end', md: 'center' }} sx={{ gap: '1rem' }} w="full">
			<Stack>
				<HStack>
					<Flex rounded="full" bg="#FFE6E2" p="2">
						<Icon size="14px" style={{ color: '#FC573B', borderRadius: '2px' }} />
					</Flex>
					<Body wordBreak="break-all">{fileData.name}</Body>
				</HStack>

				<Flex justify="space-between" sx={{ gap: '18px' }} wrap="wrap">
					<HStack>
						<Small color="grey.400">
							Size: {size <= 1 ? (fileData.size / 1024).toFixed(1) : size.toFixed(1)}
							{size <= 1 ? 'KB' : 'MB'}
						</Small>
						<Caption color="claret.500">Open File</Caption>
					</HStack>
					<Flex onClick={onRemoveFile} align="center" rounded="8" bg="#FFE6E2" px="2" aria-label="remove attachment" role="button">
						<RiDeleteBin3Line size="18px" style={{ color: '#FC573B', borderRadius: '2px' }} /> &nbsp;
						<Small>Remove</Small>
					</Flex>
				</Flex>
			</Stack>
		</Flex>
	)
}

export default Preview
