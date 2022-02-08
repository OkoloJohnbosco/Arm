import { Box, Flex, Grid, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import LoadingWrapper from 'components/layout/loading-wrapper'
import SearchFilter from 'components/search-filter'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import SubHeading from 'components/typography/SubHeading'
import { PAGES } from 'constant'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import { colors } from 'lib/theme'
import { getLogin } from 'modules/account/helper'
import Product from 'modules/products/product/Product'
import React, { useMemo, useState } from 'react'
import useGetAllProducts from '../../hooks/product/useApiGetProductsCatalogue'
import useRecommendedProduct from '../../hooks/useRecommendedProduct'
import useCategoriesProducts from '../product/useCategoryProducts'
import useProductCategories, { ProductCategory } from '../product/useProductCategories'
import CatalogueWrapper, { ListProductCategory } from './CatalogueWrapper'

type CustomizeProps = {
	showCatalogue?: boolean
}

const Customize = ({ showCatalogue = true }: CustomizeProps) => {
	const { login } = getLogin() || {}
	const recommended = useRecommendedProduct()
	const allProducts = useGetAllProducts()
	const [promptMix, setPromptMix] = useState<boolean>(false)
	const productCateories = useProductCategories()
	const selectedCategoryId = useNextQueryParam('categoryId')
	const [filter, setFilter] = useState('')

	const selectedCategory = useMemo(() => productCateories.value?.product_catgories.find((cat) => cat.id == selectedCategoryId), [
		selectedCategoryId,
		productCateories.value?.product_catgories.length,
	])
	const [category, setCategory] = useState<ProductCategory>({
		id: -1,
		name: ListProductCategory.RECOMMENDED,
		description: 'Recommeded Products',
	})
	const categoryProducts = useCategoriesProducts(selectedCategoryId || category?.id)
	return (
		<Box>
			<Flex
				justify="space-between"
				sx={{ gap: '1rem' }}
				flexWrap="wrap"
				p={{ base: '15px', md: '2rem' }}
				align="center"
				bgColor="claret.500"
				position="sticky"
				top={0}
				mb="8"
				//borderRadius={{ md: '5px' }}
				width="100%"
				h="fit-content"
				zIndex="99"
			>
				<Stack position="sticky" flexDirection="row" flexWrap="wrap" alignItems="center" spacing={8}>
					<Box color={colors.white}>
						<Body color="white" variant="semibold14">
							Welcome {login?.user_account.user.first_name}
						</Body>
						<Small color="white">You can pick and customise the investment solutiions you want here.</Small>
					</Box>
				</Stack>

				<Flex
				//justifyContent="flex-end"
				//	alignSelf='flex-end'
				>
					<Button bg="neutral.0" looks="primaryOutline" border="none" href={PAGES.INVESTMENT_SUBSCRIPTION}>
						Proceed to Investment Mix
					</Button>
				</Flex>
			</Flex>
			<CatalogueWrapper onChange={setCategory} category={category} showCatalogue={showCatalogue}>
				<Stack
					//align="center"
					mb="8"
					spacing={4}
				>
					<Box
					// w={{ sm: 'calc(100% - 40%)' }}
					//px={4}
					// margin="0 auto"
					>
						<SearchFilter searchFilter={setFilter} />
					</Box>
				</Stack>
				<Stack spacing={8} w={{ base: '90%', md: '90%' }} m={{ base: '0 auto', md: 'initial' }}>
					<SubHeading textTransform="capitalize">{category?.name}</SubHeading>
					{category?.name !== ListProductCategory.ALL && category?.name !== ListProductCategory.RECOMMENDED && (
						<LoadingWrapper isLoading={!categoryProducts.value?.products && categoryProducts.isFetching}>
							<Grid templateColumns="repeat(auto-fill,minmax(270px,1fr))" gap={{ base: 3, md: 6 }}>
								{categoryProducts.value?.products
									?.filter((v) => (!filter ? true : new RegExp(filter, 'gi').test(v.name)))
									?.map((product) => {
										return <Product key={product.id} products={product} />
									})}
							</Grid>
						</LoadingWrapper>
					)}
					{category?.name === ListProductCategory.RECOMMENDED && (
						<LoadingWrapper isLoading={!recommended.value?.products && recommended.isFetching}>
							<Grid templateColumns="repeat(auto-fill,minmax(270px,1fr))" gap={{ base: 3, md: 6 }}>
								{recommended.value?.products
									.filter((v) => (!filter ? true : new RegExp(filter, 'gi').test(v.name)))
									?.map((product) => {
										return <Product key={product.id} products={product} />
									})}
							</Grid>
						</LoadingWrapper>
					)}
					{category?.name === ListProductCategory.ALL && (
						<LoadingWrapper isLoading={!allProducts.value?.products && allProducts.isFetching}>
							<Grid templateColumns="repeat(auto-fill,minmax(270px,1fr))" gap={{ base: 3, md: 6 }}>
								{allProducts.value?.products
									?.filter((v) => (!filter ? true : new RegExp(filter, 'gi').test(v.name)))
									?.map((product) => {
										return <Product key={product.id} products={product} />
									})}
							</Grid>
						</LoadingWrapper>
					)}
				</Stack>
			</CatalogueWrapper>
		</Box>
	)
}

export default Customize
