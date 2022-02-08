import React from 'react'
import Navigation from 'components/layout/dashboard'
import Settings from 'modules/settings'

const Index = () => {
	return (
		<Navigation responsive={true}>
			<Settings />
		</Navigation>
	)
}

export default Index
