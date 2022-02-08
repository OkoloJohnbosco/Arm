import React from 'react'
import { Box, Flex, Spacer, Image, BoxProps, VStack, HStack } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import IfElse from 'components/if-else'
import NotificationBadge from '../NotificationBadge'
import Mini from 'components/typography/Mini'
import ArmLogo from 'modules/svg/ArmLogo.svg'

export type StartHeaderProps = {
	hasShadow?: boolean
	online?: boolean
} & BoxProps

const Header = ({ online = false, hasShadow, ...others }: StartHeaderProps) => {
	return (
		<Box bg={colors['neutral-20']} zIndex={2} shadow={hasShadow ? 'B20' : 'none'} {...others}>
			<Flex width="90%" margin="auto" py={4}>
				<Box>
					<ArmLogo />
					{/* <Image src="/img/arm-logo.png" height={8} objectFit="cover" alt="arm logo" /> */}
					<IfElse ifOn={online}>
						<HStack>
							<Box boxSize={2} rounded="full" bg={colors.green} />
							<Mini alt>online</Mini>
						</HStack>
					</IfElse>
				</Box>
				<Spacer />
				<Flex sx={{ gap: '1rem' }} flexDirection={{ sm: 'row', md: 'row' }} flexWrap="wrap" justify="flex-end">
					<Box textAlign="right">
						<Flex ml={2} wrap="wrap" justify="flex-end" lineHeight={0}>
							<Small variant="semibold12">Need help?</Small> &nbsp;
							<Small variant="semibold12">Call +234 813 2348 901</Small>
						</Flex>
						<Small variant="semibold12">From 9am - 5pm Mon - Fri</Small>
					</Box>
					<NotificationBadge />
				</Flex>
			</Flex>
		</Box>
	)
}

export default Header
