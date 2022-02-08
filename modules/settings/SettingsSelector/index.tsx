import React from 'react'
import NextOfKin from '../NextOfKin'
import KycSecurity from '../KycSecurity'
import AccountProfile from '../AccountProfile'
import RelationshipManager from '../RelationshipManager'
import DirectDebit from '../DirectDebit'
import BankDetails from '../BankDetails'
import AddAccount from '../AddAccount'
import Referral from '../Referral'
import SwitchOptions from '../Options'

import { RouteProps } from '../index'

const index = ({ section }: { section: RouteProps }) => {
	switch (section) {
		case 'profile':
			return <AccountProfile />

		case 'next-of-kin':
			return <NextOfKin />

		case 'kyc':
			return <KycSecurity />

		case 'rm':
			return <RelationshipManager />

		case 'direct-debit':
			return <DirectDebit />

		case 'options':
			return <SwitchOptions />

		case 'referral':
			return <Referral />
		// case 'redemption':
		// 	return <Redemption />

		case 'bank-details':
			return <BankDetails />
		case 'add-account':
			return <AddAccount />

		default:
			return <AccountProfile />
	}
}

export default index
