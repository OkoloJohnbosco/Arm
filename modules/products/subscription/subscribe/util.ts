import { InvestMentMixType } from 'modules/account/types'

export const getInvestmentLimits = ({
	totalAmount,
	mixedProducts,
	currentMixProduct,
}: {
	totalAmount: number
	mixedProducts: InvestMentMixType[]
	currentMixProduct: InvestMentMixType
}) => {
	const mixedAmount = mixedProducts.find((mix) => mix.product?.id === currentMixProduct.product?.id)?.amountInvested || 0
	const investedAmount = mixedProducts.reduce((amount, next) => {
		return next.product?.id !== currentMixProduct.product?.id ? amount + (next.amountInvested || 0) : amount
	}, 0)
	return { max: totalAmount - investedAmount, min: currentMixProduct.product?.minimum_investment }
}

export const isEqualInvestmentMix = (a: InvestMentMixType, b: InvestMentMixType) => {
	return a.amountInvested === b.amountInvested && a.duration === b.duration && a.isRepeatable === b.isRepeatable && a.plan === b.plan
}

export const containsInvestmentMix = (mix?: InvestMentMixType, mixList?: InvestMentMixType[]) => {
	const foundMix = mixList?.find((m) => m.product?.id === mix?.product?.id)
	return foundMix && mix ? isEqualInvestmentMix(foundMix, mix) : false
}
