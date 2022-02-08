// import { ReduxPropsType } from 'reduxx/types'
// import { PlatFormFeatureType, ARMEngageResponseType, NAMESPACE } from 'types'
import { ENDPOINTS } from 'constant'
import { ARMEngageResponseType, MainActionType } from 'lib/types'
import { PlatFormFeatureType, NAMESPACE } from 'constant'
import { setErrorMessage, setSuccessMessage } from 'utils/helpers'

type BaseType = {
	mainAction: MainActionType
	platformFeature: PlatFormFeatureType
	onResponse: (response: ARMEngageResponseType) => void
}

interface SendOTPPayloadProps extends BaseType {
	sendTo: { emailAddress?: string; phoneNumber?: string }
}

export const apiActionSendOTP = (payload: SendOTPPayloadProps) => {
	const { platformFeature, sendTo, mainAction, onResponse } = payload
	const endpoint = sendTo.emailAddress ? ENDPOINTS.API_REQUEST_EMAIL_OTP : ENDPOINTS.API_REQUEST_PHONE_OTP

	mainAction.crudAction({
		endpoint,
		method: 'POST',
		queryKey: NAMESPACE.REQUEST_OTP,
		body: { platformFeature, ...sendTo },
		eventMessage: {
			error: setErrorMessage(),
			success: setSuccessMessage(),
		},
		then: (response: ARMEngageResponseType) => {
			onResponse(response)
		},
	})
}
