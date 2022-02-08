import dynamic from 'next/dynamic'
import React from 'react'
import LoadingResult from 'modules/investment/riskProfile/assesment/LoadingProfile'
import { useRiskScore } from '../../../../hooks/useRiskProfile'
import { getLogin } from 'modules/account/helper'
import IfElse from 'components/if-else'

const ResultPages = {
	High: 'ModerateProfile',
	'Very High': 'BalancedProfile',
	Low: 'LowProfile',
	BalancedProfile: 'BalancedProfile',
	Moderate: 'BalancedProfile',
}

const loadScreen = (profile: string) =>
	profile ? dynamic(() => import(`./${profile}`), { ssr: true }) : () => <div>Error Loading dynamic {profile} component</div>

const ProfilingResult = () => {
	const { user_account } = getLogin()?.login || {}
	const { value, isFetching } = useRiskScore(user_account?.engage_id)
	console.log(value)
	const ResultComponent: any = loadScreen(ResultPages[value?.risk_profile?.risk_rating || ''] || 'LowProfile')

	return (
		<IfElse ifOn={!isFetching} elseThen={<LoadingResult isLoading={isFetching} />}>
			<ResultComponent {...value?.risk_profile} />
		</IfElse>
	)
}

export default ProfilingResult
