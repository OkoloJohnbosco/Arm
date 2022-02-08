import { Box } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import { KycProps, KycStageStatus } from 'modules/kyc/type'
import React, { useEffect, useState } from 'react'
import Form from '../StageForm'
// import ParentHolderForm from './ParentHolderForm'
import Profile from './Profile'

const Index = (props: KycProps) => {
	const [editProfile, setEditProfile] = useState()
	const holder = props.controller.getPendingStage()
	const isCompleteHolders = holder?.is_multiple_account && holder.number_of_multiple_account === holder.number_of_provided_multiple_account

	console.log(holder)
	useEffect(() => {
		if (!props.controller.getPendingStage()?.stage) {
			props.onComplete?.()
		}
	}, [props?.controller.getKyc().kyc_tier.status, props.controller.getPendingStage()?.stage])

	return (
		<Box>
			<IfElse ifOn={!holder?.is_multiple_account || !holder.number_of_multiple_account || isCompleteHolders} elseThen={<Profile {...props} />}>
				<Form {...props} />
			</IfElse>
		</Box>
	)
}

export default Index
