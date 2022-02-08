import { KYCTierType } from 'modules/kyc/type'
import { QueryClient, UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions } from 'react-query'
import { ThemeModeNameType } from './theme/type'

export interface SecureRequestProps<P = any> {
	method?: string
	url: string
	body?: P
	isARMEngageAPI?: boolean
	includeBaseApiHeaders?: boolean
	baseURL?: string
	// data?: any
	headers?: any
	cleanup?: any
}

export type CrudEventType = {
	setLoading?: (isLoading: boolean) => void
	setMessage?: (message: string) => void
}

export type UseQueryCrudType = GenericCrudProps & {
	initialData?: any
	queryFn: () => any
} & UseQueryOptions<ARMEngageResponseType, ResponseErrorType>

export type UseQueryCrudType2 = GenericCrudProps & {
	initialData?: any
} & Omit<UseQueryOptions<ARMEngageResponseType, ResponseErrorType>, 'initialData' | 'queryFn'>

export type UseMutationCrudType2<PLOAD = any> = GenericCrudProps & {
	setRequestProps?: (requestProps: SecureRequestProps) => SecureRequestProps
} & Omit<UseMutationOptions<ARMEngageResponseType, ResponseErrorType, PLOAD>, 'mutationFn'>

export type UseMutationCrudType = GenericCrudProps & {
	mutationFn: (data?: any) => any
} & UseMutationOptions<ARMEngageResponseType, ResponseErrorType>

export type UseInfiniteQueryCrudType = GenericCrudProps & {
	initialData?: any
	queryFn: () => any
} & UseInfiniteQueryOptions<ARMEngageResponseType, ResponseErrorType>

export type GetInfiniteQueryActionType = GenericCrudProps &
	Omit<UseInfiniteQueryOptions<any>, 'initialData'> & {
		initialData?: { pages: Array<any> }
		setNextRequestProps?: (props: { params: { pageParam: any }; requestProps: SecureRequestProps }) => SecureRequestProps
	}

export interface ARMEngageResponseType<D = any> {
	data: {
		response_code: string
		data: D
		response_message: string
	}
}

export interface ResponseErrorType<R = any> {
	data: {
		response_code: string
		data: {
			errors: Array<{ code: string; message: string }>
		}
		response_message: string
	}
}

export type AlertType = 'warning' | 'success' | 'info' | 'error' | 'loading' | ''

export enum RoboComponentNameType {
	InvestmentMix = 'InvestmentMix',
}

export type RoboNoticeType = EventDataType & {
	roboComponentName?: RoboComponentNameType
	action?: 'delete' | 'click' | 'hover'
	id?: number
	status?: 'viewed' | 'new'
}

export interface MainActionType {
	crudAction: (payload: GenericCrudProps) => Promise<any>
	setNotification: (event: EventDataType) => void
	pushServerError: (errorData: { message: string; errors: Array<EventDataType>; responseCode?: string }) => void
	clearServerErrors: () => void
	pushRoboNotice: (notice: RoboNoticeType) => void
	refetchKyc: () => void
}

export type CrudActionPropsType<P = any, R = any> = {
	mainAction: MainActionType
	then?: (response: R) => any
	onError?: (response: ResponseErrorType<R>) => any
	query?: Record<string, any>
	payload?: P
	path?: string
	setIsLoading?: (loading: boolean) => void
}

export type EventDataVariant = 'update' | 'loading'

export interface EventDataType {
	title?: string
	message?: string
	namespace?: string
	variant?: EventDataVariant
	type?: AlertType
}

export interface ServerErrors {
	code: string
	message: string
}

export interface MainStateType {
	themeModeName: ThemeModeNameType
	notification: EventDataType
	serverErrors: { errors: ServerErrors[]; message: string; responseCode?: string }
	roboNotice: RoboNoticeType[]
	kyc: { data?: KYCTierType | undefined; isLoading: boolean }
}

export interface EventMessageType {
	flight?: EventDataType
	success?: ((response: ARMEngageResponseType) => EventDataType) | EventDataType
	error?: ((response: ResponseErrorType) => Array<EventDataType>) | Array<EventDataType>
	after?: ((response: ResponseErrorType | ARMEngageResponseType) => EventDataType) | EventDataType
}

export interface GenericCrudProps {
	setIsLoading?: (loading: boolean) => any
	eventMessage?: EventMessageType
	endpoint: string
	body?: any
	data?: any
	headers?: any
	method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'
	queryKey?: any
	select?: (serverResonse: ARMEngageResponseType) => any
	then?: (serverResonse: ARMEngageResponseType, queryClient?: QueryClient) => void
	successCode?: string
	onError?: (data: ResponseErrorType) => void
	isARMEngageAPI?: boolean
	includeBaseApiHeaders?: boolean
	initialData?: any
}
