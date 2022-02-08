import { useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import BackWrapper from 'components/navigation/BackWrapper'
import { OTPForm } from 'components/otp'
import SubHeading from 'components/typography/SubHeading'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import { hexToRGBA3 } from 'lib/theme/color'
import useUser from 'modules/account/hooks/useUser'
import React, { useEffect, useMemo, useState } from 'react'
import AddFund from './AddFundForm'
import FundSucess from './AddFundSucess'
import { FundStepNameType, FundStepType } from './type'
import Payment from 'modules/payment'
import { ProductInvestmentType } from 'modules/account/types'
import useInvestedProducts from 'modules/hooks/investment/useApiListInvestmentsDetails'
import { OptionType } from 'components/input/select'
import { fundSteps } from './config'
import AuthOtp from 'components/otp/AuthOtp'
import useApiListInvestments from 'modules/hooks/investment/useApiListInvestments'
import { FundInvestmentResponseType } from 'modules/hooks/investment/useApiCreateInvestmentFund'

type Props = {
	investmentId?: number | string
	isOpen?: boolean
	onClose: () => void
	enableAmount?: boolean
	enableInvestment?: boolean
}

const AddFundDrawer = ({ investmentId, onClose, isOpen, enableAmount = true, enableInvestment = true }: Props) => {
	const [fundStep, setFundStep] = useState<FundStepType>(fundSteps[0])
	const [amount, setAmount] = useState<number>(1)
	const [investment, setInvestment] = useState<ProductInvestmentType>()
	const [fundInvestment, setFundInvestment] = useState<FundInvestmentResponseType>()
	const investedProducts = useApiListInvestments()

	//  const investmentOptions: Array<{ value: any; option: ProductInvestmentType; label: any }> | undefined = useMemo(
	//  	() =>
	//  		investedProducts.value?.customer_businesses.reduce(
	//  			//@ts-ignore
	//  			(accum, business) => {
	//  				const businessProducts = business.products.map((p) => ({ value: p.id, label: p.name, option: p }))
	//  				return [...accum, ...businessProducts]
	//  			},
	//  			[]
	//  		),

	//  	[investedProducts.value]
	//  )
	const investmentOptions = useMemo(() => investedProducts.value?.map((p) => ({ value: p.id, label: p.name, option: p })), [investedProducts.value])

	useEffect(() => {
		if (investmentOptions?.length) {
			const addFund = investmentOptions?.find((investment) => investment?.option.id == investmentId)
			setInvestment(addFund?.option)
		}
	}, [investmentOptions?.length])

	const onChangeStep = (step: FundStepNameType) => {
		const found = fundSteps.find((s) => s.step === step) as FundStepType
		setFundStep(found)
	}

	const handleClose = () => {
		onClose()
		onChangeStep(FundStepNameType.Initiate)
	}

	return (
		<Drawer closeOnOverlayClick={false} size="sm" isOpen={!!isOpen} placement="right" onClose={handleClose}>
			<DrawerOverlay background={hexToRGBA3('claret', 100, 0.4)} />
			<DrawerContent>
				<DrawerCloseButton background="claret.500" boxSize="6" rounded="full" color="neutral.0" />

				<DrawerBody mt="10">
					{fundStep.step === FundStepNameType.Initiate && (
						<AddFund
							step={fundStep}
							amount={{
								value: amount,
								onChange: setAmount,
								enabled: enableAmount,
							}}
							investmentOptions={investmentOptions}
							investment={{
								value: investment,
								onChange: setInvestment,
								enabled: enableInvestment,
							}}
							//	investmentId={investmentId}
							onComplete={(data: FundInvestmentResponseType) => {
								setFundInvestment(data)
								onChangeStep(FundStepNameType.Payment)
							}}
						/>
					)}
					{fundStep.step === FundStepNameType.Payment && (
						<BackWrapper onClick={() => onChangeStep(FundStepNameType.Initiate)}>
							<Payment
								reference={fundInvestment?.investment_subscription.transaction_reference}
								onComplete={(data) => {
									onChangeStep(FundStepNameType.Complete)
								}}
							/>
						</BackWrapper>
					)}
					{fundStep.step === FundStepNameType.Auth && (
						<BackWrapper onClick={() => onChangeStep(FundStepNameType.Payment)}>
							<AuthOtp
								onSubmit={({ otp, reference }) => onChangeStep(FundStepNameType.Complete)}
								// useOTP={{
								// 	phoneNumber,
								// }}
								size={5}
								title="Verify Transaction"
								description="Kindly provide verification code sent to your phone number"
							/>
						</BackWrapper>
					)}
					{fundStep.step === FundStepNameType.Complete && <FundSucess onClose={handleClose} />}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default AddFundDrawer
