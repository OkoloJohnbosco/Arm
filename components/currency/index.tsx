import { Flex } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import Body from 'components/typography/Body'
import { BodyTypography } from 'components/typography/types'
import React from 'react'
import currencySymbols from './icon'

const CurrencySymbol = ({
	shortCode,
	children,
	afterText,
	fontSize,
	renderSymbol,
	negativeAmount,
	...others
}: {
	shortCode?: string
	children?: any
	afterText?: boolean
	fontSize?: number | string
	negativeAmount?: boolean
	renderSymbol?: (symbol: any) => React.ReactNode
} & BodyTypography) => {
	const symbol = currencySymbols[shortCode || '']
	return (
		<>
			<IfElse ifOn={negativeAmount}>
				<Body className="inline" {...others}>
					&minus;
				</Body>
			</IfElse>
			{symbol ? (
				<Body className="inline" {...others}>
					<>
						{renderSymbol ? renderSymbol(symbol.html) : symbol.html}
						{children}
					</>
					{/* <>
						{children} &nbsp;{shortCode}
					</> */}
				</Body>
			) : (
				<Body className="inline" {...others}>
					{!afterText ? (
						<>
							{shortCode}
							{children}
						</>
					) : (
						<>
							{children}
							{shortCode}
						</>
					)}
				</Body>
			)}
		</>
	)
}
export default React.memo(CurrencySymbol)
