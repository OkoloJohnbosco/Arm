import React, { useMemo, useState } from 'react'
import Stage from './profile'
import { KycStageStatus, KYCStageType, KycTierProps } from './type'
import { KycController } from './utils'

// type KycContextType = {
// 	reponseMessage?: string
// 	setResponseMessage: (responseMessage: string) => void
// }

// export const KycContext = React.createContext<KycContextType>() as any

const Kyc = (props: KycTierProps) => {
	const controller = useMemo(() => new KycController(props.kycTier), [props.kycTier])
	// const [responseMessage, setResponseMessage] = useState<string | undefined>('')

	const onCompleteStage = () => {
		props.onComplete()
	}
	// <KycContext.Provider value={{ responseMessage, setResponseMessage }}>

	return <Stage onComplete={props.onComplete} controller={controller} />
}
export default Kyc
