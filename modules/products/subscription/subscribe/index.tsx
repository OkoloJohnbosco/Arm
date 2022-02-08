import { Progress, Stack, useToast } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import Prompt from 'components/prompt-action'
import { SESSION_STORAGE_MIX_CART } from 'constant'
import { useBroadcastStorage } from 'lib/broadcastStorage'
import useInvestmentSubscription from 'modules/hooks/investment/useApiPostInvestmentSubscription'
import { InvestmentMixContext, InvestMentMixType, ProductType } from 'modules/account/types'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import usePostInvestmentMix from '../../../hooks/usePostInvestmentMix'
import { getProductPaymentUrl } from '../config'
import ProcessWrapper from '../shared/ProcessWrapper'
import { InitiateInvestmentType, InvestmentProcessContext, InvestmentSubscriptionStage, TransactionType } from '../type'
import InitiateInvestmentMix from './ProductMix'
import InvestmentMix from './InvestmentMix'
import { getInvestmentLimits } from './util'
import Review from './Review'
import Caption from 'components/typography/Caption'
import ProductSummaryCard from 'modules/products/product/Product'
import { StackCard } from 'components/card'
import { colors } from 'lib/theme'
import ScrollView from 'components/scrollview'
import useMainAction from 'lib/hooks/useMainAction'

