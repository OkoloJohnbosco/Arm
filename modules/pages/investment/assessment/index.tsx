import RiskProfileAssessment from 'modules/investment/riskProfile/assesment/chat'
import Navigation from 'components/layout/dashboard'
import { useRouter } from 'next/router'
import { PAGES } from 'constant'

const Index = () => {
	const router = useRouter()
	return (
		<Navigation>
			<RiskProfileAssessment onComplete={() => router.push(PAGES.ACCOUNT_RISK_PROFILE)} />
		</Navigation>
	)
}

export default Index
