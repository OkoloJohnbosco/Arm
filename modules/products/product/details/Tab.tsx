import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react'
import React from 'react'
import BenchMark from './BenchMark'
import Calculation from './Calculation'
import Objective from './Objective'
import Market from './Market'
import Structure from './Structure'
import { Card } from 'components/card'
import Body from 'components/typography/Body'

const tabs = {
	structure: { component: Structure, title: 'Structure' },
	objective: { component: Objective, title: 'Objective' },
	// benchMark: { component: BenchMark, title: 'BenchMark' },
	// market: { component: Market, title: 'Market' },
	// calculation: { component: Calculation, title: 'Calculation' },
}

const tabNames = Object.keys(tabs)

const TabComponent = () => (
	<Tabs mt={8}>
		<Box rounded={2} pt={2} pb={5} px={8} bg="white">
			<TabList>
				{tabNames.map((tabName) => (
					<Tab
						_focus={{
							outline: 'none',
						}}
						fontWeight="600"
					>
						{tabs[tabName].title}
					</Tab>
				))}
			</TabList>
		</Box>

		<TabPanels>
			{tabNames.map((tabName) => {
				const TabComponent = tabs[tabName].component
				return (
					<TabPanel
					// px={0}
					>
						<TabComponent />
					</TabPanel>
				)
			})}
		</TabPanels>
	</Tabs>
)

export default TabComponent
