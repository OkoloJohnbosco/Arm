import { Flex, VStack } from '@chakra-ui/layout'
import { Box, Stack } from '@chakra-ui/react'
import { StackCard } from 'components/card'
import Heading from 'components/typography/Heading'
import Small from 'components/typography/Small'
import React, { useMemo, useState } from 'react'
import { Button } from 'components/button'
import { colors } from 'lib/theme'
import { BsArrowRight } from 'react-icons/bs'
import { hexToRGBA2 } from 'utils/helpers'
import { useRouter } from 'next/router'
import { PAGES } from 'constant'
import BackWrapper from 'components/navigation/BackWrapper'
import IfElse from 'components/if-else'
import { getLogin } from 'modules/account/helper'
import Caption from 'components/typography/Caption'
import StartPage from 'components/layout/components/start/Page'

const OnboardingWrapper = (props: { children?: any }) => {
	const router = useRouter()
	const onboardingRemainingStages = useMemo(() => getLogin()?.login?.onboarding?.stages, [])
	const isHovered = true
	return (
		// <StartPage dropShadow>
		<IfElse ifOn={false && onboardingRemainingStages?.length} elseThen={props.children}>
			<VStack
				spacing={8}
				//mt={{ base: 6, md: '24' }}
				p={4}
			>
				<VStack spacing={10}>
					<Heading textAlign={{ base: 'center' }}>Please Complete your Onboarding</Heading>
					<Stack spacing={8} direction={{ base: 'column', md: 'row' }} w="full">
						{onboardingRemainingStages?.map((stage, key) => (
							<StackCard
								key={key}
								shadow="sm"
								align="center"
								spacing={4}
								_hover={{ bg: hexToRGBA2('yellow-200', 0.2), shadow: 'md', border: `1px solid ${colors['orange-200']}` }}
								border={isHovered ? `1px solid ${hexToRGBA2('orange-200', 0.2)}` : '1px solid white'}
								bg={isHovered ? hexToRGBA2('yellow-200', 0.2) : 'white'}
								cursor="pointer"
								transition=" all .3s ease-in-out"
							>
								<Flex rounded="full" boxSize={12} align="center" justify="center" background={colors['yellow-100']}>
									<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 22">
										<defs />
										<path
											fill="#000"
											d="M8 13v8H0c0-2.1217.842855-4.1566 2.34315-5.6569C3.84344 13.8429 5.87827 13 8 13zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9.446 7.032l1.504 1.504-1.414 1.414-1.504-1.504c-.8387.4945-1.8289.6661-2.785.4828-.9562-.1834-1.8127-.7092-2.4089-1.4789-.5962-.7697-.89122-1.7304-.8298-2.702.0615-.9717.4752-1.8875 1.1636-2.576.6885-.6884 1.6043-1.1021 2.576-1.1636.9716-.0614 1.9323.2336 2.702.8298s1.2955 1.4527 1.4789 2.4089c.1833.9561.0117 1.9463-.4828 2.785zM14 19c.5304 0 1.0391-.2107 1.4142-.5858S16 17.5304 16 17c0-.5304-.2107-1.0391-.5858-1.4142S14.5304 15 14 15c-.5304 0-1.0391.2107-1.4142.5858S12 16.4696 12 17c0 .5304.2107 1.0391.5858 1.4142S13.4696 19 14 19z"
										/>
									</svg>
								</Flex>
								<Caption>{stage.name}</Caption>
								<Small alt>I am not Holding Account with ARM</Small>
							</StackCard>
						))}
						{/* <StackCard
								shadow="md"
								align="center"
								spacing={4}
								_hover={{ bg: hexToRGBA2('yellow-200', 0.2), shadow: 'sm', border: `1px solid ${hexToRGBA2('orange-200', 0.5)}` }}
								// border={userType === UserType.New ? `1px solid ${colors['orange-200']}` : '1px solid white'}
								bg={true ? hexToRGBA2('yellow-200', 0.2) : 'white'}
								cursor="pointer"
								transition=" all .3s ease-in-out"
							>
								<Flex rounded="full" boxSize={12} align="center" justify="center" background={colors['yellow-100']}>
									<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 22">
										<defs />
										<path
											fill="#000"
											d="M8 13v8H0c0-2.1217.842855-4.1566 2.34315-5.6569C3.84344 13.8429 5.87827 13 8 13zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9.446 7.032l1.504 1.504-1.414 1.414-1.504-1.504c-.8387.4945-1.8289.6661-2.785.4828-.9562-.1834-1.8127-.7092-2.4089-1.4789-.5962-.7697-.89122-1.7304-.8298-2.702.0615-.9717.4752-1.8875 1.1636-2.576.6885-.6884 1.6043-1.1021 2.576-1.1636.9716-.0614 1.9323.2336 2.702.8298s1.2955 1.4527 1.4789 2.4089c.1833.9561.0117 1.9463-.4828 2.785zM14 19c.5304 0 1.0391-.2107 1.4142-.5858S16 17.5304 16 17c0-.5304-.2107-1.0391-.5858-1.4142S14.5304 15 14 15c-.5304 0-1.0391.2107-1.4142.5858S12 16.4696 12 17c0 .5304.2107 1.0391.5858 1.4142S13.4696 19 14 19z"
										/>
									</svg>
								</Flex>
								<Heading variant="h3">No, I dont</Heading>
								<Small alt>I am not Holding Account with ARM</Small>
							</StackCard> */}
						{/* <StackCard
								shadow="md"
								responsive={false}
								align="center"
								_hover={{ bg: hexToRGBA2('green-200', 0.3), shadow: 'sm', border: `1px solid ${hexToRGBA2('grey-500', 0.5)}` }}
								// border={userType === UserType.Existing ?  : '1px solid white'}
								// bg={userType === UserType.Existing ? hexToRGBA2('green-200', 0.3) : 'white'}
								spacing={4}
								cursor="pointer"
								transition="all .3s ease-in-out"
								onClick={() => {
									//	setUserType(UserType.Existing)
									router.push(PAGES.ACCOUNT_MANAGE_SUBSIDIARIES)
								}}
							>
								<Flex align="center" justify="center" boxSize={12} rounded="full" bg={colors['green-100']}>
									<svg width={24} height={24} viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M13.841 14.659L14.017 14.836L14.195 14.659C14.4039 14.4501 14.652 14.2843 14.925 14.1713C15.1979 14.0582 15.4905 14 15.786 14C16.0815 14 16.3741 14.0582 16.647 14.1713C16.92 14.2843 17.1681 14.4501 17.377 14.659C17.5859 14.8679 17.7517 15.116 17.8647 15.389C17.9778 15.6619 18.036 15.9545 18.036 16.25C18.036 16.5455 17.9778 16.8381 17.8647 17.111C17.7517 17.384 17.5859 17.6321 17.377 17.841L14.017 21.2L10.659 17.841C10.237 17.419 9.99999 16.8467 9.99999 16.25C9.99999 15.6533 10.237 15.081 10.659 14.659C11.081 14.237 11.6533 14 12.25 14C12.8467 14 13.419 14.237 13.841 14.659ZM8 13V21H0C2.41087e-05 18.9216 0.808937 16.9247 2.25547 15.4323C3.702 13.9398 5.67259 13.069 7.75 13.004L8 13ZM8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0Z"
											fill="black"
										/>
									</svg>
								</Flex>
								<Heading variant="h3">Yes, I do</Heading>
								<Small alt>Yes, I Hold an Account with ARM</Small>
							</StackCard> */}
					</Stack>
				</VStack>

				{/* <Button
				onClick={() => props.setUserType(userType)}
				w={{ base: 'full', md: 'xs' }}
				looks="primary"
				rightIcon={<BsArrowRight />}
				isDisabled={userType === UserType.Unset}
			>
				Continue
			</Button> */}
			</VStack>
		</IfElse>
		// </StartPage>
	)
}

export default OnboardingWrapper