enum MixStage {
	Initiate = 'Initiate',
	Mix = 'Mix',
}
const Mix = () => {
	const toast = useToast()
	const selectedProductList = JSON.parse(useBroadcastStorage(SESSION_STORAGE_MIX_CART))
	const { mutateAsync, isLoading } = usePostInvestmentMix()
	const [mixId, setMixId] = useState<number>()
	const { pushRoboNotice } = useMainAction()

	// const [selectedProductList, setSelectedProductList] = useState<InvestMentProductType[]>(productList)
	const [mixedProducts, setMixedProducts] = useState<InvestMentMixType[]>([])
	const [currentMix, setCurrentMixProduct] = useState<InvestMentMixType>({ product: selectedProductList?.length ? selectedProductList[0] : null })
	// const minimumInvestmentAmount = useMemo(() => selectedProductList.reduce((acc, p) => acc + Number(p.minimum_investment), 0), [])
	const [mixStage, setMixStage] = useState<MixStage>(MixStage.Initiate)
	const [initiateInvestmentData, setInitiateInvestmentData] = useState<InitiateInvestmentType>({ totalInvestmentAmount: 0 })
	const mixIsCompleted = useMemo(() => selectedProductList?.every((p) => mixedProducts.some((mx) => mx.product?.id === p.id)), [mixedProducts])

	const investmentSubscription = useInvestmentSubscription()
	const router = useRouter()

	const handleSubmitInvestmentMix = () => {
		mutateAsync({
			total_investment_amount: mixedProducts.reduce((accum, next) => accum + (Number(next?.amountInvested) || 0), 0),
			duration: 8,
			duration_unit: 'Day', //initiateInvestmentData.investmentFrequencyUnit?.value as string
			//@ts-ignore
			products: mixedProducts.map(({ product, amountInvested, duration }) => ({
				//TODO investment_percentage Should be derived by API
				product_id: product?.id,
				amount_invested: Number(amountInvested),
				investment_percentage: 40,
			})),
		}).then(({ data: { response_code, data } }) => setMixId(data.customer_investment.id))
		//.catch(() => onNextStep())
	}
	const getNextProduct = useCallback(() => {
		const product = selectedProductList?.find((p) => !mixedProducts.some((m) => m.product?.id === p.id))
		//	return mixIsCompleted ? false : product
		return product
	}, [mixedProducts])

	const onInvestmentChange = (field: keyof InitiateInvestmentType, value: any) => {
		setInitiateInvestmentData({ ...initiateInvestmentData, [field]: value })
	}

	useEffect(() => {
		const product = getNextProduct()
		if (product) setCurrentMixProduct({ product })
	}, [mixedProducts])

	// const currentMixInvestmentLimit = useMemo(
	// 	() =>
	// 		getInvestmentLimits({
	// 			currentMixProduct: currentMix,
	// 			mixedProducts,
	// 			totalAmount: initiateInvestmentData.totalInvestmentAmount,
	// 		}),
	// 	[currentMix, mixedProducts, initiateInvestmentData]
	// )

	const onSaveMix = (mixedProduct: InvestMentMixType) => {
		pushRoboNotice({ message: `${mixedProduct.product?.name} is saved` })
		// toast({
		// 	title: 'Success',
		// 	description: `${mixedProduct.product?.name} is saved`,
		// 	status: 'success',
		// 	position: 'top-right',
		// 	isClosable: true,
		// 	id: mixedProduct.product?.id,
		// })
		const mixExist = mixedProducts.some((mix) => mix.product?.id === mixedProduct.product?.id)
		console.log(mixedProduct.amountInvested)
		if (mixExist) {
			const updatedMix = mixedProducts.map((mix) => (mix.product?.id === mixedProduct.product?.id ? mixedProduct : mix))
			console.log(updatedMix)
			setMixedProducts([...updatedMix])
		} else {
			setMixedProducts([...mixedProducts, mixedProduct])
		}

		//	console.log(updatedMix)
		// setMixedProducts(updatedMix)
	}

	return (
		<InvestmentMixContext.Provider
			value={{
				mixedProducts,
				setCurrentMixProduct,
				initiateInvestmentData,
			}}
		>
			{/* @ts-ignore */}
			<Prompt
				size="sm"
				isOpen={!!mixId}
				title="Subscribe to Investment"
				description="Your investment Mix has been submitted, would you like to subscribe ?"
				//onClose={() => {}}
				closeOnOverlayClick
				action={{
					primary: {
						children: 'Pay Now',
						isLoading: investmentSubscription.isLoading,
						onClick: () =>
							investmentSubscription
								.mutateAsync({
									customer_investment_id: mixId,
									transaction_type: TransactionType.Subscription,
								})
								.then(({ data: { response_code, data } }) => {
									console.log(response_code)
									switch (response_code) {
										case 'S15':
											router.push(getProductPaymentUrl({ mixId, responseCode: response_code, ...data }))
											return
										case 'S39':
											router.push(
												getProductPaymentUrl({ mixId, nextStage: InvestmentSubscriptionStage.Kyc, responseCode: response_code, ...data })
											)
											break
										case 'E18':
											router.push(
												getProductPaymentUrl({ mixId, nextStage: InvestmentSubscriptionStage.Kyc, responseCode: response_code, ...data })
											)
										//onNextStep()
									}
								}),
					},
					secondary: { children: 'Pay Later', disabled: investmentSubscription.isLoading },
				}}
			/>

			<ProcessWrapper ReviewComponent={Review}>
				{/* {currentMix.product?.id && (
					<InvestmentMix
						isLoading={isLoading}
						onBack={() => setMixStage(MixStage.Initiate)}
						limit={currentMixInvestmentLimit}
						onSaveMix={onSaveMix}
						onContinue={mixIsCompleted ? handleSubmitInvestmentMix : undefined}
						mixProduct={currentMix}
					/>
				)} */}

				<IfElse ifOn={currentMix.product?.id}>
					{/* <ScrollView onBackwards={() => {}} onForward={() => {}}> */}
					<StackCard background={colors.white} spacing={6}>
						<Stack spacing={5} id="mix-container">
							<Stack>
								<Caption>
									Product {mixedProducts.length ? mixedProducts.length : 1} of {selectedProductList?.length}
								</Caption>
								<Progress
									colorScheme="green"
									size="sm"
									rounded="lg"
									value={(mixedProducts.length / selectedProductList?.length) * 100}
									isAnimated
								/>
							</Stack>
							<Caption alt>How much you are investing in &quot;{currentMix.product?.name}&quot; ?</Caption>

							<ProductSummaryCard products={currentMix.product as ProductType} />
						</Stack>

						<InvestmentMix
							isLoading={isLoading}
							onBack={() => setMixStage(MixStage.Initiate)}
							// limit={currentMixInvestmentLimit}
							onSaveMix={onSaveMix}
							onContinue={mixIsCompleted ? handleSubmitInvestmentMix : undefined}
							mixProduct={currentMix}
						/>
					</StackCard>
					{/* </ScrollView> */}
				</IfElse>
			</ProcessWrapper>
		</InvestmentMixContext.Provider>
	)
}

export default Mix
