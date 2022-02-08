import { RiskAssessmentStage } from 'modules/investment/riskProfile/assesment/type'
import { TransactionType } from 'modules/products/subscription/type'

export const LOCAL_STORAGE_TOKEN_KEY = '__armengage__token__key__location'
export const LOCAL_STORAGE_AUTH_PROFILE = '__armengage__token__key__profile'
export const LOCAL_STORAGE_ACCOUNT_AUTH = '__armengage_account_auth_key_location'
export const SESSION_STORAGE_SIGNUP_DATA = '__ARMENGAGE_SIGNUP_DATA_LOCATION_'
export const SESSION_STORAGE_SIGNUP_SUCCESS_DATA = '__ARMENGAGE_SIGNUP_SUCCESS_DATA_LOCATION_'
export const SESSION_STORAGE_OTP_MONITOR = '__ARMENGAGE_OTP_MONITOR_LOCATION_'
export const SESSION_STORAGE_THEME_NAME = '__ARMENGAGE_SESSION_STORAGE_THEME_NAME_LOCATION_'
export const SESSION_STORAGE_MIX_CART = '__ARMENGAGE_MIX_PRODUCT_CART_LOCATION_'
export const BROADCAST_PAYMENT_REDIRECT = 'BROADCAST_PAYMENT_REDIRECT'
export const BROADCAST_KYC_PROMPT = 'BROADCAST_KYC_PROMPT'

export const ENDPOINTS = {
	// API_BASE_URL: process.env.BASE_URL,
	// API_BASE_URL: 'https://arm.rhicstech.com',
	// API_BASE_URL: 'https://robo-engage.herokuapp.com',
	// API_BASE_URL: 'https://robo-engage2.herokuapp.com',
	// API_BASE_URL: 'http://64.227.28.125',
	API_BASE_URL: 'https://api.rhics.uk',

	API_GET_RISK_SCORE: (engage_id?: string) => `/api/v1/risk_profile?engage_id=${engage_id}`,
	API_GET_RECOMMEDED_PRODUCT: `/api/v1/product/recommendations`,
	API_GET_PRODUCT_CATALOGUE: `/api/v1/product/all`,
	API_ANSWER_RISK_QUESTION: '/api/v1/risk_profile/answer',
	API_POST_BVN: '/api/v1/bvn/confirm',
	API_VALIDATE_BVN: '/api/v1/bvn/validate',
	API_GET_RISK_QUESTION: (stage: RiskAssessmentStage) => `/api/v1/risk_profile/questions/${stage}`,
	API_POST_INVESTMENT_MIX: `/api/v1/investment/products/mix`,
	API_INITIATE_SIGNUP: '/api/v1/onboarding/initiate',
	API_SUBSIDIARY_CATEGORIES: `/api/v1/subsidairy/all`,
	API_PRODUCT_CATEGORIES: `/api/v1/product_category/all`,
	API_AUTH_LOGIN: '/auth/login',
	API_CUSTOMER_SUBSIDIARY: `/api/v1/subsidairy/customer`,
	API_RESET_PASSWORD: '/api/v1/user/password/reset',
	API_REQUEST_EMAIL_OTP: '/api/v1/user/confirm_email',
	API_REQUEST_PHONE_OTP: '/api/v1/user/confirm_phone',
	API_REQUEST_EMAIL_OTP_VALIDATE: '/api/v1/user/validate_email',
	API_REQUEST_PHONE_OTP_VALIDATE: '/api/v1/user/validate_phone',
	API_REQUEST_CONFIRM_OTP: '/api/v1/user/password_reset/confirm',
	API_ADD_ACCOUNT: '/auth/subsidiary',
	API_USERS_PRODUCTS: `/api/v1/product/customer_products`,
	API_INVESTMENT_SUBSCRIPTION: `/api/v1/investment/subscription`,
	API_CATEGORY_PRODUCTS: (categoryId: any) => `/api/v1/product/category/${categoryId}`,
	API_INVESTMENT_SUBSCRIPTION_PAYMENT_INITIATE: `/api/v1/investment/subscription/payment/initiate`,
	API_LIST_INVESTMENT_SUBSCRIPTION: (mixId?: string | number) => `/api/v1/investment/${mixId || ''}`,
	API_VERIFY_INVESTMENT_PAYMENT: '/api/v1/investment/subscription/payment/verify',
	API_INVESTMENT_BALANCE: '/api/v1/investment/total_balance',
	API_LIST_BANKS: '/api/v1/banks',
	API_GET_KYC: '/api/v1/kyc/tier',
	API_LIST_MARITAL_STATUS: '/api/v1/marital_statuses',
	API_POST_KYC: '/api/v1/kyc',
	API_POST_KYC_File: '/api/v1/kyc/upload',
	API_REDEMPTION: '/api/v1/investment/redemption',
	API_TRANSACTION_REASONS: (type: TransactionType) => `/api/v1/transaction_reasons?transaction_type=${type}`,
	API_AUTH_OTP: () => `/api/v1/send_otp`,
	API_LIST_INVESTMENT_TRANSACTION_HISTORY: (id: string, query?: string) => `/api/v1/investment/${id}/transactions${query ? `?${query}` : ''}`,
	API_FUND_INVESTMENT: `/api/v1/investment/add_fund`,
	API_LIST_ACCOUNT_TYPE: `/api/v1/account_types`,
	API_CREATE_ACCOUNT_HOLDER: (parentId: string) => `/api/v1/account/profile/${parentId}/users`,
	API_LIST_RELATIONSHIP: `/api/v1/relationships`,
	API_LIST_GENDER: `/api/v1/gender`,
	API_LIST_RELIGION: `/api/v1/religions`,
	API_LIST_USER_TITLE: `/api/v1/titles`,
	API_GET_INVESTMENT_STATEMENT: `/api/v1/investment/account_statement`,
	API_LIST_COUNTRIES: `/api/v1/location/countries`,
	API_LIST_STATES: `/api/v1/location/states`,
	API_LIST_CITIES: `/api/v1/location/cities`,
	API_GET_INVESTMENT: (investmentId?: string | number) => `/api/v1/investment/${investmentId}`,
	API_SEND_TO_EMBASSEY: `/api/v1/investment/embassy_letter`,
	API_GET_SELF_PAYMENT: `/api/v1/investment/self_service_payment`,
	API_USERS_ACTTIVITIES: '/api/v1/activities',
}

