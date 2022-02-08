import React from 'react'
import { Stack, HStack, Progress, Box } from '@chakra-ui/react'
import Link from 'next/link'
import Body from 'components/typography/Body'
import SubHeading from 'components/typography/SubHeading'
import { KYCStageType } from '../../kyc/type'
import { isKycComplete } from 'utils/helpers'
import { Button } from 'components/button'

interface KycCheckerProps {
	kycStages: KYCStageType[]
	onClick: () => void
	priority: number
}

function KycChecker({ kycStages, onClick, priority }: KycCheckerProps) {
	const kycStagesList = kycStages.map((item) => item.status)
	console.log(kycStagesList, 'kycStagesList')
	return (
		<Stack spacing={3}>
			<Stack borderBottom="1px solid rgba(0,0,0,.1)">
				<HStack pb={3} justify="space-between" borderBottom="1px solid rgba(0,0,0,.1)">
					<SubHeading fontSize="15px" letterSpacing={0.5}>
						ACCOUNT COMPLETION
					</SubHeading>

					<Link href="/boss">
						<a className="drawer_link" style={{ color: '#a41857', fontWeight: 'bold', fontSize: '15px' }}>
							See More
						</a>
					</Link>
				</HStack>
			</Stack>
			<Box>
				<Body variant="regular13" color="#74879F ">
					You are {isKycComplete(kycStagesList)}% closer to completing your account. Complete your account to have full access to all ARM
					services
				</Body>
			</Box>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Progress size="xs" rounded={8} value={priority == 2 ? 90 : isKycComplete(kycStagesList)} colorScheme="blue" w="85%" />
				<Body color="#3077FF">{priority == 2 ? 90 : isKycComplete(kycStagesList)}%</Body>
			</Stack>
			<Box>
				<Button onClick={onClick}>
					{/* <a className="drawer_link" style={{ color: '#a41857', fontWeight: 'bold', fontSize: '15px' }}> */}
					Complete KYC
					{/* </a> */}
				</Button>
			</Box>
		</Stack>
	)
}

export default KycChecker
