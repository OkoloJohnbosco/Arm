import { SESSION_STORAGE_SIGNUP_DATA } from 'constant'
import useBroadcastChannel from 'lib/hooks/useBroadcastChannel'
import { SignupData } from 'modules/account/types'
import { useEffect, useMemo, useState } from 'react'

const useOnboardInitiateData = (): SignupData => {
	const [updated, setForceUpdate] = useState({})
	const broadCastChannel = useBroadcastChannel(SESSION_STORAGE_SIGNUP_DATA)

	const data = useMemo(() => (typeof window === 'object' ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_SIGNUP_DATA) || '{}') : {}), [updated])

	const handleStorageChange = ({ key, value }) => {
		if (key === SESSION_STORAGE_SIGNUP_DATA) {
			setForceUpdate({})
		}
	}

	useEffect(() => {
		broadCastChannel.addEventListener('message', handleStorageChange)
		return () => broadCastChannel.removeEventListener('message', handleStorageChange)
	}, [])

	return data
}

export default useOnboardInitiateData
