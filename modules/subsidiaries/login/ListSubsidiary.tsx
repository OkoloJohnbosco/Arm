import React, { createRef, useEffect, useRef, useState } from 'react'
import { Avatar, Box, Flex, Image, Stack, Tooltip, useOutsideClick, VStack } from '@chakra-ui/react'
import LeftBanner from '../../../components/layout/components/start/StartHero2'
import Divider from 'components/divider'
import { Button } from 'components/button'

import Link from 'next/link'
import StartPage from 'components/layout/components/start/Page'
import { PAGES, PATHS } from 'constant'
import RiskAssessmentPrompt from 'components/layout/components/start/RiskAssessmentFooter'
import Heading from 'components/typography/Heading'
import Caption from 'components/typography/Caption'
import { armSubsidiaries } from '../config'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import { SubsidiaryType } from '../../account/types'
import useClickOutside2 from 'lib/hooks/useClickOutside2'
import ArrowLinkText from 'components/link/ArrowLink'
import { useSubsidiaries, useUsersSubsidiaries } from '../useListSubsidiary'
import IfElse from 'components/if-else'
import LoadingSpinner from 'components/animations/loadingSpinner'
import BackWrapper from 'components/navigation/BackWrapper'
import truncate from 'lodash/truncate'
import SubHeading from 'components/typography/SubHeading'
import { BiCheckShield } from 'react-icons/bi'

type SubsidiaryPageProps = {
	setSubsidiary: (props?: SubsidiaryType) => void
}

const ListSubsidiary = (props: SubsidiaryPageProps) => {
	const targetRef = useRef<any>()
	const outsideClicked = useClickOutside2({ targetRef })
	const [selectedBeneficiary, setSelectedBeneficiary] = useState<SubsidiaryType>()
	const subsidiaries = useUsersSubsidiaries() // useSubsidiaries()

	console.log(subsidiaries.value)
	useEffect(() => {
		if (outsideClicked) setSelectedBeneficiary(undefined)
	}, [outsideClicked])
	return (
		<BackWrapper>
			<Stack spacing={8} h="full" justify="space-between">
				<Stack>
					<SubHeading>Manage your ARM accounts</SubHeading>
					<Small>
						You can now manage all your ARM accounts from this app. Kindly select the accounts you currently hold below to authorise access.
					</Small>
				</Stack>
				<Box>
					<IfElse
						ifOn={subsidiaries.value?.customer_subsidiaries.length}
						elseThen={
							<Flex align="center" justify="center">
								<LoadingSpinner />
							</Flex>
						}
					>
						{subsidiaries.value?.customer_subsidiaries.map((item) => {
							const isAuth = item.is_authenticated
							return (
								<Tooltip label={item.description}>
									<Flex
										position="relative"
										ref={targetRef}
										onClick={() => !isAuth && setSelectedBeneficiary(item)}
										cursor={isAuth ? 'not-allowed' : 'pointer'}
										bg={selectedBeneficiary?.id === item.id ? 'claret.75' : 'none'}
										color={selectedBeneficiary?.id === item.id ? 'white' : 'none'}
										rounded="sm"
										align="center"
										py={2}
										px={1}
										transition="transform 0.3s ease-in-out"
										_hover={{
											transform: !isAuth && 'translateX(2px)',
										}}
									>
										<Avatar src={item.icon_url} size="sm" mr={'10px'} />
										<Box>
											<Caption color={isAuth ? 'gray.500' : 'inherit'}>{item.name}</Caption>

											<Small
												color={isAuth ? 'green.300' : selectedBeneficiary?.id === item.id ? 'inherit' : 'none'}
												variant={isAuth ? 'semibold12' : selectedBeneficiary?.id === item.id ? 'semibold12' : 'regular12'}
											>
												{truncate(item.description, { separator: ' ', length: 48 })}
											</Small>
										</Box>
										<Box visibility={isAuth ? 'visible' : 'hidden'} color="green.300" right="1%" position="absolute" top="50%">
											<BiCheckShield />
										</Box>
									</Flex>
								</Tooltip>
							)
						})}
					</IfElse>
				</Box>

				<Button disabled={!selectedBeneficiary} looks="primary" onClick={() => props.setSubsidiary(selectedBeneficiary)}>
					Continue
				</Button>
			</Stack>
		</BackWrapper>
	)
}

export default ListSubsidiary
