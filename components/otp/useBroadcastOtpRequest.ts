import { SESSION_STORAGE_OTP_MONITOR } from 'constant'
import { setBroadcastStorage } from 'lib/broadcastStorage'
import { useEffect } from 'react'
// import { setBroadcastStorage } from 'utils/helpers'
import { UseRequestOTPProps } from './useRequestOTP'

export default () => {
	/**
	 * Allows useOtpRequest to report and monitor when an otp has been requested
	 * Call in the Parent Component that uses useOtpRequest or pass the returned function
	 * as argument to useOTP props of OTP Form
	 * when the Parent component exits, the OTP will be cleared from session storage
	 **/

	useEffect(() => {
		return () => {
			sessionStorage.removeItem(SESSION_STORAGE_OTP_MONITOR)
		}
	}, [typeof window])
	return (otp: UseRequestOTPProps) => setBroadcastStorage(SESSION_STORAGE_OTP_MONITOR, JSON.stringify(otp), 'sessionStorage')
}
