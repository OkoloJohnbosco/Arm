import { ENDPOINTS, LOCAL_STORAGE_ACCOUNT_AUTH } from 'constant'
import { setBroadcastStorage } from 'lib/broadcastStorage'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { ARMEngageResponseType } from 'lib/types'
// import { setBroadcastStorage } from 'utils/helpers'
import { LoginAuthType, LoginAuthPropType } from '../types'

export default () => {
	return useQueryMutation<ARMEngageResponseType<LoginAuthType>, LoginAuthPropType>({
		endpoint: ENDPOINTS.API_AUTH_LOGIN,
		method: 'POST',
		onSuccess: ({ data }: ARMEngageResponseType<LoginAuthType>) => {
			setBroadcastStorage(LOCAL_STORAGE_ACCOUNT_AUTH, JSON.stringify(data.data), 'localStorage')
			// console.log(JSON.stringify(data.data), 'login data')
		},
	})
}
