import { LOCAL_STORAGE_ACCOUNT_AUTH, LOCAL_STORAGE_AUTH_PROFILE } from 'constant'
import { LoginAuthType } from '../types'

export const saveLogin = (auth: any) => {
	localStorage.setItem(LOCAL_STORAGE_ACCOUNT_AUTH, JSON.stringify(auth))
}

export const getLogin = (): LoginAuthType | null => {
	if (process.browser) {
		const auth = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_AUTH)
		const authObject: LoginAuthType | null = auth ? JSON.parse(auth) : auth
		return authObject
	}
	return null
}

export const getLoginToken = () => {
	const auth = getLogin()
	return auth ? auth.login.token.auth_token : null
}

export const getAccountId = () => {
	const auth = getLogin()
	return auth ? auth.login.user_account.engage_id : undefined
}

export const clearLogin = (then?: () => any) => {
	sessionStorage.removeItem(LOCAL_STORAGE_AUTH_PROFILE)
	localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_AUTH)
	then && then()
}
