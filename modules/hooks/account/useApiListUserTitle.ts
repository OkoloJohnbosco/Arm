import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'

export type UserTitleType = {
	name: string
	code: string
}

export default () => {
	return useQueryAction<{ titles: UserTitleType[] }>({
		endpoint: ENDPOINTS.API_LIST_USER_TITLE,
	})
}
