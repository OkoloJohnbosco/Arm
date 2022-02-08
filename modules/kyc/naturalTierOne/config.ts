import { FC } from 'react'
import { KycProps, KYCStageType, NaturalTierOneKycStageCode } from '../type'
import BankDetails from './BankDetails'
import UserAccount from './UserAccount'
import UserAddress from './UserAddress'
import UserBVN from './UserBvn'
import NextOfKins from '../tier3/NextOfKinsForm'
import ParentHolderForm from '../profile'

export const naturalTierOneStageComponents: Array<{ stageCode: NaturalTierOneKycStageCode; StageComponent: FC<KycProps> }> = [
	{ stageCode: NaturalTierOneKycStageCode.BankDetails, StageComponent: BankDetails },
	{ stageCode: NaturalTierOneKycStageCode.UserAccount, StageComponent: UserAccount },
	{ stageCode: NaturalTierOneKycStageCode.UserAddress, StageComponent: UserAddress },
	{ stageCode: NaturalTierOneKycStageCode.UserBVN, StageComponent: UserBVN },
	{ stageCode: NaturalTierOneKycStageCode.UserProfile, StageComponent: ParentHolderForm },
	{ stageCode: NaturalTierOneKycStageCode.NextOfKin, StageComponent: NextOfKins },
]

// export const naturalTierOneStageComponents: Array<{ stageCode: NaturalTierOneKycStageCode; StageComponent: FC<KycProps> }> = [
// 	{ stageCode: NaturalTierOneKycStageCode.BankDetails, StageComponent: BankDetails },
// 	{ stageCode: NaturalTierOneKycStageCode.UserAccount, StageComponent: UserAccount },
// 	{ stageCode: NaturalTierOneKycStageCode.UserAddress, StageComponent: ParentHolderForm },
// 	{ stageCode: NaturalTierOneKycStageCode.UserBVN, StageComponent: UserBVN },
// 	{ stageCode: NaturalTierOneKycStageCode.UserProfile, StageComponent: ParentHolderForm },
// 	{ stageCode: NaturalTierOneKycStageCode.NextOfKin, StageComponent: NextOfKins },
// ]
