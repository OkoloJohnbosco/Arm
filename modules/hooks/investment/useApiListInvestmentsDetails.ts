import { ENDPOINTS, NAMESPACE } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { CustomerBusinessType, ProductType } from 'modules/account/types'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'

export default () => {
	return useQueryAction<{ customer_businesses: CustomerBusinessType[] }>({
		endpoint: ENDPOINTS.API_USERS_PRODUCTS,
		queryKey: ENDPOINTS.API_USERS_PRODUCTS,
	})
}
