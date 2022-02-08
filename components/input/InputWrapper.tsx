import { Flex, Stack, StackProps } from '@chakra-ui/react'
import IfElse from 'components/if-else'
import Small from 'components/typography/Small'
import useMainAction from 'lib/hooks/useMainAction'
import useMainState from 'lib/hooks/useMainState'
import { colors } from 'lib/theme'
import { hexToRGBA3 } from 'lib/theme/color'
import React, { useEffect, useMemo } from 'react'
import { FaAsterisk } from 'react-icons/fa'
import Icon, { IconProps } from '../icon'
import { InputWrapperProps } from './type'

const Wrapper = (props: InputWrapperProps & { isBold?: boolean }) => {
	const { titleHeight, textAlign, ...others } = props?.containerStyle || {}
	const { underline = true, name, trapError = true, iconPosition = 'left' } = props
	const serverError = useMainState().serverErrors
	const { clearServerErrors } = useMainAction()

	const message =
		useMemo(() => {
			try {
				return serverError?.errors?.find((error) => name && error.code === name)
			} catch (e: any) {
				return 'Debug: Improper Error response received'
			}
		}, [serverError]) || {}
	//TODO FIX
	//@ts-ignore
	const errorMessage = props.error || message.message

	useEffect(() => {
		clearServerErrors()
	}, [])

	return (
		<Stack w="full" {...others}>
			<Stack
				className="input-wrapper"
				w="full"
				border="none"
				// borderBottom={underline ? `1px solid ${errorMessage ? colors['red'] : props.value ? colors['primary'] : colors['transparent']}` : 'none'}
				transition="border-bottom .2s ease-in-out"
				{...others}
				//className="input-wrapper"
				//	px={2}
			>
				{props.title && (
					<Small
						as="label"
						area-aria-label={props.title}
						textAlign="start"
						color={errorMessage ? 'red' : 'neutral.500'}
						fontWeight="bold"
						alt={props.isBold}
						mb={-1}
					>
						{props.title}
						{props.isRequired && <Icon iconComp={FaAsterisk} boxSize={2} display="inline" ml={1} />}
					</Small>
				)}

				<Flex
					border={`1px solid ${hexToRGBA3('black', 500, 0.6)}`}
					rounded={5}
					// boxShadow={`0 0 .9pt .9pt ${hexToRGBA3('claret', 500, 0.3)}`}
					alignItems="center"
					//@ts-ignore
					backgroundColor={others.backgroundColor || others.background || others.bg || '#F4F5F7'}
					px={others.px || others.p || others.padding || 2}
					py={others.py || others.p || others.padding || 1}
					borderColor="#B3BAC5"
					boxShadow=""
					{...others}
				>
					<IfElse ifOn={(props.renderIcon || props.icon) && iconPosition === 'left'}>
						{props.renderIcon
							? props.renderIcon
							: props.icon && (
									<Icon
										{...props.icon}
										color={props.isDisabled ? colors['grey-200'] : colors['grey-500']}
										//pr={0}
										mb={0}
										boxSize={4}
									/>
							  )}
					</IfElse>

					{props.children}
					<IfElse ifOn={(props.renderIcon || props.icon) && iconPosition === 'right'}>
						{props.renderIcon
							? props.renderIcon
							: props.icon && (
									<Icon
										{...props.icon}
										color={props.isDisabled ? colors['grey-200'] : colors['grey-500']}
										//pr={0}
										mb={0}
										boxSize={4}
									/>
							  )}
					</IfElse>
				</Flex>
			</Stack>
			{trapError && (
				<Small
					minH="1"
					transition="visibility 1s ease-in-out"
					visibility={trapError && errorMessage ? 'visible' : 'hidden'}
					textAlign="start"
					color="red"
				>
					{errorMessage}
				</Small>
			)}
		</Stack>
	)
}

export default React.memo(Wrapper)
