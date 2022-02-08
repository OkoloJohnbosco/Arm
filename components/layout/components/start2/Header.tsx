import React from 'react'
import { Box, Flex, Spacer, Image, BoxProps, VStack, HStack } from '@chakra-ui/react'
import { colors } from 'lib/theme'
import Body from 'components/typography/Body'
import Small from 'components/typography/Small'
import IfElse from 'components/if-else'
import ArmLogo from 'modules/svg/ArmLogo.svg'

export type StartHeaderProps = {
	hasShadow?: boolean
	online?: boolean
} & BoxProps

const Header = ({ online = false, hasShadow, ...others }: StartHeaderProps) => {
	return (
		<Box position={hasShadow ? 'fixed' : 'static'} left={0} right={0} bg="#fff" zIndex={2} shadow="B20" {...others}>
			<Flex
				width="85%"
				margin="auto"
				py={4}
				wrap="wrap"
				sx={{ gap: '1rem' }}
				justify="space-between"
				// h={{ base: '60px', md: '80px' }}
			>
				<Box>
					<ArmLogo />

					<IfElse ifOn={online}>
						<HStack>
							<Box boxSize={2} rounded="full" bg={colors.green} />
							<Body variant="semibold12" textTransform="uppercase">
								Online
							</Body>
						</HStack>
					</IfElse>
				</Box>

				<Box>
					<Body variant="semibold12" color="neutral-500">
						Need help? Call +234 813 2348 901
					</Body>
					<Small variant="semibold12" color="neutral-500">
						From 9am - 5pm Mon - Fri
					</Small>
				</Box>
			</Flex>
		</Box>
	)
}

export default Header
