import * as React from 'react'
import { useRouter } from 'next/router'
import url from 'url'
import encode from 'querystring/decode'

export function useNextQueryParam(key: string) {
	const router = useRouter()

	const value = React.useMemo(() => {
		return encode(url.parse(router.asPath).query)[key]
	}, [router.asPath, key])

	return value
}
