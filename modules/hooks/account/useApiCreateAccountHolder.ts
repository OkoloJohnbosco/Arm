import { ENDPOINTS } from 'constant'
import useQueryMutation from 'lib/hooks/useQueryMutation'

type CreateAccountHolderType = {
	first_name: string
	last_name: string
	other_names: string
	gender: string
	marital_status: string
	date_of_birth: string
	place_of_birth: string
	title: string
	relationship: string
}
export default (parentProfileId: string) => {
	return useQueryMutation<any, CreateAccountHolderType>({
		method: 'POST',
		endpoint: ENDPOINTS.API_CREATE_ACCOUNT_HOLDER(parentProfileId),
	})
}
