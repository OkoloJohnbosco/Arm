import { ENDPOINTS, LOCAL_STORAGE_ACCOUNT_AUTH } from 'constant'
import { setBroadcastStorage } from 'lib/broadcastStorage'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { ARMEngageResponseType } from 'lib/types'
import { LoginAuthType, PassportAuthType } from '../types'

export type SubsidiaryAuthPayload = {
	identifier: string
	password: string
	subsidiary_id: string
}

export default () => {
	return useQueryMutation<ARMEngageResponseType<PassportAuthType>, SubsidiaryAuthPayload>({
		endpoint: ENDPOINTS.API_ADD_ACCOUNT,
		method: 'POST',
		onSuccess: ({ data }) => {
			setBroadcastStorage(LOCAL_STORAGE_ACCOUNT_AUTH, JSON.stringify(data.data), 'localStorage')
			//Update get subsidiary list
		},
	})
}
