import { ENDPOINTS } from 'constant'
import { secureRequest } from 'lib/actions'
import { ARMEngageResponseType, EventDataType, UseQueryCrudType, UseQueryCrudType2 } from 'lib/types'
import { useEffect } from 'react'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { mimicResponse, setErrorMessage } from 'utils/helpers'
import useMainAction from './useMainAction'

export const getQueryAction = (payload: UseQueryCrudType2): UseQueryCrudType => {
	const { endpoint, method, body, headers, isARMEngageAPI = true, includeBaseApiHeaders, eventMessage } = payload

	const url = isARMEngageAPI ? ENDPOINTS.API_BASE_URL + endpoint : endpoint

	return {
		//@ts-ignore
		queryFn: () => {
			return secureRequest({
				url,
				method,
				body,
				isARMEngageAPI,
				includeBaseApiHeaders,
				//	headers: { withCredentials: true, ...headers },
				headers,
			})
		},

		isARMEngageAPI,
		...payload,
	}
}

export default <V = any>(data: UseQueryCrudType2): UseQueryResult<ARMEngageResponseType<V>> & { value?: V } => {
	const { setNotification, pushServerError } = useMainAction()
	const { queryFn, eventMessage, queryKey: namespace, endpoint, initialData, then, select, isARMEngageAPI, ...others } = getQueryAction(data)
	const queryClient = useQueryClient()

	useEffect(() => {
		// if (eventMessage?.flight && isARMEngageAPI) {
		// 	setNotification(eventMessage?.flight)
		// }
	}, [eventMessage?.flight?.message])

	const queryResult = useQuery<ARMEngageResponseType, ARMEngageResponseType>({
		queryFn,

		queryKey: namespace || endpoint,
		onSuccess: (response) => {
			then?.(response, queryClient)

			if (!queryResult.isPreviousData && !queryResult.isPlaceholderData && eventMessage?.success && isARMEngageAPI) {
				typeof eventMessage?.success === 'function' ? setNotification(eventMessage?.success(response)) : setNotification(eventMessage?.success)
			}
		},
		onError: (response) => {
			//@ts-ignore
			///	response.response?.data.errors && pushServerError(response.response?.data.errors)
			if (response.response?.data.errors) {
				pushServerError({
					//@ts-ignore
					errors: response.response?.data.errors,
					//@ts-ignore
					message: response.response?.data?.response_message,
					//@ts-ignore
					responseCode: response.response?.data?.response_code,
				})
			} else {
				pushServerError({
					//@ts-ignore
					errors: [{ message: 'Debug: Unknown server error occured' }],
					//@ts-ignore
					message: 'Server Error',
				})
			}
			//	stopLoading()
			// if (eventMessage?.error && isARMEngageAPI) {
			// 	if (typeof eventMessage?.error === 'function') {
			// 		const errorData = eventMessage?.error(response)
			// 		console.log(response)

			// 		pushServerError(errorData)
			// 	} else {
			// 		console.log(response)
			// 		pushServerError(eventMessage?.error)
			// 	}
			// }
		},
		onSettled: (response) => {
			if (eventMessage?.after && isARMEngageAPI) {
				//@ts-ignore
				typeof eventMessage?.after === 'function' ? setNotification(eventMessage.after(response)) : setNotification(eventMessage?.after)
			}
		},
		retry: false,
		initialData: isARMEngageAPI ? (initialData ? mimicResponse(initialData) : undefined) : initialData,
		select,
		refetchOnWindowFocus: false,
		keepPreviousData: true,
		...others,
	})

	return { ...queryResult, value: isARMEngageAPI ? queryResult.data?.data.data : queryResult.data }
}
