import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { SubsidiaryType } from '../account/types'

export const useSubsidiaries = () => {
	return useQueryAction<{ product_subsidiaries: SubsidiaryType[] }>({
		method: 'GET',
		endpoint: ENDPOINTS.API_SUBSIDIARY_CATEGORIES,
		queryKey: ENDPOINTS.API_SUBSIDIARY_CATEGORIES,
	})
}

export const useUsersSubsidiaries = () => {
	return useQueryAction<{ customer_subsidiaries: SubsidiaryType[] }>({
		//	method: 'GET',
		endpoint: ENDPOINTS.API_CUSTOMER_SUBSIDIARY,
		queryKey: ENDPOINTS.API_CUSTOMER_SUBSIDIARY,
	})
}
