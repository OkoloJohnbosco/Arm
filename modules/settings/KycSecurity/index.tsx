import React from 'react'
import SettingsWrapper from '../SettingsWrapper'
import KycFile from 'components/kyc-file'
import { Grid, HStack, Stack, ModalHeader, useDisclosure, Modal, ModalCloseButton, ModalOverlay, ModalBody, ModalContent } from '@chakra-ui/react'
import Button from 'components/button/Button'
import Body from 'components/typography/Body'
import Divider from 'components/divider'
import Icon from 'components/icon'
import SubHeading from 'components/typography/SubHeading'
import { TiPhone } from 'react-icons/ti'

function KycSecurity() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Modal blockScrollOnMount={true} isCentered size="2xl" onClose={onClose} isOpen={isOpen}>
				<ModalOverlay background="rgba(0,0,0,.2)" />
				<ModalContent>
					<ModalHeader> </ModalHeader>
					<ModalCloseButton my={2} />
					<ModalBody pb="40px" pt="30px">
						<Grid px={3} templateColumns={{ base: '1fr', md: '4.2fr 0.2fr 4fr' }} w="full" gap={8}>
							<Stack spacing={8}>
								<Stack spacing={4}>
									<SubHeading fontWeight="700" color="neutral-500">
										KYC Process
									</SubHeading>
									<Body variant="regular13" color="neutral.200">
										We will now redirect you to a screen where you can complete your KYC document upload seamlessly.
									</Body>
									<Body variant="regular13" color="neutral.200">
										Click on proceed to continue or cancel to stay on your dashboard.
									</Body>
								</Stack>
								<Stack spacing={6}>
									<Button looks="accent" w={{ base: 'full', md: 'auto' }} size="md" px={10} py={3} rounded={3}>
										Continue
									</Button>
									<Button onClick={onClose} looks="accentOutline" w={{ base: 'full', md: 'auto' }} size="md" px={10} py={3} rounded={3}>
										Cancel
									</Button>
								</Stack>
							</Stack>
							<Divider orientation="vertical" />
							<Stack spacing="50px" maxW="400px" justify="center" display={{ base: 'none', md: 'flex' }}>
								<Stack>
									<Body variant="regular13" color="neutral.200">
										Alternatively, you can contact your Relationship manager to help you resolve any problem you may have with regards to
										you KYC Uploads.
									</Body>
								</Stack>
								<Stack p={4} maxW="400px" bg="#F6F4F3" rounded={10}>
									<HStack alignItems="flex-start">
										<Icon mr={3} iconComp={TiPhone} boxSize={6} color="claret.500" />
										<Stack spacing={0} justify="center">
											<Body variant="regular13" color="neutral-500" fontWeight="bold">
												Contact Funmilayo
											</Body>
											<Body variant="regular13" color="neutral-500" fontWeight="bold">
												funmi@arm.com.ng
											</Body>
											<Body variant="regular13" color="neutral-500" fontWeight="bold">
												+2340090948034
											</Body>
										</Stack>
									</HStack>
								</Stack>
							</Stack>
						</Grid>
					</ModalBody>
				</ModalContent>
			</Modal>

			<SettingsWrapper px="30px">
				<Grid
					rowGap={10}
					columnGap={{ base: 3, md: 5 }}
					placeItems="center"
					templateColumns={{ base: 'repeat(auto-fill, minmax(150px, 170fr))', md: 'repeat(auto-fill, minmax(160px, 1fr))' }}
				>
					<KycFile onClick={onOpen} status="verified" title="BVN" />
					<KycFile onClick={onOpen} status="pending" title="Personal ID" />
					<KycFile onClick={onOpen} status="none" title="Source of Funds" />
					<KycFile onClick={onOpen} status="declined" title="Utility Bill" />
					<KycFile onClick={onOpen} status="none" title="Resident Address" />
					<KycFile onClick={onOpen} status="verified" title="Signature Upload" />
					<KycFile onClick={onOpen} status="none" title="Next of KIN" />
				</Grid>
				<HStack pt="50px" justify="flex-start">
					<Button looks="accent" onClick={onOpen} size="md" w={{ base: 'full', md: 'auto' }} px={10} py={3} fontWeight="normal" rounded={0}>
						Complete KYC
					</Button>
				</HStack>
			</SettingsWrapper>
		</>
	)
}

export default KycSecurity
