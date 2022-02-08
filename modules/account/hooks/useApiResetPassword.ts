import { ENDPOINTS, LOCAL_STORAGE_ACCOUNT_AUTH } from 'constant'
import { setBroadcastStorage } from 'lib/broadcastStorage'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { ARMEngageResponseType } from 'lib/types'
// import { setBroadcastStorage } from 'utils/helpers'
import { LoginAuthType, LoginAuthPropType } from '../types'

type ResetPasswordPayload = {
	otp: string
	username: string
	new_password: string
}
export default () => {
	return useQueryMutation<ARMEngageResponseType<LoginAuthType>, ResetPasswordPayload>({
		endpoint: ENDPOINTS.API_RESET_PASSWORD,
		method: 'POST',
	})
}
