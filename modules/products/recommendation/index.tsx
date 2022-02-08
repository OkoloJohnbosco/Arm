import { Box, Flex, Grid, Image, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { Button } from 'components/button'
import LinkText from 'components/link/ArrowLink'
import IfElse from 'components/if-else'
import FormLoading from 'components/animations/formLoading'
import Modal from 'components/modal'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import { PAGES, SESSION_STORAGE_MIX_CART } from 'constant'
import { setBroadcastStorage, useBroadcastStorage } from 'lib/broadcastStorage'
import PromtAssessment from 'modules/investment/riskProfile/assesment/prompt-assesment'
import Product from 'modules/products/product/Product'
import StartPage from 'components/layout/components/start/Page'
import React, { useEffect, useMemo, useState } from 'react'
import useRecommendedProduct from '../../hooks/useRecommendedProduct'
// import PromptMix from '../../investment/prompt-mix'
import RoboMan from 'components/robo'
import LoadingWrapper from 'components/layout/loading-wrapper'

const ProductRecommendation = () => {
	const recommended = useRecommendedProduct()
	const cartStorage = useBroadcastStorage(SESSION_STORAGE_MIX_CART)
	const cart = useMemo(() => JSON.parse(cartStorage), [cartStorage])

	const [promptMix, setPromptMix] = useState<boolean>(false)
	const isProducts = recommended.value?.products.length

	useEffect(() => {
		recommended.value?.products && setBroadcastStorage(SESSION_STORAGE_MIX_CART, JSON.stringify(recommended.value?.products), 'sessionStorage')
	}, [recommended.value])

	return (
		<StartPage hasShadow>
			{/* <RoboMan>
				<PromptMix />
			</RoboMan>
			<Modal blockScrollOnMount size="md" isCentered={false} isOpen={promptMix} onClose={() => setPromptMix(false)} padded={false}>
				<PromptMix onEmpty={() => setPromptMix(false)} />
			</Modal> */}
			<Stack alignItems="center" alignSelf="center" py={8} px={4} marginBottom={{ base: 34, md: 4 }}>
				<Box display={!recommended.isFetching && !isProducts ? 'block' : 'none'}>
					<PromtAssessment />
				</Box>
				<LoadingWrapper isLoading={recommended.isFetching && !recommended.value?.products.length}>
					{/* <IfElse ifOn={!recommended.isFetching} elseThen={<FormLoading />}> */}
					<Box display={isProducts ? 'block' : 'none'}>
						<Box p={4}>
							<Heading textAlign="center">You fall into the aggressive growth category</Heading>
							<Body textAlign="center">We recommend 60% Aggressive Growth Fund and 40% Educational Trust.</Body>
						</Box>
						<Grid justify="center" spacing="6" alignSelf="center" templateColumns="repeat(auto-fill,minmax(250px,1fr))" gap={6} mt="6">
							{recommended?.value?.products.map((product) => {
								return <Product key={product.id} products={product} />
							})}
						</Grid>

						<Flex align="center" justify="center" mt={4}>
							<Box w="35px">
								<Image src="/img/icons/notice.gif" />
							</Box>
							<LinkText color="red" variant="regular12" underline href="">
								Click on Card for more details
							</LinkText>
						</Flex>
					</Box>
					{/* </IfElse> */}
				</LoadingWrapper>
				<Stack p={4} display={isProducts ? 'flex' : 'none'} pt={8} w={{ base: 'full', md: 'auto' }} direction={{ base: 'column', md: 'row' }}>
					<Button
						display={cart?.length ? 'block' : 'none'}
						// display={{ base: 'initial', md: 'none' }}
						shadow="B30"
						zIndex="overlay"
						bottom={0}
						left={0}
						transition="visibility 1s ease-in-out"
						right={0}
						rounded={{ base: 0, md: 2 }}
						position={{ base: 'fixed', md: 'relative' }}
						onClick={() => setPromptMix(true)}
						//href={isProducts ? `${PAGES.ACCOUNT_LOGIN_INVESTMENT_PROCESS}` : PAGES.ACCOUNT_RISK_ASSESSMENT}
						isDisabled={recommended.isFetching}
						looks="primary"
						w={{ base: 'full', md: '3xs' }}
					>
						{isProducts ? 'Continue' : 'Take  Risk Assessment'}
					</Button>
					<Button
						//looks="primary"

						display={isProducts ? 'inline-flex' : 'none'}
						isDisabled={recommended.isFetching}
						w={{ base: 'full', md: 'xs' }}
						href={PAGES.PRODUCT_RECOMMENDATION_CATALOGUE}
					>
						Customize
					</Button>
				</Stack>
			</Stack>
		</StartPage>
	)
}

export default ProductRecommendation
