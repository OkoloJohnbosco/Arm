import { FundStepType, FundStepNameType } from './type'

export const fundSteps: FundStepType[] = [
	{
		step: FundStepNameType.Initiate,
		title: 'Select Investment Solution',
		description: 'Pick an Investment Solution you want to Fund',
		priority: 1,
	},
	{
		step: FundStepNameType.Payment,
		priority: 2,
		title: 'Payment',
		description: 'How do you want to Pay',
	},
	{
		step: FundStepNameType.Complete,
		priority: 2,
		title: 'Payment Completed',
		description: 'Hooray, Payment Completed',
	},
	{
		step: FundStepNameType.Auth,
		priority: 2,
		title: 'Authorize Payment',
		description: 'Enter One time Password sent to you',
	},
]
