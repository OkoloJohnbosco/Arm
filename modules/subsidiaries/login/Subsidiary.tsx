import { Box, Flex } from '@chakra-ui/react'
import { StackCard } from 'components/card'
import Divider from 'components/divider'
import ServerErrorBoundary from 'components/error/ServerErrorBoundary'
import StartPage from 'components/layout/components/start/Page'
import RiskAssessmentPrompt from 'components/layout/components/start/RiskAssessmentFooter'
import LeftBanner from 'components/layout/components/start/StartHero2'
import React, { useState } from 'react'
import { SubsidiaryType } from '../../account/types'
import Subsidiaries from './ListSubsidiary'
import SubsidiaryAuthForm from './Form'

const Subsidiary = () => {
	const [subsidiary, setSubsidiary] = useState<SubsidiaryType>()

	return (
		<ServerErrorBoundary>
			{/* <StartPage> */}
			<Flex align="center" minH="calc(100vh - 5rem)" justify="space-evenly" flexDir={{ base: 'column', md: 'row' }}>
				<Box display={{ base: 'none', md: 'block' }}>
					<LeftBanner />
					<RiskAssessmentPrompt />
				</Box>

				<Divider orientation="vertical" display={{ base: 'none', md: 'block' }} maxH="xl" />
				<StackCard w={{ sm: 'sm' }}>
					{subsidiary && <SubsidiaryAuthForm setSubsidiary={setSubsidiary} subsidiary={subsidiary} />}
					{!subsidiary && <Subsidiaries setSubsidiary={setSubsidiary} />}
				</StackCard>
			</Flex>
			{/* </StartPage> */}
		</ServerErrorBoundary>
	)
}

export default Subsidiary
