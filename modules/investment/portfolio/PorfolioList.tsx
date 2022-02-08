import React from 'react'
import InvestmentSolutionCard from '../InvestmentCard'
import useInvestedProducts from 'modules/hooks/investment/useApiListInvestmentsDetails'
import { Box, Grid, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import Button from 'components/button/Button'
import { BiPlus, BiPlusCircle } from 'react-icons/bi'
import { PAGES } from 'constant'
import LoadingWrapper from 'components/layout/loading-wrapper'
import useApiListInvestments from 'modules/hooks/investment/useApiListInvestments'
import Banner from './Banner'
import { useRouter } from 'next/router'

const PortFolioList = () => {
	const { value: investments, isLoading } = useApiListInvestments()
	const router = useRouter()
	return (
		<Stack spacing={{ md: 8, base: 6 }}>
			<Stack spacing={{ md: 12, base: 6 }}>
				<Button
					w={{ md: '3xs', base: 'full' }}
					onClick={() => router.push(PAGES.DASHBOARD.PRODUCT_CATALOGUE)}
					rounded={4}
					alignSelf="flex-end"
					leftIcon={<BiPlusCircle />}
				>
					Add Investment Solution
				</Button>
				<Banner />
			</Stack>
			<LoadingWrapper isLoading={!investments?.length && isLoading}>
				<Box>
					<Grid templateColumns="repeat(auto-fill,minmax(250px,1fr))" gap={{ base: 3, md: 6 }}>
						{investments?.map((investment, i) => {
							return (
								<LinkOverlay href={`${PAGES.DASHBOARD.PORTFOLIO}/${investment.id}`} key={investment.id}>
									<LinkBox>
										<InvestmentSolutionCard key={i} alt investment={investment} />
									</LinkBox>
								</LinkOverlay>
							)
						})}
					</Grid>
				</Box>
			</LoadingWrapper>
		</Stack>
	)
}

export default PortFolioList
