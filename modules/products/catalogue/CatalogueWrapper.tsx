import { Stack, Box, Avatar, Flex, Tooltip } from '@chakra-ui/react'
import { defaults } from 'chart.js'
import LoadingWrapper from 'components/layout/loading-wrapper'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import useProductCategories, { ProductCategory } from 'modules/products/product/useProductCategories'
import React from 'react'
import { BiCheckShield } from 'react-icons/bi'
import { RiArrowDropRightLine } from 'react-icons/ri'

type CatalogueWrapperProps = {
	category?: ProductCategory
	onChange: (category: ProductCategory) => void
	children?: any
	showCatalogue?: boolean
}
export enum ListProductCategory {
	ALL = 'All Product',
	RECOMMENDED = 'Recommeded Products',
}

const CatalogueWrapper = ({ onChange, category, children, showCatalogue = true }: CatalogueWrapperProps) => {
	const { value, isFetching } = useProductCategories()
	const listRecommended = category?.name === ListProductCategory.RECOMMENDED
	const listAll = category?.name === ListProductCategory.ALL
	return (
		<Stack direction={{ md: 'row', base: 'column' }} spacing="8" w="full" pl={{ base: 4, md: 0 }} pr={showCatalogue ? { md: 8, base: 4 } : 0}>
			{showCatalogue && (
				<Flex flexDirection="column" minW="72" borderRightWidth="1px">
					<Flex
						role="button"
						onClick={() =>
							onChange({
								id: -1,
								name: ListProductCategory.RECOMMENDED,
								description: 'Recommeded Products',
							})
						}
						position="relative"
						cursor={listRecommended ? 'default' : 'pointer'}
						bg={listRecommended ? 'claret.500' : 'none'}
						color={listRecommended ? 'white' : 'none'}
						rounded="sm"
						align="center"
						py={4}
						px={6}
						transition="transform 0.3s ease-in-out"
						_hover={{
							transform: listRecommended && 'translateX(6px)',
						}}
					>
						{/* <Avatar size="xs" mr="6" /> */}
						<Caption alt={listRecommended}>Our Recommendation</Caption>
						<Box visibility={listRecommended ? 'visible' : 'visible'} right="4%" position="absolute" top="28%">
							<RiArrowDropRightLine size="1.5rem" />
						</Box>
					</Flex>

					<LoadingWrapper isLoading={isFetching && !value?.product_catgories.length}>
						{value?.product_catgories.map((item) => {
							const isSelected = category?.id === item.id
							return (
								<Flex
									role="button"
									onClick={() => onChange(item)}
									position="relative"
									cursor={category?.id === item.id ? 'default' : 'pointer'}
									bg={isSelected ? 'claret.500' : 'none'}
									color={isSelected ? 'white' : 'black'}
									rounded="sm"
									align="center"
									py={4}
									px={6}
									transition="transform 0.3s ease-in-out"
									_hover={{
										transform: !isSelected && 'translateX(3px)',
									}}
								>
									{/* <Avatar size="xs" mr="6" /> */}

									<Body variant={!isSelected ? 'regular13' : 'semibold13'} textTransform="capitalize">
										{item.name}
									</Body>
									<Box visibility={isSelected ? 'visible' : 'visible'} right="4%" position="absolute" top="28%">
										<RiArrowDropRightLine size="1.5rem" />
									</Box>
								</Flex>
							)
						})}
					</LoadingWrapper>

					<Flex
						role="button"
						onClick={() =>
							onChange({
								id: -2,
								name: ListProductCategory.ALL,
								description: 'All Investment Solutions',
							})
						}
						//position="relative"
						cursor={listAll ? 'default' : 'pointer'}
						bg={listAll ? 'claret.500' : 'none'}
						color={listAll ? 'white' : 'none'}
						rounded="sm"
						align="center"
						position="relative"
						py={4}
						px={6}
						transition="transform 0.3s ease-in-out"
						_hover={{
							transform: listAll && 'translateX(6px)',
						}}
					>
						{/* <Avatar size="xs" mr="6" /> */}
						<Caption alt={listAll}>All Investment Solutions</Caption>
						<Box display={listAll ? 'none' : 'block'} color="neutral.800" right="1%" position="absolute" top="28%">
							<RiArrowDropRightLine size="1.5rem" />
						</Box>
					</Flex>
				</Flex>
			)}
			<Box w="full">{children}</Box>
		</Stack>
	)
}

export default CatalogueWrapper
