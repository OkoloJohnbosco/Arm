import { Box, Flex } from '@chakra-ui/react'
import StartPage from 'components/layout/components/start/Page'
import Loading from 'components/Loading'
import { BROADCAST_PAYMENT_REDIRECT } from 'constant'
import useBroadcastChannel from 'lib/hooks/useBroadcastChannel'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import React, { useEffect } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import Loader from 'react-spinners/CircleLoader'

const Index = () => {
	const channel = useBroadcastChannel(BROADCAST_PAYMENT_REDIRECT)

	const paystackTransactionReference = useNextQueryParam('trxref')
	const paystackReference = useNextQueryParam('reference')

	useEffect(() => {
		channel.postMessage({ transactionReference: paystackTransactionReference, reference: paystackReference })
	}, [])

	return (
		<StartPage>
			<Flex h="full" align="center" justify="center">
				<BeatLoader />
			</Flex>
		</StartPage>
	)
}

export default Index
