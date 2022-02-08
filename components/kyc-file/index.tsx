import { Box, Stack, HStack } from '@chakra-ui/react'
import React from 'react'
import Icon from 'components/icon'
import { FaFileAlt } from 'react-icons/fa'
import Body from 'components/typography/Body'
import { BsClock } from 'react-icons/bs'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdDoneAll } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

type KycFileProps = {
	status: 'pending' | 'verified' | 'declined' | 'none'
	title?: string
	onClick: () => void
}

interface StatusProp {
	icon: IconType
	color: string
	bg: string
}

const showStatus: Record<KycFileProps['status'], StatusProp> = {
	verified: { icon: MdDoneAll, color: '#fff', bg: '#00875A' },
	pending: { icon: BsClock, color: '#FF8B00', bg: '#FFE380' },
	declined: { icon: IoMdCloseCircleOutline, color: '#BF2600', bg: '#FFBDAD' },
	none: { icon: BsClock, color: '#4C473D', bg: '#D3CAC2' },
}

const KycFile = ({ status, title, onClick }: KycFileProps) => {
	return (
		<Box w="full" p={0} onClick={onClick} overflow="hidden" rounded={10} border="1px solid #D391AF88" cursor="pointer">
			<Stack h="130px" alignItems="center" bg={{ base: '#fff', md: 'transparent' }} w="full" justify="center" border="1px solid claret.500">
				<Icon boxSize={20} p={2} color="#8E144B" iconComp={FaFileAlt} />
			</Stack>
			<HStack h="90px" px={3} bg="#000" color="#eee" alignItems="center" justify="space-between">
				<Stack spacing={1}>
					<Body variant="regular14" fontWeight="bold">
						{title}
					</Body>
					<Body variant="regular12" textTransform="capitalize">
						{status === 'none' ? 'Not Submitted' : status}
					</Body>
				</Stack>
				<Icon rounded="full" p={1} boxSize={6} color={showStatus[status].color} bg={showStatus[status].bg} iconComp={showStatus[status].icon} />
			</HStack>
		</Box>
	)
}

export default KycFile
