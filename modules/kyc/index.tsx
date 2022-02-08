import ServerErrorBoundary from 'components/error/ServerErrorBoundary'
import LoadingWrapper from 'components/layout/loading-wrapper'
import Caption from 'components/typography/Caption'
import useApiGetKyc from 'modules/hooks/kyc/useApiGetKyc'
import { KycContext } from 'modules/hooks/kyc/useKycContext'
import React, { FC, useEffect, useState } from 'react'
import KycForm from './Kyc'

import { KycStageStatus, KycTierNameType, KYCTierType, KYC_STAGE } from './type'
import { KycController } from './utils'

type Props = {
	onComplete: () => void
	kyc?: KYCTierType
	enabled?: boolean
	amount?: number
	refetchKyc?: () => void
}

const Kyc = ({ enabled = false, onComplete, kyc, amount, refetchKyc }: Props) => {
	const { isFetching, value, refetch } = useApiGetKyc({ enabled, amount })
	//const TierForms = KycController.getKycTierComponent(value?.kyc_tier.code)
	const handleComplete = (next: KYC_STAGE) => {
		onComplete()
	}
	useEffect(() => {
		//if (value?.kyc_tier.status === KycStageStatus.Completed) onComplete?.()
	}, [onComplete, value?.kyc_tier.status])

	return (
		<LoadingWrapper isLoading={isFetching && !value && !kyc}>
			<ServerErrorBoundary>
				<KycContext.Provider value={{ refetchKyc: refetchKyc || refetch }}>
					<KycForm
						onComplete={handleComplete}
						// @ts-ignore
						kycTier={kyc || value}
					/>
				</KycContext.Provider>
			</ServerErrorBoundary>
		</LoadingWrapper>
	)
}
export default Kyc
