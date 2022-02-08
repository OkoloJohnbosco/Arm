import { Stack } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'
import ServerErrorBoundary from 'components/error/ServerErrorBoundary'
// import { fetchComponent } from 'lib/util'
import StartPage from 'components/layout/components/start/Page'
import { CircularProgress, LinearProgress } from 'components/progress'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import useApiGetInvestmentMix from 'modules/hooks/investment/useApiGetInvestmentMix'
import React, { FC, useEffect, useMemo } from 'react'
import SubscriptionKyc from './kyc'
import Payment from './payment'
import { progressSteps } from './shared/config'
import Mix from './subscribe'
import { InvestmentProcessContext, InvestmentSubscriptionStage } from './type'

// const fetchComponent = (subscriptionStage: string) =>
// 	subscriptionStage
// 		? dynamic(() => import(`./${subscriptionStage}`), { ssr: true })
// 		: () => <div>Error Loading dynamic {subscriptionStage} component</div>

const stageComponent: { [x in InvestmentSubscriptionStage]: FC } = {
	mix: Mix,
	kyc: SubscriptionKyc,
	//@ts-ignore
	payment: Payment,
}

const InvestmentSubscription = () => {
	const stage: InvestmentSubscriptionStage | undefined = useNextQueryParam('stage')
	const mixId = useNextQueryParam('mixId')
	const { value } = useApiGetInvestmentMix({ mixId })
	const currentStep = useMemo(
		() =>
			progressSteps.find((s) => {
				console.log(s.id, stage)
				return s.id === (stage || InvestmentSubscriptionStage.Mix)
			}),
		[stage]
	)

	const SubscriptionStageComponent = useMemo(
		() => (stage && stage in stageComponent ? stageComponent[stage] : stageComponent[InvestmentSubscriptionStage.Mix]),
		[stage]
	)

	useEffect(() => {
		// stageQuery && onNextSubscriptionStep(stageQuery)
	}, [stage, mixId])

	// const onNextSubscriptionStep = (nextStep?: InvestmentSubscriptionStage) => {
	// 	//TODO should be named process step
	// 	const next = nextStep ? progressSteps.findIndex(({ id: progressId }) => progressId === nextStep) : progressSteps.indexOf(currentStep) + 1
	// 	setCurrentStep(progressSteps[next])
	// }

	return (
		<InvestmentProcessContext.Provider
			value={{
				mixId,
				investmentMix: value,
			}}
		>
			<ServerErrorBoundary>
				<StartPage hasShadow>
					<Box
						w="full"
						minH="calc(100vh - 4rem)"
						//  h="calc( 100vh - 8%)"
						background={'neutral.20'}
					>
						<Stack spacing={10} py={8} w={{ md: '80%', base: 'auto' }} margin={{ base: 0, md: '0 auto' }}>
							<Stack p={4}>
								<Box display={{ lg: 'none', base: 'block' }}>
									<CircularProgress steps={progressSteps} currentStep={currentStep} />
								</Box>
								<Box display={{ base: 'none', lg: 'block' }}>
									<LinearProgress currentStep={currentStep} steps={progressSteps} />
								</Box>
							</Stack>
							<SubscriptionStageComponent />
						</Stack>
					</Box>
				</StartPage>
			</ServerErrorBoundary>
		</InvestmentProcessContext.Provider>
	)
}

export default InvestmentSubscription
