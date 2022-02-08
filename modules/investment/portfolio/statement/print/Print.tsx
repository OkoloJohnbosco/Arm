import { Box, HStack, RadioGroup, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import DateRange from 'components/input/date-range'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'
import useUser from 'modules/account/hooks/useUser'
import useApiGetInvestmentStatement from 'modules/hooks/investment/useApiGetInvestmentStatement'
import { TransactionType } from 'modules/products/subscription/type'
import React, { useState } from 'react'
import { dateToString } from 'utils/helpers'
import { PrintInvestmentProps } from '..'

const duration = [
	{
		name: 'Last Week',
		duration: 7,
	},
	{
		name: 'Last Month',
		duration: 32,
	},
	{
		name: 'Last Quarter',
		duration: 30 * 4,
	},
	{
		name: 'I will Choose',
		duration: 0,
	},
]

const durationOption = duration.map((d) => {
	const date = new Date()
	date.setDate(date.getDate() - d.duration)
	return { ...d, date }
})

const Print = ({ investment }: PrintInvestmentProps) => {
	const [selectedDuration, setSelectedDuration] = useState<any>(7)
	const [durationDate, setDurationDate] = useState({ from: durationOption[0].date, to: new Date() })
	const [isGenerateStatement, setIsGenerateStatement] = useState<number>(0)
	const [searchDate, setSearchDate] = useState({ start_date: durationOption[0].date.toISOString(), end_date: new Date().toISOString() })

	const createFileObjectUrl = (base64Data: string, then) => {
		const file = base64Data.substr(base64Data.indexOf(',') + 1)
		setTimeout(() => {
			then()
		})
		function base64ToArrayBuffer(base64) {
			const binaryString = window.atob(base64)
			const binaryLen = binaryString.length
			const bytes = new Uint8Array(binaryLen)
			for (let i = 0; i < binaryLen; i++) {
				const ascii = binaryString.charCodeAt(i)
				bytes[i] = ascii
			}
			// setTimeout(()=>{
			// 	statementDownloadRef.current.click()
			// })
			return bytes
		}
		if (file) {
			const blob = new Blob([base64ToArrayBuffer(file)], { type: 'octet/stream' })
			return window.URL.createObjectURL(blob)
		}
		return undefined
	}

	const username = useUser()?.login.user_account.username

	const investmentStatement = useApiGetInvestmentStatement({
		//enabled: !!investment && isGenerateStatement,
		investment_id: investment?.id,
		transaction_type: TransactionType.Redemption,
		...searchDate,
		// state_date: durationDate.from.toUTCString(),
		// end_date: durationDate.to.toUTCString(),
	})

	React.useEffect(() => {
		if (isGenerateStatement !== 1) {
			investmentStatement.remove()
		}
		console.log(durationDate)
		setSearchDate({ start_date: durationDate.from.toISOString(), end_date: durationDate.to.toISOString() })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [durationDate, selectedDuration])

	const onChangeHandler = ({ to, from }) => {
		setDurationDate({ to: new Date(to), from: new Date(from) })
	}

	React.useEffect(() => {
		investmentStatement.refetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchDate])
	return (
		<Stack spacing="10">
			<SubHeading>Choose Statement Range</SubHeading>
			<RadioGroup defaultValue="1">
				<Stack spacing={4} role="radiogroup" aria-labelledby="gdesc1">
					{durationOption.map((d, i) => {
						const isChecked = selectedDuration == d.duration
						return (
							<HStack
								cursor="pointer"
								onClick={() => {
									setDurationDate({ from: d.date, to: new Date() })
									setSelectedDuration(d.duration)
								}}
								tabIndex={-1}
								key={i}
								align="baseline"
								spacing="4"
								role="radio"
								aria-checked={isChecked ? 'true' : 'false'}
							>
								<Box boxSize="5" rounded="full" bg={isChecked ? 'claret.500' : 'neutral.50'} />

								<Box>
									<Caption position="relative" top="-1" alt alignSelf="self-end">
										{d.name}
									</Caption>
									{selectedDuration === 0 && d.duration == 0 ? (
										<DateRange onChange={onChangeHandler} />
									) : (
										<Small alt color="neutral.500">
											{dateToString(d.date.toString())} to Today
										</Small>
									)}
								</Box>
							</HStack>
						)
					})}
				</Stack>
			</RadioGroup>
			<Button
				loadingText="Generating statement ..."
				type="submit"
				looks="accent"
				responsive
				isLoading={investmentStatement.isLoading || investmentStatement.isFetching}
				onClick={() => {
					//	setIsGenerateStatement(true)
					// setSearchDate({ start_date: durationDate.from.toISOString(), end_date: durationDate.to.toISOString() })
					//	investmentStatement.refetch()
				}}
			>
				{investmentStatement.value?.account_statement.document_binary ? (
					<Box
						//ref={statementDownloadRef}
						as="a"
						download={`${username}_${investment?.summary.product_name.split(' ').join('_')}_statement.pdf`}
						href={createFileObjectUrl(investmentStatement.value?.account_statement.document_binary, () =>
							setIsGenerateStatement((prevS) => prevS + 1)
						)}
					>
						Download Statement
					</Box>
				) : (
					'Generate Statement'
				)}
			</Button>
		</Stack>
	)
}
export default Print
