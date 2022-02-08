import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'

export type RelationshipType = {
	name: string
	code: string
}

export default () => {
	return useQueryAction<{ relationships: RelationshipType[] }>({
		endpoint: ENDPOINTS.API_LIST_RELATIONSHIP,
	})
}
