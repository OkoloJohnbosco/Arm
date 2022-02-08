import React, { useEffect, useState } from 'react'
import Text from 'components/input/text'
import { Flex, Box } from '@chakra-ui/layout'

type DateRangePropType = {
	onChange: any
	value?: { from?: string; to?: string }
}

const DateRange = (props: DateRangePropType) => {
	const [from, setFrom] = useState<string>(props.value?.from || new Date().toString())
	const [to, setTo] = useState<string>(props.value?.to || new Date().toString())
	const [error, setError] = useState('')

	useEffect(() => {
		if (from > to) {
			setError('From cannot be less than To')
			setFrom(to)
		}
		props.onChange({ from, to })
		//if(error)
		//setError('')
	}, [from, to])
	return (
		<Flex flexWrap="wrap">
			<Box flexBasis="24">
				<Text
					error={error}
					value={from}
					title="From"
					type="date"
					onChange={({ target }) => {
						setFrom(target.value)
					}}
				/>
			</Box>
			<Box w="4px" />
			<Box flexBasis="24">
				<Text
					value={to}
					title="To"
					type="date"
					onChange={({ target }) => {
						setTo(target.value)
					}}
				/>
			</Box>
		</Flex>
	)
}

export default DateRange
