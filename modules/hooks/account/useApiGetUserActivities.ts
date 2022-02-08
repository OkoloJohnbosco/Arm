import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'

export type CategoryType = {
	id: number
	title: string
	category_type: string
	message: string
}

export type ActivityType = {
	is_archived: boolean
	id: number
	activity_url: string
	is_response_required: boolean
	date_created: string
	response_url: any
	category: CategoryType
}

export default () => {
	return useQueryAction<{ activities: ActivityType[] }>({
		endpoint: ENDPOINTS.API_USERS_ACTTIVITIES,
	})
}
