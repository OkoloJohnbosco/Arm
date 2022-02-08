import { Box, Flex } from '@chakra-ui/react'
// import Divider from 'components/divider'
import IfElse from 'components/if-else'
// import LeftBanner from 'components/layout/components/start/StartHero2'
// import StartPage from 'components/layout/components/start/Page'
import StartPage2 from 'components/layout/components/start2/Page'
// import RiskAssessmentPrompt from 'components/layout/components/start/RiskAssessmentFooter'
import React, { useState } from 'react'
import LoginForm from './LoginAuthForm'
import LoginSuccess from './LoginSuccess'

// import Modal from 'components/modal'

const Login = () => {
	const [hasLogin, setHasLogin] = useState(false)

	return (
		<StartPage2>
			{/* <IfElse ifOn={false} elseThen={<Modal size='md' padded={false} isOpen><Welcome/></Modal>}> */}

			<Flex
				align="center"
				h={{ base: 'full', md: 'full' }}
				//minH="calc(100vh - 5rem)"
				justify="space-evenly"
				//	flexDir={{ base: 'column', md: 'row' }}
			>
				<IfElse ifOn={!hasLogin} elseThen={<LoginSuccess />}>
					<LoginForm
						onLogin={() => {
							setHasLogin(true)
						}}
					/>
				</IfElse>
			</Flex>

			{/* </IfElse> */}
		</StartPage2>
	)
}

export default Login
