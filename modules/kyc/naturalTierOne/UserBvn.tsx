import { Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import StackCard from 'components/card/StackCard'
import Input from 'components/input'
import Modal from 'components/modal'
import { OTPForm } from 'components/otp'
import Caption from 'components/typography/Caption'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import useKycContext from 'modules/hooks/kyc/useKycContext'
import React, { useState } from 'react'
import { RiBankLine } from 'react-icons/ri'
import usePostBvn, { useValidateBvn } from '../../hooks/useApiSetBvn'
import { KycProps } from '../type'

enum Field {
	Bvn = 'bvn',
}
const UserBvn = ({ controller, onComplete: onCompleteStage }: KycProps) => {
	const { mutateAsync, isLoading } = usePostBvn()
	const validateBvn = useValidateBvn()
	const [bvn, setBvn] = useState('')
	const [promptOtp, setPromptOtp] = useState(false)
	const stage = controller.getPendingStage()
	const { refetchKyc } = useKycContext()
	const handleSubmitBvn = (event) => {
		event.preventDefault()
		mutateAsync({ bvn, unique_id: stage?.unique_id }).then(({ data }) => {
			switch (data.response_code) {
				case 'S26':
					setPromptOtp(true)
					break
				case 'S59':
					refetchKyc()
			}
		})
		//props.onComplete()
		// initiateInvestmentData && onComplete(initiateInvestmentData)
	}

	return (
		<>
			<Modal closeOnOverlayClick={false} isOpen={promptOtp} onClose={() => setPromptOtp(false)}>
				<OTPForm
					description="Please Enter the OTP sent to the BVN registered number"
					isLoading={validateBvn.isLoading}
					onSubmit={({ code }) => {
						validateBvn
							.mutateAsync({ bvn, otp: code })
							.then(({ data }) => {
								if (data.response_code === 'S30') {
									//success
									setPromptOtp(false)
									onCompleteStage()
								}
							})
							.then(refetchKyc)
					}}
				/>
			</Modal>
			<StackCard
				onSubmit={handleSubmitBvn}
				background={colors.white}
				spacing={8}
				as="form"
				flex={6}
				p="0"

				//	px={{ md: 8, base: 4 }}
			>
				<Caption alt textAlign="center">
					{stage?.stage.name}
				</Caption>
				<Stack>
					<Caption alt>{`${stage?.first_name} ${stage?.last_name}`}</Caption>
					<Small alt> Please answer a few more questions for me</Small>
				</Stack>

				<Input
					name={Field.Bvn}
					type="number"
					isRequired
					onChange={({ target }) => setBvn(target.value)}
					icon={{ iconComp: RiBankLine }}
					title="Bank Verification Number"
				/>

				<Button type="submit" looks="primary" isLoading={isLoading}>
					Submit
				</Button>
			</StackCard>
		</>
	)
}

export default UserBvn
