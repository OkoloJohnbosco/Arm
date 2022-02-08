import { CirleProgressType } from 'components/progress/type'
import { InvestmentSubscriptionStage } from '../type'

const MONTH_INVESTMENT = { value: 'YEAR', label: 'Year' }
const YEAR_INVESTMENT = { value: 'MONTH', label: 'Month' }
const DAY_INVESTMENT = { value: 'DAY', label: 'Day' }

export const investmentFrequencyOption = [DAY_INVESTMENT, YEAR_INVESTMENT, MONTH_INVESTMENT]
export const investmentDurationOption = (frequency?: string | number) =>
	new Array(360).fill(0).map((v, i) => ({ value: i + 1, label: `${i + 1} ${frequency}${i > 1 ? 's' : ''}`, option: i }))

export const paymentOptionConfig = [
	{
		value: 'Bank',
		label: 'Bank Transfer',
	},
	{ value: 'Card', label: 'Credit Cardt' },
]

export const genderOptionType = [
	{
		value: 'Male',
		label: 'Male',
	},
	{ value: 'Female', label: 'Female' },
]

export const religionOptionType = [
	{
		value: 'Male',
		label: 'Male',
	},
	{ value: 'Female', label: 'Female' },
]

export const maritalStatusOptionType = [
	{
		value: 'Married',
		label: 'Single',
	},
	{ value: 'Female', label: 'Female' },
]

export const progressSteps: CirleProgressType[] = [
	{ progressDescription: 'More investments details', progressTitle: 'Investment Mix', id: InvestmentSubscriptionStage.Mix },
	{ progressDescription: 'Almost there, few more details', progressTitle: 'KYC Uploads', id: InvestmentSubscriptionStage.Kyc },
	{ progressDescription: 'Let’s pay for those investments', progressTitle: 'Payments', id: InvestmentSubscriptionStage.Payment },
	//  { progressDescription: 'Completed', progressTitle: 'DONE!!', id: 4 },
]
