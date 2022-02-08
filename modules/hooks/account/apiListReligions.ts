import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'

export type ReligionType = {
	name: string
	code: string
}

export default () => {
	return useQueryAction<{ religions: ReligionType[] }>({
		endpoint: ENDPOINTS.API_LIST_RELIGION,
	})
}
