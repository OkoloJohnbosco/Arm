import { ModalProps } from '@chakra-ui/modal'
import { Box } from '@chakra-ui/react'
import React from 'react'
import Modal from '.'

type ModalPagesProps = {
	pagePoint?: 'md' | 'base' | 'xs' | 'lg' | 'sm'
} & ModalProps

const ModalPage = ({ children, pagePoint = 'base', isOpen, ...others }: ModalPagesProps) => {
	return (
		<>
			<Modal {...others} isOpen={isOpen}>
				{children}
			</Modal>

			<Box display={{ [pagePoint || 'base']: isOpen ? 'block' : 'none', md: 'none' }}>{children}</Box>
		</>
	)
}

export default ModalPage
