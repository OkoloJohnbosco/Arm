import { useDisclosure, Modal as Modal_, ModalCloseButton, ModalContent, ModalOverlay, ModalProps, Box, ModalContentProps } from '@chakra-ui/react'
import React from 'react'

export type CustomModalProps = Omit<ModalProps, 'onClose'> & { padded?: boolean; onClose?: () => void; content?: ModalContentProps }
function Modal({ children, isOpen, onClose, padded = true, content, ...others }: CustomModalProps) {
	const { isOpen: _isOpen, onOpen: _onOpen, onClose: _onClose } = useDisclosure({ isOpen, onClose })
	return (
		<Modal_ motionPreset="slideInRight" isOpen={_isOpen} isCentered onClose={_onClose} {...others}>
			<ModalOverlay zIndex="base" shadow="float" />
			<ModalContent {...content} position="relative">
				<Box p={padded ? 8 : 0}>
					{onClose && <ModalCloseButton color="neutral.70" zIndex="overlay" position="absolute" top="0" right="0" />}
					{children}
				</Box>
			</ModalContent>
		</Modal_>
	)
}

export default Modal

// import { Box, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
// import IfElse from 'components/if-else'
// import Close from 'components/back'

// import { colors } from 'lib/theme'
// import React from 'react'

// export type ModalProps = {
// 	isOpen: boolean
// 	onClose?: () => void
// 	children?: React.ReactNode
// 	isCentered?: boolean
// 	responsive?: boolean
// 	blockScrollOnMount?: boolean
// 	closeOnOverlayClick?: boolean
// 	size?: string
// 	hasInitialFocusSet?: boolean
// 	header?: string
// 	closeTitle?: string
// 	noBackgroud?: boolean
// 	//Header and footer should be part of the modal content
// 	//This implementation limits the header
// 	renderHeader?: React.ReactNode
// 	renderFooter?: () => React.ReactNode
// }

// const Index = (props: ModalProps) => {
// 	const {
// 		isOpen,
// 		noBackgroud = false,
// 		onClose,
// 		children,
// 		isCentered,
// 		responsive,
// 		blockScrollOnMount,
// 		closeOnOverlayClick,
// 		size,
// 		hasInitialFocusSet,
// 		renderHeader,
// 		renderFooter,
// 		header,
// 		closeTitle,
// 	} = props

// 	const initialFocusRef = React.useRef(null)

// 	return (
// 		<Modal
// 			size={size || (responsive ? 'sm' : 'md')}
// 			//size='xl'
// 			//	size={{base: responsive ? 'sm':'md'}}
// 			onClose={() => onClose && onClose()}
// 			isOpen={isOpen}
// 			isCentered={isCentered}
// 			initialFocusRef={initialFocusRef}
// 			blockScrollOnMount={blockScrollOnMount}
// 			closeOnOverlayClick={closeOnOverlayClick}
// 			motionPreset="slideInBottom"
// 		>
// 			<ModalOverlay zIndex="modal">
// 				<ModalContent
// 					ref={hasInitialFocusSet ? null : initialFocusRef}
// 					//	p={renderFooter ? 0 : 4}
// 					//shadow="sm"
// 					//minWidth="240px"

// 					rounded={4}
// 					// zIndex={100000}
// 					w={['95%', 'full']}
// 					// className={`${noBackgroud ? 'bg-none':'bg-auto'}`}
// 					background={noBackgroud ? 'none' : colors.background}
// 					//bg={colors['grey-100']}
// 					p={2}
// 				>
// 					<IfElse ifOn={!!onClose || !!renderHeader}>
// 						<ModalHeader textAlign="center" pt={renderFooter ? 4 : 1} px={0}>
// 							<Flex justifyContent={'space-between'}>
// 								<Box>{renderHeader}</Box>
// 								<Box>{onClose && <Close title={closeTitle || 'Close'} onClick={onClose} />}</Box>
// 							</Flex>
// 							{header}
// 						</ModalHeader>
// 					</IfElse>

// 					<ModalBody>{children}</ModalBody>

// 					<ModalFooter p={0} roundedBottom={4}>
// 						{renderFooter && renderFooter()}
// 					</ModalFooter>
// 				</ModalContent>
// 			</ModalOverlay>
// 		</Modal>
// 	)
// }

// export default React.memo(Index)
