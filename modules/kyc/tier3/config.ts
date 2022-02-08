import { FC } from 'react'
import { KycProps, KYCStageType, TierThreeStageCode } from '../type'
import UtilityBill from './UtilityBillForm'
import BankStatement from './BankStatement'
import NextOfKins from './NextOfKinsForm'
import ProofOfIdentity from './ProofOfIdentityForm'
import PassportForm from './PassportForm'
import SignatureForm from './SignatureForm'

export const tierThreeKycComponents: Array<{ stageCode: TierThreeStageCode; StageComponent: FC<KycProps> }> = [
	{ stageCode: TierThreeStageCode.UtilityBill, StageComponent: UtilityBill },
	{ stageCode: TierThreeStageCode.BankStatement, StageComponent: BankStatement },
	{ stageCode: TierThreeStageCode.NextOfKin, StageComponent: NextOfKins },
	{ stageCode: TierThreeStageCode.ProofOfIdentity, StageComponent: ProofOfIdentity },
	{ stageCode: TierThreeStageCode.Passport, StageComponent: PassportForm },
	{ stageCode: TierThreeStageCode.Signature, StageComponent: SignatureForm },
]
