import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { ProductType } from 'modules/account/types'
import { KYCTierType } from 'modules/kyc/type'

export enum AccountTypeCode {
	Individual = 'INDIVIDUAL',
	Corporate = 'CORPORATE',
	Joint = 'JOINT',
	Minor = 'MINOR',
}

export type AccountType = {
	id: number
	name: string
	code: AccountTypeCode
}

export default () => {
	return useQueryAction<AccountType[]>({
		endpoint: ENDPOINTS.API_LIST_ACCOUNT_TYPE,
	})
}
