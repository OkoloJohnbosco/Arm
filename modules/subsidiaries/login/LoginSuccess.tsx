import { Box, Stack } from '@chakra-ui/react'
import { Button } from 'components/button'
import SpinningSuccess from 'components/animations/successSpinner'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import { PAGES } from 'constant'
import { PassportAuthType, SubsidiaryType } from 'modules/account/types'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type Props = {
	subsidiary: SubsidiaryType
	setSubsidiary: (subsidiary?: SubsidiaryType) => void
}

const LoginSuccess = ({ auth, subsidiary: { subsidiary } }: { auth?: PassportAuthType; subsidiary: Props }) => {
	const router = useRouter()

	return (
		<Stack spacing={12} textAlign="center" h="full" align="center">
			<Box>
				<SpinningSuccess />
			</Box>
			<Stack>
				<Heading>That was Succesful</Heading>
				<Small color="neutral-500" alt w={{ base: 'full', md: '40ch' }}>
					You have Succesfuly signed into your {subsidiary.name} account.
				</Small>
			</Stack>

			<Button w="full" looks="primary" href={PAGES.USER_PRODUCTS}>
				Alright, Continue
			</Button>
		</Stack>
	)
}

export default LoginSuccess
