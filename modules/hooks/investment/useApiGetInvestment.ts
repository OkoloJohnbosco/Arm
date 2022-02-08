import { ENDPOINTS } from 'constant'
import useQueryAction from 'lib/hooks/useQueryAction'
import { useMemo } from 'react'
import useApiListInvestments from './useApiListInvestments'

export default (id?: number | string) => {
	const investments = useApiListInvestments()
	return useMemo(() => ({ ...investments, value: investments?.value?.find((e) => e.id == id) }), [id, investments.value])
	// 	endpoint: ENDPOINTS.API_GET_INVESTMENT(id),
	// 	queryKey: [id],
	// 	enabled:  !!id
	// })
}
