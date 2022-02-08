import { Flex, SlideFade } from '@chakra-ui/react'
import StartPage from 'components/layout/components/start2/Page'
import useApiRequestEmailOrPhoneOtp from 'modules/hooks/otp/useApiValidateEmailOrPhoneOtp'
import useOnboardInitiateData from 'modules/account/hooks/useOnboardInitiateData'
import React, { useState } from 'react'
import VerifyAuth from './OtpAuth'
// import PromptUserType from './PromptUserType'
import SignupForm from './SignupForm'
import Success from './Success'
import { OtpRequestResponseType } from 'modules/hooks/otp/useApiRequestEmailOrPhoneOtp'

enum SignupStage {
	Prompt = 'Prompt',
	OTP = 'OTP',
	Initiate = 'Initiate',
	Success = 'Success',
}

export enum UserType {
	New = 'new',
	Existing = 'existing',
	Unset = 'unset',
}

const InitiateSignup = () => {
	const [signupStage, setSignupStage] = useState<SignupStage>(SignupStage.Initiate)
	const { email, phone_number } = useOnboardInitiateData()
	const [signupResponse, setSignupResponse] = useState()
	const validateOtp = useApiRequestEmailOrPhoneOtp()

	const handleAuthEmailOtp = (data: OtpRequestResponseType & { code?: string }) => {
		console.log(data, signupResponse)
		validateOtp.mutateAsync({ email, otp: data.code, reference: data.reference }).then(() => setSignupStage(SignupStage.Success))
	}

	return (
		<StartPage hasShadow>
			<Flex justify="space-evenly" flexDir={{ base: 'column', md: 'row' }} h={{ md: 'full', sm: 'full', base: 'auto' }}>
				<SlideFade unmountOnExit in={signupStage === SignupStage.Initiate}>
					<SignupForm
						setResponseData={setSignupResponse}
						onBack={() => setSignupStage(SignupStage.Prompt)}
						onSignup={() => setSignupStage(SignupStage.OTP)}
					/>
				</SlideFade>
				<SlideFade unmountOnExit in={signupStage === SignupStage.Success}>
					<Success />
				</SlideFade>
				<SlideFade unmountOnExit in={signupStage === SignupStage.OTP}>
					<VerifyAuth
						isLoading={validateOtp.isLoading}
						recipient={{ email, phoneNumber: phone_number }}
						onBack={() => setSignupStage(SignupStage.Initiate)}
						onSubmit={handleAuthEmailOtp}
					/>
				</SlideFade>
			</Flex>
		</StartPage>
	)
}

export default InitiateSignup
