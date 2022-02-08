import { PAGES } from 'constant'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ProfilingChat from './chat'
import StartPage from 'components/layout/components/start/Page'

const Index = () => {
	const router = useRouter()
	useEffect(() => {
		router.prefetch(PAGES.ACCOUNT_RISK_PROFILE)
	}, [])

	const onCompleteProfiling = () => {
		router.push(PAGES.ACCOUNT_RISK_PROFILE)
	}
	return (
		<StartPage online top={0}>
			<ProfilingChat onComplete={onCompleteProfiling} />
		</StartPage>
	)
}

export default Index
