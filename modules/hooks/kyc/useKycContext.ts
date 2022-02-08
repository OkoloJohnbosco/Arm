import React, { useContext } from 'react'

type KycContextType = {
	refetchKyc: () => void
}
export const KycContext = React.createContext<KycContextType>({} as any)

const useKycContext = () => {
	return useContext(KycContext)
}
export default useKycContext
