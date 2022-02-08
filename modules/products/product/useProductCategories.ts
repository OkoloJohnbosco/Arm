import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import useQueryMutation from 'lib/hooks/useQueryMutation'

export type ProductCategory = {
	description: string
	id: number
	name: string
}

const useProductCategories = () => {
	return useQueryAction<{ product_catgories: ProductCategory[] }>({
		method: 'GET',
		endpoint: ENDPOINTS.API_PRODUCT_CATEGORIES,
		queryKey: ENDPOINTS.API_PRODUCT_CATEGORIES,
	})
}

export default useProductCategories
