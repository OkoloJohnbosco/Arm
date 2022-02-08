import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import { hexToRGBA3 } from 'lib/theme/color'
import React from 'react'

type Props = {
	enabled?: boolean
	enableMode?: 'lazy' | 'eager' | 'persistent'
	children?: any
	amount?: number
	onClose: () => void
}
const InvestmentPrintStatementDrawer = (props: Props) => {
	return (
		<Drawer size="sm" isOpen={!!props.enabled} placement="right" onClose={props.onClose}>
			<DrawerOverlay background={hexToRGBA3('claret', 100, 0.4)} />
			<DrawerContent>
				<DrawerCloseButton background="claret.500" boxSize="6" rounded="full" color="neutral.0" />

				<DrawerBody mt="10">{props.children}</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default InvestmentPrintStatementDrawer
