import { FC } from 'react'
import NaturalTierOneKyc from './Kyc'
import TierError from './TierError'
import {
	KycAccountHolderType,
	KycProps,
	KycStageStatus,
	KycTierNameType,
	KycTierProps,
	KYCTierType,
	NaturalTierOneKycStageCode,
	TierThreeStageCode,
} from './type'
import TierThree from './tier3'
import { tierThreeKycComponents } from './tier3/config'
import { naturalTierOneStageComponents } from './naturalTierOne/config'
import StageError from './StageError'

export class KycController {
	private parentHolder?: KycAccountHolderType
	private tier: KYCTierType

	constructor(kycTier: KYCTierType) {
		console.log(kycTier, 'from Kyc-Controller, omo')
		this.tier = kycTier
		this.parentHolder = kycTier.kyc_tier.account_holders_stages.find((t) => t.is_parent)
	}

	private hasCompleteParentKyc() {
		return !this.parentHolder?.stages.some((stage) => stage.status !== KycStageStatus.Completed)
	}

	getParentUniqueId() {
		return this.parentHolder?.unique_id
	}

	getPendingStage() {
		if (!this.hasCompleteParentKyc()) {
			return this.getHighPriorityKycFromTier(this.parentHolder)
		}
		for (const tier of this.tier.kyc_tier.account_holders_stages) {
			if (tier.is_parent) continue
			const isKyc = this.getHighPriorityKycFromTier(tier)
			if (isKyc) return isKyc
		}
	}
	getKyc() {
		return this.tier
	}
	getParentHolder() {
		return this.parentHolder
	}

	listHolders() {
		const filterHolders = this.tier.kyc_tier.account_holders_stages.filter((holder) => !holder.is_parent)
		return filterHolders ? filterHolders : []
	}

	getNextPendingStage() {}

	getPreviousPendingStage() {}

	private getHighPriorityKycFromTier(holder?: KycAccountHolderType) {
		for (const stage of holder?.stages || []) {
			if (stage.status !== KycStageStatus.Completed)
				return {
					//   first_name: holder.first_name,
					// last_name: holder.last_name,
					stage,
					parentId: this.getParentUniqueId(),
					//  unique_id: holder.unique_id,
					...holder,
				}
		}
	}

	static getKycTierComponent(tierName?: KycTierNameType): (props: KycTierProps) => JSX.Element {
		// const kycTier: { [tierName in KycTierNameType]: FC<any> } = {
		// 	NATURAL_TIER_1: NaturalTierOneKyc,
		// 	TIER_3:TierThree
		// }
		console.log(tierName)
		switch (tierName) {
			case KycTierNameType.NaturalTierOne:
				return NaturalTierOneKyc
			case KycTierNameType.TIER_THREE:
				return TierThree
			default:
				return TierError
		}
	}

	static getStageComponent(code?: NaturalTierOneKycStageCode | TierThreeStageCode) {
		const stageComponent = [...tierThreeKycComponents, ...naturalTierOneStageComponents].find(({ stageCode }) => stageCode === code)?.StageComponent
		console.log(stageComponent, 'stageComponent')
		console.log(StageError.bind(null, `No Component to handle ${code} Form`), 'StageError.bind(null, `No Component to handle ${code} Form`)')
		return stageComponent ? stageComponent : StageError.bind(null, `No Component to handle ${code} Form`)
	}
}
