import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from '@chakra-ui/react'
import BackWrapper from 'components/navigation/BackWrapper'
import { OTPForm } from 'components/otp'
import { BROADCAST_KYC_PROMPT } from 'constant'
import { setBroadcastStorage } from 'lib/broadcastStorage'
import { hexToRGBA3 } from 'lib/theme/color'
import useUser from 'modules/account/hooks/useUser'
import useApiGetKyc from 'modules/hooks/kyc/useApiGetKyc'
import Redemption from 'modules/investment/redemption/RedemptionForm'
import RedemptionSucess from 'modules/investment/redemption/RedemptionSucess'
//import kyc from 'modules/products/subscription/kyc'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { KycStageStatus, KycTierNameType } from './type'
//import Kyc from './Kyc'
import Kyc from './index'

// const tierNameDirectoryMap = new Map().set(KycTierNameType.NaturalTierOne, './naturalTierOne')

// const kycComponent: { [x in KycTierNameType]: any } = {
// 	NATURAL_TIER_1: NaturalTierOne,
// }

// const fetchComponent = (tierName?: KycTierNameType) => {
// 	return tierName ? kycComponent[tierName] : () => <div>Error Loading dynamic {tierName} component</div>
// }

type Props = {
	enabled?: boolean
	isKycOpen: boolean
	setIsKycOpen: (state?: boolean) => void
	enableMode?: 'lazy' | 'eager' | 'persistent'
	children?: any
	amount?: number
}

const KycDrawer = (props: Props) => {
	const getKyc = useApiGetKyc({ enabled: props.enabled, amount: props.amount })
	const kyc = getKyc.value
	// const kyc = data
	// console.log('TODO DISABLE API CALL IF RUNNING ON MainAPP', props.amount)
	// console.log('getKyc.value', getKyc)

	const [canClose, setCanClose] = useState<boolean>(false)

	useEffect(() => {
		// console.log(kyc?.kyc_tier.status === KycStageStatus.Completed)
		const isKyc = kyc?.kyc_tier && kyc?.kyc_tier.status !== KycStageStatus.Completed // kyc?.stages.some((stage) => stage.status === KycStageStatus.Pending)
		// console.log(kyc?.kyc_tier && kyc?.kyc_tier.status !== KycStageStatus.Completed, 'check') // kyc?.stages.some((stage) => stage.status === KycStageStatus.Pending)
		switch (props.enableMode) {
			case 'eager':
				console.log('eager')
				if (isKyc && props.enabled) props.setIsKycOpen(true)
				setCanClose(true)
				break
			case 'lazy':
				if (isKyc && props.enabled && true /**hasNotResponded to prompt **/) props.setIsKycOpen(true)
				setCanClose(true)
				console.log('lazy')
				break
			case 'persistent':
				if (isKyc && props.enabled) props.setIsKycOpen(true)
				setCanClose(false)
				break
		}
		if (!isKyc && props.isKycOpen) props.setIsKycOpen(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kyc])

	const handleClose = () => {
		if (props.enableMode === 'lazy') {
			setBroadcastStorage(BROADCAST_KYC_PROMPT, '0', 'sessionStorage')
		}
		props.setIsKycOpen(false)
	}

	return (
		<>
			<Drawer closeOnOverlayClick={false} size="sm" isOpen={!!props.isKycOpen} placement="right" onClose={canClose ? handleClose : () => {}}>
				<DrawerOverlay background={hexToRGBA3('claret', 100, 0.4)} />
				<DrawerContent>
					<DrawerCloseButton background="claret.500" boxSize="6" rounded="full" color="neutral.0" />

					<DrawerBody mt="10">
						<Kyc kyc={kyc} onComplete={() => {}} amount={props.amount} refetchKyc={getKyc.refetch} />

						{/* {redemptionStage === RedemptionStage.Complete && <RedemptionSucess onClose={onClose} />} */}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			{props.children}
		</>
	)
}

export default KycDrawer