export const PATHS = {
	// left as example
	FOREX: (path: any) => (path ? `/account/forex/${path}` : `/account/forex`),
}

export enum SERVER_CODES {
	UNAUTHORIZED = 'E08',
	TOKEN_EXPIRED = 'E15',
}

export const NAMESPACE = {
	API_GET_PRODUCTS: 'API_GET_PRODUCTS',
	RECOMMEDED_PRODUCT: 'RECOMMEDED_PRODUCT',
	GET_RISK_SCORE: 'GET_RISK_SCORE',
	GET_RISK_QUESTION: 'GET_RISK_QUESTION',
	INITIATE_SIGNUP: 'INITIATE_SIGNUP',
	REQUEST_OTP: 'REQUEST_OTP',
	VALIDATE_OTP: 'VALIDATE_OTP',
}

export const PAGES = {
	DASHBOARD_HOME: '/dashboard',
	DASHBOARD: {
		HOME: '/dashboard',
		RISK_ASSESSMENT: '/dashboard/assesment',
		PRODUCT_CATALOGUE: '/dashboard/catalogue',
		MANAGE_SUBSIDIARY: '/dashboard/subsidiary',
		PORTFOLIO: '/dashboard/portfolio',
		INVESTMENT_PORTFOLIO: (id: string | number) => `/dashboard/portfolio/${id}`,
		SETTINGS: '/dashboard/settings',
	},
	USER_PRODUCTS: '/account/products',
	RESET_PASSWORD: '/auth/reset-password',
	INVESTMENT_SUBSCRIPTION: '/account/product/subscribe',
	ACCOUNT_LOGIN: '/auth/login',
	ACCOUNT_SIGNUP: '/auth/signup',
	ACCOUNT_MANAGE_SUBSIDIARIES: '/account/subsidiaries',
	ACCOUNT_RISK_PROFILE: '/account/product/profile',
	ACCOUNT_RISK_ASSESSMENT: '/account/product/assessment',
	ACCOUNT_RISK_ASSESSMENT_RESULT: '/account/product/assessment/result',
	ACCOUNT_RISK_ASSESSMENT_START_PROMPT: '/account/product/start',
	PRODUCT_RECOMMENDATION: '/account/product/recommendation',
	PRODUCT_RECOMMENDATION_CATALOGUE: '/account/product/catalogue',
}

export type PlatFormFeatureType = 'Onboarding' | 'BvnVerification' | 'ResetPassword'

export const CLOAUDINARY_IMAGE_PATH = (path) =>
	`https://res.cloudinary.com/rhics-tech/image/upload/f_auto,c_limit,w_1080,q_auto/v1610980765/armengage/web${path}`
export const CLOAUDINARY_VIDEO_PATH = (path) => `https://res.cloudinary.com/rhics-tech/video/upload/v1610921135/armengage/web/video${path}`

export const getEngageResourseUrl = (apiUrl: string) => `${ENDPOINTS.API_BASE_URL}${apiUrl}`
