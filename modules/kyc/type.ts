import { FormBuilderContextType, FormInputFieldConfigType } from 'components/form/type'
import { KycController } from './utils'

export enum NaturalTierOneKycStageCode {
	UserAddress = 'USER_ADDRESS',
	BankDetails = 'BANK_DETAILS',
	UserBVN = 'USER_BVN',
	UserProfile = 'USER_PROFILE',
	UserAccount = 'USER_ACCOUNT_TYPE',
	NextOfKin = 'NEXT_OF_KIN',
}

export enum TierThreeStageCode {
	NextOfKin = 'NEXT_OF_KIN',
	ProofOfIdentity = 'PROOF_OF_IDENTITY',
	UtilityBill = 'UTILITY_BILL',
	BankStatement = 'BANK_STATEMENT',
	Signature = 'SIGNATURE',
	Passport = 'PASSPORT',
}

export enum KycStageStatus {
	InProgress = 'IN_PROGRESS',
	Pending = 'PENDING',
	Completed = 'COMPLETED',
}

export type KYCStageType = {
	id: number
	name: string
	code: NaturalTierOneKycStageCode | TierThreeStageCode
	is_active: boolean
	priority: number
	is_required: boolean
	status: KycStageStatus
	mimi_type: string[]
	fields: FormInputFieldConfigType[]
}

export enum KycTierNameType {
	NaturalTierOne = 'NATURAL_TIER_1',
	TIER_THREE = 'TIER_3',
}

// export type KycTierStages = {
// 	NATURAL_TIER_1: NaturalTierOneKycStageCode
// }

export enum KYC_STAGE {
	NextOfKin = 'NextOfKin',
	TierOne = 'TierOne',
	TierTwo = 'TierTwo',
	USER_BVN = 'BVN',
}

export interface KycProps {
	controller: KycController
	//  {
	// 	parentId: string
	// 	stage: KYCStageType
	// 	uniqueId: string
	// 	firstName: string
	// 	lastName: string
	// }
	onComplete: () => void
}

export interface KycTierProps {
	onComplete: (data?: any) => void
	kycTier: KYCTierType
}

export type KycAccountHolderType = {
	stages: KYCStageType[]
	unique_id: string
	first_name: string
	last_name: string
	is_parent: boolean
	is_multiple_account: boolean
	number_of_multiple_account: number
	number_of_provided_multiple_account: number
}

export type KYCTierType = {
	is_joint_account: boolean
	expected_account_holders: number
	account_holders_details_available: number
	kyc_tier: {
		name: string
		redemption_balance_limit: number
		code: KycTierNameType
		cummulative_balance_limit: number
		single_transaction_limit: number
		priority: number
		id: number
		account_holders_stages: KycAccountHolderType[]
		status: KycStageStatus
	}
}
