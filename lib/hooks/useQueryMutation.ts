import { ENDPOINTS } from 'constant'
import { secureRequest } from 'lib/actions'
import { useIsLoading } from 'lib/contexts/requestLoading'
import { ARMEngageResponseType, ResponseErrorType, UseMutationCrudType2 } from 'lib/types'
import { useEffect } from 'react'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'
import { UseMutationCrudType } from '../types'
import useMainAction from './useMainAction'

const getMutationAction = (mutationData: UseMutationCrudType2): UseMutationCrudType => {
	const { endpoint, method, headers, isARMEngageAPI = true, setRequestProps, includeBaseApiHeaders } = mutationData
	const url = isARMEngageAPI ? ENDPOINTS.API_BASE_URL + endpoint : endpoint
	console.log(includeBaseApiHeaders, 'includeBaseApiHeaders')
	return {
		mutationFn: (body) =>
			secureRequest(
				setRequestProps
					? setRequestProps({
							url,
							method,
							body,
							isARMEngageAPI,
							includeBaseApiHeaders,

							//headers: { withCredentials: true, ...headers }
							headers,
					  })
					: { url, method, body, isARMEngageAPI, headers, includeBaseApiHeaders }
			),
		isARMEngageAPI,
		...mutationData,
	}
}

export default <Data = any, Variable = Record<any, any>>(
	mutationData: UseMutationCrudType2
): UseMutationResult<ARMEngageResponseType<Data>, ResponseErrorType, Partial<Variable>, any> & { value: Data } => {
	const { mutationFn, eventMessage, queryKey: namespace, endpoint, then, isARMEngageAPI, onSuccess, ...others } = getMutationAction(mutationData)
	const queryClient = useQueryClient()
	const { setNotification, pushServerError } = useMainAction()
	//const { stopLoading } = useIsLoading()

	useEffect(() => {
		if (eventMessage?.flight && isARMEngageAPI) {
			// setNotification(eventMessage?.flight)
		}
	}, [eventMessage?.flight?.message])

	const mutatationResult = useMutation<ARMEngageResponseType<any>, ResponseErrorType, any, any>(mutationFn, {
		mutationKey: namespace || endpoint,

		onSuccess: (response, variable, context) => {
			then?.(response, queryClient)
			// if (eventMessage?.success && isARMEngageAPI) {
			// 	typeof eventMessage?.success === 'function' ? setNotification(eventMessage?.success(response)) : setNotification(eventMessage?.success)
			// }
			onSuccess?.(response, variable, context)
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
				// typeof eventMessage?.after === 'function' ? setNotification(eventMessage.after(response)) : setNotification(eventMessage?.after)
			}
		},

		retry: false,
		...others,
	})

	return { ...mutatationResult, value: isARMEngageAPI ? mutatationResult.data?.data.data : mutatationResult.data }
}
