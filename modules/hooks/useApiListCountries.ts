import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'

export type CountryType = {
	id: number
	name: string
	iso: string
	phone_code: number
	region: string
}

export default () => {
	return useQueryAction<{ countries: CountryType[] }>({
		endpoint: ENDPOINTS.API_LIST_COUNTRIES,
	})
}
