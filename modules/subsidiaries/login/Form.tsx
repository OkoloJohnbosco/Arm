import { Box, Flex, Stack } from '@chakra-ui/react'
import Back from 'components/navigation'
import { Button } from 'components/button'
import { StackCard } from 'components/card'
import IfElse from 'components/if-else'
import Input from 'components/input'
import Link from 'components/link'
import Body from 'components/typography/Body'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import useMainState from 'lib/hooks/useMainState'
import { LoginAuthPropType, LoginField, PassportAuthType, SignupField, SubsidiaryType } from 'modules/account/types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useAddAccount from '../../account/hooks/useAuthSubsidiary'
import useAuthLogin from '../../account/hooks/useAuthLogin'
import Success from './LoginSuccess'
import BackWrapper from 'components/navigation/BackWrapper'

enum Fields {
	identifier = 'identifier',
	password = 'password',
	subsidiaryId = 'subsidiary_id',
}

type SubSidiaryAuthProps = {
	subsidiary: SubsidiaryType
	setSubsidiary: (subsidiary?: SubsidiaryType) => void
}

const SubsidiaryAuthForm = (props: SubSidiaryAuthProps) => {
	const [authData, setAuthData] = useState<Record<Fields, string>>({ identifier: '', password: '', subsidiary_id: props.subsidiary.id.toString() })
	const { mutateAsync, isLoading } = useAddAccount()
	const [passportAuth, setPassportAuth] = useState<PassportAuthType>()

	const router = useRouter()

	// const otpRequest = useOTPRequest()
	const { serverErrors } = useMainState()

	const onChange = (event) => {
		const fieldName = event.target.name as Fields
		let value = event.target.value
		setAuthData({ ...authData, [fieldName]: value })
	}
	const onSubmit = (event) => {
		event.preventDefault()
		mutateAsync(authData)
			// .then(() => {})
			.then(({ data }) => {
				//@ts-ignore
				setPassportAuth(data?.data)
			})
	}
	return (
		<IfElse ifOn={!passportAuth} elseThen={<Success auth={passportAuth} subsidiary={props} />}>
			<BackWrapper onClick={() => props.setSubsidiary()}>
				<Stack spacing={8} as="form" onSubmit={onSubmit} w="inherit" justify="space-between" h="full">
					<Stack>
						<Heading>Add {props.subsidiary.name} Account</Heading>
						<Body color="primary" variant="regular13">
							Kindly fill in your details to sign into your account
						</Body>
					</Stack>
					<Stack>
						<Input
							isRequired
							placeholder="Email Address | Member ID"
							title="Email Address | Member ID"
							value={authData?.identifier}
							name={Fields.identifier}
							onChange={onChange}
						/>

						<Input
							isRequired
							placeholder="password"
							type="password"
							title="Enter your password"
							value={authData.password}
							name={Fields.password}
							onChange={onChange}
							error={serverErrors[SignupField.Email]}
						/>
						<Flex justify="space-between" align="center">
							<Flex align="center" wrap="wrap">
								<Small color="neutral-500">Forgot password ?</Small> &nbsp;
								<Link href={PAGES.RESET_PASSWORD}>Recover account</Link>
							</Flex>
						</Flex>
					</Stack>

					<Button isLoading={isLoading} w="full" looks="primary" type="submit">
						Login
					</Button>
				</Stack>
			</BackWrapper>
		</IfElse>
	)
}

export default SubsidiaryAuthForm
