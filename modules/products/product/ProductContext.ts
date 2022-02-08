import { ProductType } from 'modules/account/types'
import React from 'react'

export default React.createContext<{
	closeDetails: () => void
	isQueuedForMix: boolean
	product: ProductType
	setQueueMix: (isQueued: boolean) => void
}>({} as any)
