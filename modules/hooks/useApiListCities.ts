import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import querystring from 'querystring'
import { CountryType } from './useApiListCountries'
import { StateType } from './useApiListStates'

export type CityType = {
	id: number
	name: string
	latitude: string
	longitude: number
	region: string
}

export default ({ countryId, stateId }) => {
	return useQueryAction<{ cities: CityType[]; country: CountryType; state: StateType }>({
		endpoint: `${ENDPOINTS.API_LIST_CITIES}/${countryId}/${stateId}`,
		queryKey: [countryId, stateId],
		enabled: !!countryId && !!stateId,
		onError: (err) => {
			console.log(err, 'from use ApiCity')
		},
	})
}
