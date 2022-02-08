import { PAGES } from 'constant'
import HomePage from 'components/layout/home'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// export default HomePage
export default () => {
	const router = useRouter()
	useEffect(() => {
		router.push(PAGES.ACCOUNT_LOGIN)
	}, [])
	return null
}
