import { OptionType } from 'components/input/select'
import { CurrencyType } from 'components/types/type'
import React from 'react'
import { RiskProfileValue } from '../hooks/useRiskProfile'
import { InitiateInvestmentType } from '../products/subscription/type'

// Add Object Serialization and Deserialisation
export enum SignupField {
	FirstName = 'first_name',
	LastName = 'last_name',
	Password = 'password',
	Email = 'email',
	PhoneNumber = 'phone_number',
	DateOfBirth = 'date_of_birth',
	UserType = 'user_type',
}

export type SignupData = {
	[SignupField.FirstName]: string
	[SignupField.LastName]: string
	[SignupField.Email]: string
	[SignupField.PhoneNumber]: string
	[SignupField.Password]: string
	[SignupField.DateOfBirth]: string
	[SignupField.UserType]: string
}

export enum LoginField {
	UserName = 'username',
	Password = 'password',
}

export type LoginAuthPropType = {
	[LoginField.UserName]?: string
	[LoginField.Password]?: string
}

type OnboardingStageType = {
	order: number
	is_required: boolean
	name: string
	is_completed: boolean
	is_completed_stage: boolean
	is_active: boolean
}

enum OnboardingStatusEnum {
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
}
export type OnboardingType = {
	status: OnboardingStatusEnum
	stages: Array<OnboardingStageType>
}

type AuthenticationType = {
	user_account: {
		username: string
		is_onboarding_complete: boolean
		email: string
		is_phone_number_confirmed: boolean
		phone_number: string
		is_email_confirmed: boolean
		date_created: string
		locked_out_count: number
		is_locked_out: boolean
		engage_id: string
		user_type: 'existing' | 'new'

		user: {
			date_of_birth: string
			gender: null
			first_name: string
			last_name: string
			middle_name: string
			marital_status?: string
			place_of_birth?: string
			title?: string
			arm_membership_id?: string
			foreign_account_name?: string
			foreign_account_number?: string
		}
	}
	is_first_time_login: boolean
	onboarding: OnboardingType
	bvn: {
		is_verified: boolean
		bvn?: string
	}
	token: {
		auth_token: string
		expires_in: number
		refresh_token: string
		prospect_code?: string
	}
}

export type LoginAuthType = {
	login: AuthenticationType
}
export type PassportAuthType = {
	login: AuthenticationType & { customer_businesses: SubsidiaryType[] }
}

export type CustomerBusinessDetailsType = {
	image_url: null
	value: string
	id: number
	icon_url?: string
	color?: string
	name: string
	description: string
	total_balance: number
	book_balance: number
	pending_subscription: number
}

export interface CustomerBusinessType extends CustomerBusinessDetailsType {
	// image_url: null,
	// value: string,
	// id: number,
	// icon_url?: string,
	// color?: string,
	// name: string,
	// description: string,
	// total_balance: number,
	// book_balance: number,
	// pending_subscription: number
	products: Array<ProductInvestmentType>
}

export interface ProductInvestmentType extends ProductType {
	summary: {
		product_name: string
		account_name: string
		currency: CurrencyType
		account_status: string
		purchase_units: number
		redemption_units: number
		product_code: string
		current_price: number
		units: number
		market_value: number
		current_balance: number
		accrued_interest: number
		pending_transaction: number
		account_executive: string
		account_number: string
		account_tier: string
	}
}

export type ProductType = {
	financial_life_cycle: string
	effective_yield: string
	registrars: string
	asset_allocation: string
	subsidiary: SubsidiaryType
	currency: CurrencyType
	fund_size: string
	product_options: []
	description: string
	code: string
	management_fee: number
	link: string
	minimum_investment: number
	offer_price: string
	status: null
	requirements: string
	incentive_fee: string
	name: string
	date_created: string
	arm_product_id: string
	risk_level: {
		description: string
		name: RiskProfileValue //'MODERATE' | 'LOW' | 'HIGH'
		id: number
	}
	trustee: string
	category: {
		image_url?: string
		icon_url?: string
		color?: string
		description: string
		name: string
		id: number
	}
	image_url?: string
	id: number
	benchmark: string
	bid_price: string
}

export type InvestMentMixType = {
	product: ProductType | null
	amountInvested?: number
	duration?: OptionType
	isRepeatable?: boolean
	plan?: any
}

export type InvestmentMixContextType = {
	mixedProducts?: InvestMentMixType[]
	setCurrentMixProduct?: (mix: InvestMentMixType) => void
	initiateInvestmentData?: InitiateInvestmentType
}

export const InvestmentMixContext = React.createContext<InvestmentMixContextType>({} as any)

export type SubsidiaryType = {
	id: number
	value: string
	business_id: number | null
	description: string
	name: string
	image_url?: string
	icon_url?: string
	is_authenticated: boolean
}
