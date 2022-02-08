import { Box, Flex, Grid, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import StartPage from 'components/layout/components/start/Page'
import LoadingSpinner from 'components/animations/loadingSpinner'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Heading from 'components/typography/Heading'
import Product from 'modules/products/product/Product'
import ProductInvestmentCard from 'modules/investment/InvestmentCard'
import React from 'react'
import { getLogin } from '../../account/helper'
import useInvestedProducts from '../../hooks/investment/useApiListInvestmentsDetails'
import EmptyProduct from './EmptyProduct'
import { Button } from 'components/button'
import { PAGES } from 'constant'

const Index = () => {
	const { first_name } = getLogin()?.login.user_account.user || {}
	const { value, isFetching } = useInvestedProducts()
	console.log(isFetching)
	return (
		<StartPage hasShadow>
			<Stack margin="0 auto" p={4} mt={10}>
				<IfElse ifOn={value?.customer_businesses.length || !isFetching} elseThen={<LoadingSpinner />}>
					<IfElse ifOn={value?.customer_businesses.length} elseThen={<EmptyProduct />}>
						<Stack spacing={10}>
							<Stack textAlign="center">
								<Heading>Hello {first_name}, your products on ARM</Heading>
								<Body>Here are investment solutiions from subsidiaries </Body>
							</Stack>
							<Stack spacing={6}>
								{/* <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={{ base: 3, md: 6 }}>
									{value?.customer_businesses.map((productBusiness) => {
										return productBusiness.products.map((investment) => <ProductInvestmentCard  investment={investment} />)
									})}
								</Grid> */}
								<Wrap justify="center" spacing={{ md: 8, base: 6 }}>
									{value?.customer_businesses.map((productBusiness) => {
										return productBusiness.products.map((investment) => (
											<WrapItem>
												<ProductInvestmentCard alt investment={investment} business={productBusiness} />
											</WrapItem>
										))
									})}
								</Wrap>
								<Flex justify="center" pt="8">
									<Button looks="primary" linkProps={{ w: 'auto' }} w="xs" href={PAGES.ACCOUNT_RISK_PROFILE}>
										Continue
									</Button>
								</Flex>
							</Stack>
						</Stack>
					</IfElse>
				</IfElse>
			</Stack>
		</StartPage>
	)
}

export default Index
