import { Avatar, Box, Flex, HStack, Image, Stack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import Caption from 'components/typography/Caption'
import Mini from 'components/typography/Mini'
import Small from 'components/typography/Small'
import { hexToRGBA3 } from 'lib/theme/color'
import { KycAccountHolderType } from 'modules/kyc/type'
import React from 'react'
import { BiEdit } from 'react-icons/bi'

type Props = {
	holder: KycAccountHolderType
	setEdit: (holder: KycAccountHolderType) => void
}

const AccountHolder = (props: Props) => {
	return (
		<Flex
			w="full"
			//borderStyle="solid"
			//	borderWidth="1px"
			//	borderColor="claret.200"
			bg="#FFE4F0"
			rounded="md"
			shadow="B30"
			wrap="wrap"
			// h="32"
		>
			{/* <Box flex="1" flexBasis="6rem" h="32"> */}
			<Avatar rounded="0" flex="1" flexBasis="6rem" borderLeftRadius="md" w="full" h="28" />
			{/* </Box> */}
			<Stack justify="space-between" p="4" w="full" flex="9">
				<Flex justify="space-between" wrap="wrap">
					<Box>
						<Mini>You added:</Mini>
						<Caption>Name</Caption>
					</Box>

					<Box>
						<Mini>Relationship: </Mini>
						<Caption>Sibling</Caption>
					</Box>
				</Flex>

				<HStack justify="space-between">
					<Button size="xs" leftIcon={<BiEdit />} onClick={() => props.setEdit(props.holder)}>
						Edit
					</Button>
					<Small role="button" textDecoration="underline" variant="semibold12">
						Remove
					</Small>
				</HStack>
			</Stack>
		</Flex>
	)
}

export default AccountHolder
