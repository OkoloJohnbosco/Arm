import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { ProductType } from 'modules/account/types'

const useCategoriesProducts = (categoryId?: any) => {
	return useQueryAction<{ products: ProductType[] }>({
		method: 'GET',
		endpoint: ENDPOINTS.API_CATEGORY_PRODUCTS(categoryId),
		queryKey: [ENDPOINTS.API_CATEGORY_PRODUCTS, categoryId],
		enabled: !!categoryId && categoryId > 0,
	})
}

export default useCategoriesProducts
