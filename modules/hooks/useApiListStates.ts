import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { CountryType } from './useApiListCountries'

export type StateType = {
	id: number
	name: string
	state_code: string
}

export default (countryId?: number) => {
	return useQueryAction<{ states: StateType[]; country: CountryType }>({
		endpoint: `${ENDPOINTS.API_LIST_STATES}/${countryId}`,
		queryKey: [countryId],
		enabled: !!countryId,
		onError: (err) => {
			console.log(err, 'from use ApiCountry')
		},
	})
}
