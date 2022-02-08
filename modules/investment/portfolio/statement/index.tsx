import { Box, Stack } from '@chakra-ui/react'
import BackWrapper from 'components/navigation/BackWrapper'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'
import { hexToRGBA3 } from 'lib/theme/color'
import { ProductInvestmentType } from 'modules/account/types'
import React, { useState } from 'react'
import Embassey from './embassey/Embassey'
import Print from './print/Print'

const Option = ({ title, subtitle }: any) => (
	<Box
		role="button"
		bg="#E6E2DD"
		boxShadow={`0 0 .9pt .9pt ${hexToRGBA3('claret', 500, 0.3)}`}
		outlineOffset="1px"
		px="3"
		py="2"
		rounded="sm"
		border={`1px solid ${hexToRGBA3('black', 500, 0.6)}`}
	>
		<Caption alt>{title}</Caption>
		<Small>{subtitle}</Small>
	</Box>
)

type PrintStatementOptionType = 'embassey' | 'print' | 'none'
const statementComponent = {
	embassey: Embassey,
	print: Print,
}

export type PrintInvestmentProps = {
	investment?: ProductInvestmentType
}

const PrintStatement = (props: PrintInvestmentProps) => {
	const [printStatementOption, setPrintStatementOption] = useState<PrintStatementOptionType>('none')
	const StatementComponent = statementComponent[printStatementOption]
	console.log(StatementComponent, printStatementOption)
	return (
		<Stack spacing="16">
			{printStatementOption == 'none' && <SubHeading>Select Statement Choice</SubHeading>}
			{printStatementOption == 'none' ? (
				<Stack spacing="4">
					<Box onClick={() => setPrintStatementOption('print')}>
						<Option title="Print Statement" subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
					</Box>
					<Box onClick={() => setPrintStatementOption('embassey')}>
						<Option title="Send to embassy" subtitle='Lorem ipsum dolor, sit amet consectetur adipisicing elit."' />
					</Box>
				</Stack>
			) : (
				<BackWrapper onClick={() => setPrintStatementOption('none')}>
					<StatementComponent {...props} />
				</BackWrapper>
			)}
		</Stack>
	)
}

export default PrintStatement
