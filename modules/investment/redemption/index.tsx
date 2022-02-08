import { useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import BackWrapper from 'components/navigation/BackWrapper'
import { OptionType } from 'components/input/select'
import { OTPForm } from 'components/otp'
import AuthOtp from 'components/otp/AuthOtp'
import SubHeading from 'components/typography/SubHeading'
import { useNextQueryParam } from 'lib/hooks/useNextQueryParam'
import { hexToRGBA3 } from 'lib/theme/color'
import useInvestedProducts from 'modules/hooks/investment/useApiListInvestmentsDetails'
import useUser from 'modules/account/hooks/useUser'
import { ProductInvestmentType } from 'modules/account/types'
import useApiCreateRedemption from 'modules/hooks/investment/useApiCreateRedemption'
import useApiListTransactionPurposes, { TransactionReasonType } from 'modules/hooks/useApiListTransactionPurposes'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import Redemption from './RedemptionForm'
import RedemptionSucess from './RedemptionSucess'

interface Props {
	investmentId?: number | string
	onClose: () => void
	isOpen?: boolean
	enableAmount?: boolean
	enableInvestment?: boolean
}

enum RedemptionStage {
	Beneficiary = 'Beneficiary',
	Auth = 'Auth',
	Complete = 'Complete',
}
const RedemptionDrawer = ({ investmentId, onClose, isOpen, enableAmount = true, enableInvestment = true }: Props) => {
	const [redemptionStage, setRedemptionStage] = useState<RedemptionStage>(RedemptionStage.Beneficiary)
	const [redemptionAmount, setRedemptionAmount] = useState(1)
	const [redemptionInvestment, setRedemptionInvestment] = useState<ProductInvestmentType>()
	const [redemptionPurpose, setRedemptionPurpose] = useState<OptionType<TransactionReasonType>>()
	const [redemptionNarration, setRedemptionNarration] = useState('')
	const [otherReason, setOtherReason] = useState('')
	const { value } = useInvestedProducts()
	const addRedemption = useApiCreateRedemption()

	//@ts-ignore
	const investmentOptions: Array<{ value: any; option: ProductInvestmentType; label: any }> | undefined = useMemo(
		() =>
			value?.customer_businesses.reduce(
				//@ts-ignore
				(accum, business) => {
					const businessProducts = business.products.map((p) => ({ value: p.id, label: p.name, option: p }))
					return [...accum, ...businessProducts]
				},
				[]
			),
		[value]
	)

	const investment = useMemo(() => {
		for (const business of value?.customer_businesses || []) {
			const found = business.products.find((p) => p.id == investmentId)
			if (found) return found
		}
	}, [value])

	const handleClose = () => {
		onClose()
		setRedemptionStage(RedemptionStage.Beneficiary)
	}

	useEffect(() => {
		setRedemptionInvestment(investment)
	}, [investment])

	return (
		<Drawer closeOnOverlayClick={false} size="sm" isOpen={!!isOpen} placement="right" onClose={handleClose}>
			<DrawerOverlay background={hexToRGBA3('claret', 100, 0.4)} />
			<DrawerContent>
				<DrawerCloseButton background="claret.500" boxSize="6" rounded="full" color="neutral.0" />

				<DrawerBody mt="10" px="6">
					{redemptionStage === RedemptionStage.Beneficiary && (
						<Redemption
							investmentOptions={investmentOptions}
							amount={{
								enabled: enableAmount,
								onChange: setRedemptionAmount,
								value: redemptionAmount,
							}}
							redemptionPurpose={{
								otherReason,
								setOtherReason,
								value: redemptionPurpose,
								onChange: setRedemptionPurpose,
							}}
							redemptionNarration={{
								value: redemptionNarration,
								onChange: setRedemptionNarration,
							}}
							investment={{
								enabled: enableInvestment,
								onChange: setRedemptionInvestment,
								value: redemptionInvestment,
							}}
							onComplete={() => setRedemptionStage(RedemptionStage.Auth)}
						/>
					)}
					{redemptionStage === RedemptionStage.Auth && (
						<BackWrapper onClick={() => setRedemptionStage(RedemptionStage.Beneficiary)}>
							<AuthOtp
								onSubmit={(otp) => {
									addRedemption
										.mutateAsync({
											reason: redemptionPurpose?.value as any,
											other_reason: otherReason,
											products: {
												product_id: redemptionInvestment?.id as number,
												amount: Number(redemptionAmount),
											},
											otp: {
												code: otp.otp,
												reference: otp.reference,
											},
										})
										.then(() => setRedemptionStage(RedemptionStage.Complete))
								}}
								size={6}
								title="Verify Transaction"
								description="Kindly provide verification code sent to your phone number"
							/>
						</BackWrapper>
					)}
					{redemptionStage === RedemptionStage.Complete && <RedemptionSucess onClose={handleClose} />}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default RedemptionDrawer
