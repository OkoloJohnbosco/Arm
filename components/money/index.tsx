import { CurrencyType } from 'components/types/type'
import { BodyTypography } from 'components/typography/types'
import React from 'react'
import { formatCurrency, truncateDecimals } from 'utils/helpers'
import CurrencySymbol from 'components/currency'

interface MoneyComponentProps extends BodyTypography {
	currency?: CurrencyType | string
	amount?: number | string
	decimalPlace?: number
	negativeAmount?: boolean
}
export const moneyTostring = ({ currency, amount, decimalPlace = 2, negativeAmount = false, ...others }: MoneyComponentProps) => {
	const shortCode = typeof currency === 'object' ? currency?.code : currency
	return (
		//@ts-ignore
		<CurrencySymbol {...others} shortCode={shortCode} negativeAmount={negativeAmount}>
			{formatCurrency(Number(truncateDecimals(amount)))}
		</CurrencySymbol>
	)
}

export default ({ children, ...others }: { children?: string | number } & MoneyComponentProps) => moneyTostring({ ...others, amount: children })
