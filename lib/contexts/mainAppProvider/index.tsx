import { SESSION_STORAGE_THEME_NAME } from 'constant'
import { crudAction } from 'lib/actions'
import { useBroadcastStorage } from 'lib/broadcastStorage'
import { EventDataType, MainActionType, MainStateType, RoboNoticeType, ServerErrors } from 'lib/types'
import useApiGetKyc from 'modules/hooks/kyc/useApiGetKyc'
import React, { useState } from 'react'

export const MainStateContext = React.createContext<MainStateType>({
	kyc: { isLoading: false },
	roboNotice: [],
	notification: {},
	serverErrors: { errors: [], message: '' },
	themeModeName: 'light',
})

export const MainActionContext = React.createContext<MainActionType>({} as any)

export const MainAppProvider = ({ children }: { children: any }) => {
	const [notification, setNotification] = useState<EventDataType>({})
	const [serverErrors, setServerErrors] = useState<{ errors: ServerErrors[]; message: string }>({ errors: [], message: '' })
	const [roboNotice, setRoboNotice] = useState<RoboNoticeType[]>([])
	const themeModeName = useBroadcastStorage(SESSION_STORAGE_THEME_NAME)

	console.log(themeModeName, 'from mainAppProvider')

	const kyc = useApiGetKyc({ enabled: true })

	const clearServerErrors = () => {
		setServerErrors({ errors: [], message: '' })
	}

	const pushServerError = (errors) => {
		setServerErrors(errors)
	}

	const pushRoboNotice = (notice: RoboNoticeType) => {
		switch (notice.action) {
			case 'delete':
				setRoboNotice(roboNotice.filter((nt) => nt.id !== notice.id))
				break
			case 'click':
			case 'hover':
				notice.status !== 'viewed' && setRoboNotice(roboNotice.map((nt) => (nt.id === notice.id ? { ...nt, status: 'viewed' } : nt)))
				break
			default: {
				const nextId = roboNotice?.length + 1
				setRoboNotice([
					{
						...notice,
						id: nextId,
						status: 'new',
					},
					...roboNotice,
				])
			}
		}
	}

	return (
		<MainActionContext.Provider
			value={{
				refetchKyc: kyc.refetch,
				crudAction: crudAction,
				setNotification,
				pushServerError,
				clearServerErrors,
				pushRoboNotice,
			}}
		>
			<MainStateContext.Provider
				value={{ kyc: { data: kyc.value, isLoading: kyc.isLoading }, roboNotice, notification, serverErrors, themeModeName }}
			>
				{children}
			</MainStateContext.Provider>
		</MainActionContext.Provider>
	)
}
