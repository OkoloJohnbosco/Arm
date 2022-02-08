import { RoboComponentNameType, RoboNoticeType } from 'lib/types'
import { FC } from 'react'

const roboComponents: { [x in RoboComponentNameType]?: FC<RoboNoticeType> } = {
	[RoboComponentNameType.InvestmentMix]: (p: RoboNoticeType) => null,
}

export const getRoboComponent = (notice: RoboNoticeType) => {
	if (!notice.roboComponentName) {
		return
	}
	return roboComponents[notice.roboComponentName]
}
