import { Box } from '@chakra-ui/react'
import { StackCard } from 'components/card'
import Modal, { CustomModalProps } from 'components/modal'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import SubHeading from 'components/typography/SubHeading'
import React from 'react'
import { Button, ButtonGroup, ButtonVariantType } from 'components/button'
import IfElse from 'components/if-else'
import Divider from 'components/divider'

type PromptProps = {
	title: string
	description?: string
	action?: {
		primary?: ButtonVariantType
		secondary?: ButtonVariantType
	}
	asModal?: boolean
	children?: any
}
const PromptAction = ({ title, description, action, children, asModal = true, ...others }: PromptProps & CustomModalProps) => {
	return asModal ? (
		<Modal isCentered padded={false} {...others}>
			<StackCard spacing="6" py="8">
				<SubHeading>{title}</SubHeading>
				<Body>{description || children}</Body>
				<ButtonGroup>
					<Button display={action?.primary ? 'flex' : 'none'} {...action?.primary} />

					<Button display={action?.secondary ? 'flex' : 'none'} looks="primaryOutline" {...action?.secondary} />
				</ButtonGroup>
			</StackCard>
		</Modal>
	) : (
		<StackCard alignItems="center" spacing="6" display={others.isOpen ? 'flex' : 'none'}>
			<Caption textAlign="center">{title}</Caption>
			{/* <Divider/> */}
			<IfElse ifOn={children} elseThen={<Body textAlign="center">{description}</Body>}>
				<Box maxW="sm" textAlign="center">
					{children}
				</Box>
			</IfElse>
			<ButtonGroup>
				<Button display={action?.primary ? 'flex' : 'none'} looks="primary" {...action?.primary} />

				<Button display={action?.secondary ? 'flex' : 'none'} looks="primaryOutline" {...action?.secondary} />
			</ButtonGroup>
		</StackCard>
	)
}

export default PromptAction
