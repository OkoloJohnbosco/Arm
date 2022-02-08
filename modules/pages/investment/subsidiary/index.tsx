import RiskProfileAssessment from 'modules/subsidiaries/login/Subsidiary'
import Navigation from 'components/layout/dashboard'
import { useRouter } from 'next/router'
import { PAGES } from 'constant'

const Index = () => {
	const router = useRouter()
	return (
		<Navigation>
			<RiskProfileAssessment />
		</Navigation>
	)
}

export default Index
