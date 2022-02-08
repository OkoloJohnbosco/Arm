import React, { useMemo, useState } from 'react'
import { KycProps, KycStageStatus, KYCStageType, KycTierProps } from '../type'
import { KycController } from '../utils'
import { tierThreeKycComponents } from './config'
// import BasicDetails from './UserAccount'

const data = [
	{
		name: 'User Address',
		code: 'USER_ADDRESS',
		priority: '1',
		id: 1,
		is_active: true,
		is_required: true,
		status: 'PENDING',
	},
	{
		name: 'Bank Details',
		code: 'BANK_DETAILS',
		priority: '1',
		id: 2,
		is_active: true,
		is_required: true,
		status: 'PENDING',
	},
	{
		name: 'User Bvn',
		code: 'USER_BVN',
		priority: '1',
		id: 3,
		is_active: true,
		is_required: true,
		status: 'PENDING',
	},
	{
		name: 'User Profile',
		code: 'USER_PROFILE',
		priority: '1',
		id: 4,
		is_active: true,
		status: 'PENDING',
		is_required: true,
	},
	{
		name: 'User Account Type',
		code: 'USER_ACCOUNT_TYPE',
		priority: '1',
		id: 5,
		is_active: true,
		is_required: true,
		status: 'PENDING',
	},
]

const TierThree = (props: KycTierProps) => {
	//@ts-ignore
	const stages: KYCStageType[] = data
	const [stage, setStage] = useState<KYCStageType | undefined>(stages[0] /**Find the first stage in natural tier that is not approved */)
	console.log(props.kycTier)
	const stageIndex = useMemo(() => stages.findIndex((s) => s.code === stage?.code), [stage])
	const controller = useMemo(() => new KycController(props.kycTier), [props.kycTier])

	//	console.log(nextStage )
	// const StageComponent: React.FC<KycProps> = tierThreeKycComponents.find(({ stageCode }) => stageCode === controller.getPendingStage()?.stage.code)
	// 	?.StageComponent as React.FC<KycProps>

	const StageComponent = KycController.getStageComponent(controller.getPendingStage()?.stage.code)

	const searchForwardFromIndex = (position: number) => {
		const resultFromPosition = stages.slice(position - 1).find((s) => s.status === KycStageStatus.Pending)
		if (resultFromPosition) {
			return resultFromPosition
		}
		return stages.slice(0, position).find((stage) => stage.status === KycStageStatus.Pending)
	}

	const searchBackwardFromIndex = (position: number) => {
		const resultFromPositionToStartIndex = stages
			.slice(0, position)
			.reverse()
			.find((stage) => stage.status === KycStageStatus.Pending)
		if (resultFromPositionToStartIndex) {
			return resultFromPositionToStartIndex
		}
		return stages
			.slice(position)
			.reverse()
			.find((stage) => stage.status === KycStageStatus.Pending)
	}

	const onCompleteStage = () => {
		/** 
		Look in the stage document for the next stage that does not meet the completed
		requirement and set it as the active state
		**/
		const nextStage = searchForwardFromIndex(stageIndex)

		if (nextStage) {
			setStage(nextStage)
		} else {
			// Let the tier controller know that all document in the stage are completed
			props.onComplete()
		}
	}

	const onForward = () => {
		setStage(searchForwardFromIndex(stageIndex))
	}

	const onPrevious = () => {
		setStage(searchBackwardFromIndex(stageIndex))
	}

	return (
		// <ScrollView onForward={onForward} onBackwards={onPrevious}>
		<StageComponent onComplete={onCompleteStage} controller={controller} />
		// </ScrollView>
	)
}
export default TierThree
