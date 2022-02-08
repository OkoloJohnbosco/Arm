import React from 'react'
import { Box, HStack, Stack, Text, IconButton } from '@chakra-ui/react'
import Icon from 'components/icon'
import { BsTrash } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'

interface CardProps {
	name?: string
	title?: string
	cardType?: 'visa' | 'master'
	cardNumber?: string
}

function AtmCard(props: CardProps) {
	return (
		<Box minW="200px" rounded="15px" bg="#e1e1e1" maxW="270px" p={5}>
			<Stack spacing={7}>
				<HStack justify="space-between">
					<HStack>
						<HStack spacing={0}>
							<Box boxSize={5} bg="#eb001b" rounded="full" />
							<Box pl={-4} position="relative" left="-8px" boxSize={5} bg="#f79e1b" opacity="0.7" rounded="full" />
						</HStack>
						<Text fontWeight="bold" letterSpacing={2}>
							.... .... 0212
						</Text>
					</HStack>
					<Text color="neutral.100" fontWeight="bold" fontSize="14px" letterSpacing={2}>
						GTB
					</Text>
				</HStack>

				<Stack>
					<HStack justify="space-between">
						<Text fontWeight="bold">William Johnson</Text>
						<Text fontWeight="bold" color="claret.500">
							Active
						</Text>
					</HStack>
					<HStack pt={3}>
						<IconButton mr={2} aria-label="delete Card" _focus={{ outline: 'none' }} size="small" colorScheme="transparent">
							<Icon color="claret.500" iconComp={BsTrash} />
						</IconButton>
						<IconButton aria-label="Edit details" outline="none" size="small" _focus={{ outline: 'none' }} colorScheme="transparent">
							<Icon color="claret.500" iconComp={AiOutlineEdit} />
						</IconButton>
					</HStack>
				</Stack>
			</Stack>
		</Box>
	)
}

export default AtmCard
