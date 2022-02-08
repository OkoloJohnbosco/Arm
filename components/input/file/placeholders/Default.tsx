import { Flex, Stack, VStack } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import Preview from '../preview'

const Default = ({ file }: { file: FileList }) => {
	const fileUrl = file?.length ? (typeof file === 'string' ? file : URL.createObjectURL(file[0])) : ''
	return (
		<Stack>
			<Flex
				p={4}
				rounded="md"
				//background="neutral.50"
				borderStyle="1px solid dashed"
				borderColor="neutral.50"
				align="center"
				justify="center"
				w="full"
			>
				<VStack spacing={0}>
					<AiOutlineCamera size={24} />
					<Body variant="semibold13">Click to upload</Body>
				</VStack>
			</Flex>
		</Stack>
	)
}

Default.Preview = Preview
export default Default
