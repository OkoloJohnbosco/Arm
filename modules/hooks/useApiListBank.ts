import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { ProductType } from 'modules/account/types'

export type BankType = {
	bank_name: string
	bank_code: string
}

export default () => {
	return useQueryAction<{ banks: BankType[] }>({
		method: 'GET',
		endpoint: ENDPOINTS.API_LIST_BANKS,
	})
}
