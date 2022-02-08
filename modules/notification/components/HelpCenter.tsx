import React from 'react'
import { Box, Stack, IconButton } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Icon from 'components/icon'
import { IconType } from 'react-icons/lib'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdModeEdit, MdGroupWork } from 'react-icons/md'
import { CgEditNoise } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { PAGES } from 'constant'

type HelpCenterProps = {
	bg: string
	color: string
	text: string
	path?: string
	icon: IconType
}

export const helpProps = [
	{ bg: 'rgba(48, 119, 255, 0.1)', color: 'rgba(48, 119, 255, 1)', text: 'Manage Account', icon: MdModeEdit, path: PAGES.DASHBOARD.SETTINGS },
	{ bg: 'rgba(98, 54, 255, 0.1)', color: '#6236FF', text: 'Contact RM', icon: FaPhoneAlt },
	{ bg: 'rgba(255, 171, 0, 0.1)', color: 'rgba(255, 171, 0, 1)', text: 'Help Center', icon: MdGroupWork },
	{ bg: 'rgba(255, 86, 48, 0.1)', color: 'rgba(255, 86, 48, 1)', text: 'Log out', icon: CgEditNoise },
]

function HelpCenter({ bg, color, text, icon, path }: HelpCenterProps) {
	const router = useRouter()
	return (
		<Stack spacing={2} alignItems="center" minW="110px">
			<IconButton aria-label="close button" size="md" onClick={() => path && router.push(path)} rounded="full" bg={bg} color={color}>
				<Icon iconComp={icon} boxSize={5} />
			</IconButton>
			<Box>
				<Body variant="regular13" color="neutral.200">
					{text}
				</Body>
			</Box>
		</Stack>
	)
}

export default HelpCenter
