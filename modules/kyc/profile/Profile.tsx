import { Avatar, Box, Flex, Grid, HStack, Stack } from '@chakra-ui/react'
import BackWrapper from 'components/navigation/BackWrapper'
import IfElse from 'components/if-else'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import SubHeading from 'components/typography/SubHeading'
import { KycAccountHolderType, KycProps } from 'modules/kyc/type'
import React, { useState } from 'react'
import { BiEdit, BiPlus } from 'react-icons/bi'
import AccountHolder from './AccountHolder'
import AccountHolderForm from './AccountHolderForm'
import ParentHolder from './ParentHolder'
import ParentHolderForm from '../StageForm'

type Props = {
	//setEditProfile: (isEdit: boolean) => void
}

const Profile = ({ controller, onComplete }: KycProps & Props) => {
	const [editHolder, setEditHolder] = useState<KycAccountHolderType>()
	const [addNewHolder, setAddNewHolder] = useState(false)
	const [editParentHolder, setEditParentHolder] = useState<boolean>(false)

	return (
		<Stack spacing="8">
			<Stack>
				<SubHeading>For Joint Accounts</SubHeading>
				<Body variant="regular13">
					William, you selected joint account as your account type, you can switch the account type here before moving forward or add an account
					to proceed.
				</Body>
			</Stack>
			<IfElse
				ifOn={editParentHolder}
				elseThen={
					<Stack spacing="4">
						<ParentHolder controller={controller} />
						<HStack
							onClick={() => setEditParentHolder(true)}
							alignSelf="flex-end"
							w="fit-content"
							rounded="sm"
							role="button"
							p="1"
							bg="green.100"
						>
							<BiEdit />
							<Body variant="regular13">Edit Profile</Body>
						</HStack>
					</Stack>
				}
			>
				<BackWrapper label="Cancel" onClick={() => setEditParentHolder(false)}>
					<ParentHolderForm controller={controller} onComplete={onComplete} onClose={() => setEditParentHolder(false)} />
				</BackWrapper>
			</IfElse>
			<Caption alt>Available Account Holders: </Caption>
			<IfElse
				ifOn={editHolder || addNewHolder}
				elseThen={
					<>
						{controller.listHolders().map((holder, i) => (
							<AccountHolder key={i} holder={holder} setEdit={setEditHolder} />
						))}
					</>
				}
			>
				<BackWrapper
					label="Cancel"
					onClick={() => {
						setEditHolder(undefined)
						setAddNewHolder(false)
					}}
				>
					<AccountHolderForm holder={editHolder} controller={controller} onComplete={onComplete} />
				</BackWrapper>
			</IfElse>
			<IfElse
				ifOn={
					(editHolder || !addNewHolder) &&
					(controller.getPendingStage()?.number_of_provided_multiple_account || 0) <
						(controller?.getPendingStage()?.number_of_multiple_account || 0)
				}
			>
				<HStack role="button" align="center" onClick={() => setAddNewHolder(true)}>
					<Flex rounded="full" align="center" justify="center" borderColor="claret.500" borderStyle="solid" borderWidth="2px" p="2px">
						<Flex p="1" rounded="full" align="center" justify="center" bg="claret.500">
							<BiPlus color="white" size="20px" />
						</Flex>
					</Flex>
					<Body textDecoration="underline">Add Joint Account Holder</Body>
				</HStack>
			</IfElse>
		</Stack>
	)
}

export default Profile
