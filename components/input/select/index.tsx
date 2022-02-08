import { Box, Flex, Input, Spinner, Stack } from '@chakra-ui/react'
import { CustomInputProps } from 'components/input/type'
import Body from 'components/typography/Body'
import useClickOutside from 'lib/hooks/useClickOutside2'
import { colors } from 'lib/theme'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import Wrapper from '../InputWrapper'

export type OptionType<O = any> = { label?: string | number; value?: any; option?: O }

export interface Select2PropsType<O = any> extends Omit<CustomInputProps, 'value' | 'onChange'> {
	dropDownMatchContainer?: boolean
	renderInput?: (props: OptionType<O>) => any
	options?: Array<OptionType<O>>
	renderComponent?: (props?: OptionType<O>) => React.ReactNode
	value?: OptionType<O> | React.ReactText | ReactNode
	onChange?: (option: OptionType<O>) => void
	isLoading?: boolean
}

function Select({
	dropDownMatchContainer = true,
	options = [],
	renderInput,
	renderComponent,
	value = { option: null, label: '', value: '' },
	isRequired,
	placeholder,
	...props
}: Select2PropsType & { isBold?: boolean }) {
	const { title, error, icon, iconPosition, containerStyle, isBold = false, underline, onChange, isLoading, ...inputProps } = props
	const [search, setSearch] = useState('')
	const [isInputFocused, setIsInputFocused] = useState(false)
	const [dropDownOptions, setDropDownOptions] = useState<Array<OptionType>>(options)

	useEffect(() => {
		//avoid invalid update caused by empty array comparison [] === [] false
		if (options.length) {
			setDropDownOptions(options)
		}
	}, [options])

	const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(
		value && typeof value === 'object' && 'value' in value ? value : options.find((o) => o.value === value)
	)
	const targetRef = useRef(null)
	const inputRef = useRef(null)
	const dropDownRef = useRef<HTMLDivElement>()
	const isClickedOutSide = useClickOutside({ targetRef, excludeRefs: [inputRef] })

	const onChangeOption = (newOption: any) => {
		console.log(newOption)
		switch (typeof newOption) {
			case 'string':
			case 'number': {
				if (newOption) {
					const option = options.find((opt) => opt.value === newOption)
					if (!option) throw new Error(`There is no Select option with value ${newOption}`)
					setSelectedOption(option)
				}
				break
			}
			case 'object':
				if (newOption && 'value' in newOption && 'label' in newOption) {
					const option = options.find((opt) => opt.value === newOption.value)
					option && setSelectedOption(option)

					// if (selectedOption?.value !== newOption.value) {
					// 	setSelectedOption(newOption)
					// }
					// if (selectedOption?.value !== newOption.value) {
					// 	setSelectedOption(newOption)
					// }
				}
				break
		}
	}

	useEffect(() => {
		onChangeOption(value)
	}, [value, options])

	const onSelectOption = (option) => {
		setSelectedOption(option)
		onChange?.(option)
		setIsInputFocused(false)
		setSearch('')
	}

	useEffect(() => {
		if (isClickedOutSide) setIsInputFocused(false)
	}, [isClickedOutSide])

	const onSearchOptions = (search: string) => {
		console.log(search)
		if (search) {
			setDropDownOptions(options.filter((option) => option.label && new RegExp(search, 'gi').test(option.label?.toString())))
		} else {
			setDropDownOptions(options)
		}
	}

	const handleOpenDropDown = () => {
		if (!inputProps.isDisabled) {
			setIsInputFocused(true)
			dropDownRef?.current?.focus()
		}
	}

	useEffect(() => {
		onSearchOptions(search)
	}, [search])

	return (
		<Box position="relative" w="full" aria-haspopup="listbox" aria-expanded="true">
			<Wrapper
				name={props.name}
				trapError={props.trapError}
				underline={underline}
				iconPosition={iconPosition}
				containerStyle={containerStyle}
				title={title}
				error={error}
				isRequired={isRequired}
				icon={icon}
				isBold={isBold}
				renderIcon={props.renderIcon}
				isDisabled={props.isDisabled}
			>
				<Flex h="full" align="center" overflowX="hidden" visibility={isInputFocused ? 'hidden' : 'visible'} position="absolute" px={2}>
					{renderComponent || renderInput ? (
						selectedOption?.value ? (
							renderInput?.(selectedOption) || renderComponent?.(selectedOption)
						) : null
					) : (
						<Body alt pl={icon ? 4 : 0} wordBreak="keep-all" whiteSpace="nowrap">
							{typeof selectedOption === 'object' && 'label' in selectedOption ? selectedOption.label : selectedOption}
						</Body>
					)}
				</Flex>
				<Input
					/**
					 * Enable to fix chrome auto suggestion dropdown
					 *as='select'
					 */
					//as="select"
					ref={inputRef}
					color="GrayText"
					autoComplete="off"
					autoCorrect="off"
					isRequired={isRequired ? (selectedOption?.value ? false : true) : isRequired}
					//_autofill='off'
					placeholder={
						isInputFocused ? (isLoading ? 'loading...' : 'Search') : selectedOption ? (options.length ? undefined : placeholder) : 'select...'
					}
					value={search}
					onFocus={handleOpenDropDown}
					onChange={({ target }) => {
						setSearch(target.value)
					}}
					px={1}
					min={1}
					marginBottom={0}
					className="custom-input"
					w="full"
					border="none"
					backgroundColor="transparent"
					_focus={{
						outline: 'none',
					}}
					{...inputProps}
				/>

				{props.isLoading ? (
					<Spinner boxSize="4" color="neutral.100" />
				) : (
					<RiArrowDropDownLine size={24} color="grey" onClick={handleOpenDropDown} />
				)}
			</Wrapper>

			<Stack
				as="ul"
				role="listbox"
				aria-labelledby="ID_REF"
				tabIndex={-1}
				ref={targetRef}
				maxH={isInputFocused && dropDownMatchContainer ? '2xs' : 0}
				opacity={isInputFocused && dropDownMatchContainer ? 1 : 0}
				overflowY="scroll"
				//	bottom={3}
				className="select-search-drop-down"
				transition="opacity .3s ease-in-out"
				w="full"
				visibility={isInputFocused && dropDownMatchContainer ? 'visible' : 'hidden'}
				position="absolute"
				//position='relative'
				shadow="B10"
				zIndex="modal"
				spacing={0}
				aria-activedescendant="ID_REF"
				//left={-2}

				// className={`select-search-drop-down-hide ${isInputFocused && dropDownMatchContainer && 'select-search-drop-down-show'}`}
			>
				{dropDownOptions.map((option, k) => (
					<Box
						//	ref={dropDownRef}
						area-selected={selectedOption == option ? 'true' : 'false'}
						as="li"
						role="option"
						key={k}
						background={selectedOption == option ? colors['blue-50'] : colors.white}
						cursor="pointer"
						transition="background .2s ease-in-out"
						onClick={() => onSelectOption(option)}
						_hover={{
							background: selectedOption !== option ? 'neutral.50' : 'blue.50',
						}}
					>
						{renderComponent ? (
							<Flex px={4} py={2} align="center">
								{renderComponent(option)}
							</Flex>
						) : (
							<Body alt px={4} py={2}>
								{typeof option === 'object' && 'label' in option ? option.label : option}
							</Body>
						)}
					</Box>
				))}
			</Stack>
			{/* </IfElse> */}
		</Box>
	)
}

export default Select
