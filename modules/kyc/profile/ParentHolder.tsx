import { Avatar, Box, Flex, HStack, Image, Stack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import NameAvatar from 'components/name-avatar'
import Caption from 'components/typography/Caption'
import Mini from 'components/typography/Mini'
import Small from 'components/typography/Small'
import { KycAccountHolderType } from 'modules/kyc/type'
import { KycController } from 'modules/kyc/utils'
import React from 'react'
import { BiEdit } from 'react-icons/bi'

type Props = {
	//holder: KycAccountHolderType
	controller: KycController
}

const ParentHolder = ({ controller }: Props) => {
	return (
		<Flex
			w="full"
			borderStyle="solid"
			borderWidth="1px"
			borderColor="claret.200"
			rounded="md"
			shadow="B30"
			wrap="wrap"
			// h="32"
		>
			{/* <Avatar rounded="0" flex="1" flexBasis="8rem" borderLeftRadius="md" w="full" h="full" maxH="sm" /> */}

			<Stack justify="space-between" p="4" w="full" flex="9" flexBasis="10rem">
				<Flex justify="space-between" wrap="wrap">
					<Box>
						<Mini>Account Name:</Mini>
						<Caption alt>{`${controller?.getParentHolder()?.first_name} ${controller.getParentHolder()?.last_name}`}</Caption>
					</Box>

					<Box>
						<Mini>Account Type: </Mini>
						<Caption alt>Sibling</Caption>
					</Box>
				</Flex>
				<Box>
					<Mini>Number Account Holders</Mini>
					<HStack wrap="wrap">
						<Caption alt>
							{controller.getPendingStage()?.number_of_provided_multiple_account} of {controller.getPendingStage()?.number_of_multiple_account}{' '}
							Persons
						</Caption>
						<Flex>
							{controller.listHolders().map((holder, i) => {
								console.log(i)
								return (
									<Box key={i} rounded="full" border="1px solid white" position="relative" ml={i == 0 ? 0 : '-.4rem'}>
										<NameAvatar name={holder.first_name} size="xs" />
									</Box>
								)
							})}
						</Flex>
					</HStack>
				</Box>
			</Stack>
		</Flex>
	)
}

export default ParentHolder
