import { CustomerBusinessType, ProductInvestmentType } from 'modules/account/types'
import useInvestedProducts from 'modules/hooks/investment/useApiListInvestmentsDetails'
import { useMemo } from 'react'

export default () => {
	const investedProducts = useInvestedProducts()

	const investments = useMemo(
		function () {
			return investedProducts.value?.customer_businesses.reduce(function (accum, business) {
				return [...accum, ...business.products]
			}, [] as ProductInvestmentType[])
		},
		[investedProducts.value]
	)
	console.log(investments)
	return { ...investedProducts, value: investments }
}
