import axios from 'axios'
import { ENDPOINTS } from 'constant'
import { ARMEngageResponseType, GenericCrudProps, SecureRequestProps } from 'lib/types'
import { getLogin, getLoginToken } from 'modules/account/helper'

export const secureRequest = ({
	url,
	method = 'get',
	body = undefined,
	isARMEngageAPI,
	includeBaseApiHeaders: useBaseApiHeaders,
	headers: requestHeader,
}: SecureRequestProps) => {
	const engageHeader = {
		Authorization: getLogin()?.login.token.auth_token,
		engage_id: getLogin()?.login.user_account.engage_id,
	}
	const headers = isARMEngageAPI || useBaseApiHeaders ? engageHeader : requestHeader

	method = method.toLocaleLowerCase()
	if (method === 'get') {
		//dont include body in GET request request will fail
		return axios.get(url, {
			params: {
				...body,
			},
			headers,
		})
	}

	return axios[method](url, body, { headers })
}

export const crudAction = async function (payload: GenericCrudProps) {
	//@ts-ignore
	let response: ARMEngageResponseType
	const {
		endpoint,
		method,
		body,
		data,
		// headers,
		// namespace = 'UNDEFINED_LOADING',
		queryKey: namespace,
		then: onResponse,
		onError: onResponseError,
		eventMessage,
		isARMEngageAPI = true,
		setIsLoading: setLoading,
		includeBaseApiHeaders: useBaseApiHeaders = true,
	} = payload

	setLoading && setLoading(true)
	if (eventMessage?.flight) {
		// const storeUpdate = setEventMessageAction({ eventData: { ...eventMessage?.flight, variant: 'loading' } })
	}

	try {
		const url = isARMEngageAPI ? ENDPOINTS.API_BASE_URL + endpoint : endpoint
		response = await secureRequest({ url, method, body })
		if (isARMEngageAPI) {
			if (typeof response === 'object' && 'data' in response) {
				onResponse ? onResponse(response) : undefined
			} else {
				throw new Error('Invalid Response format for ARMEngage API')
			}
		} else {
			onResponse?.(response)
		}

		const successEvent = typeof eventMessage?.success === 'function' ? eventMessage.success(response) : eventMessage?.success
		if (successEvent) {
			// setEventMessageAction({ eventData: { ...successEvent, variant: 'update' } })
		}
	} catch (error) {
		response = error as ARMEngageResponseType<any>
		//TODOD error is swallled here
		// const errorEvent = typeof eventMessage?.error === 'function' ? eventMessage.error(error?.response) : eventMessage?.error
		// if (errorEvent) {
		// const errorUpdate = genericStoreUpdate(
		// 	eventMessageActionBuilder({
		// 		eventStore: {} as any,
		// 		eventData: { ...errorEvent, variant: 'update' },
		// 		description: 'SET_MESSAGE',
		// 	})
		// )
	} finally {
		// onResponseError && onResponseError(error.response)
		/** */
	}
	const afterEvent = typeof eventMessage?.after === 'function' ? eventMessage.after(response) : eventMessage?.after
	if (afterEvent) {
		// const afterEventUpdate = setEventMessageAction({ eventData: { ...afterEvent, variant: 'update' } })
	}
	setLoading && setLoading(false)
	return response
}
