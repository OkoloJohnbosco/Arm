import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { ProductType } from 'modules/account/types'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'

export default () => {
	return useQueryAction<{ products: Array<ProductType> }>({
		eventMessage: {
			success: setSuccessMessage(),
			error: setErrorMessage(),
		},
		endpoint: ENDPOINTS.API_GET_PRODUCT_CATALOGUE,
		queryKey: NAMESPACE.API_GET_PRODUCTS,
	})
}
