export enum FundStepNameType {
	Initiate = 'Initiate',
	Amount = 'Amount',
	Auth = 'Auth',
	Payment = 'Payment',
	Complete = 'Complete',
}

export type FundStepType = {
	title: string
	description: string
	step: FundStepNameType
	priority: number
}
