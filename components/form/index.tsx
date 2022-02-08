import { useEffect, useState } from 'react'
import { FormBuilderContext, FormBuilderPropType, FormInputFieldConfigType } from './type'
import React from 'react'
import { getConfigNeighbor, getFormInputComponent, getInitialState, isConfigProccessed } from './util'
import { Box, Stack } from '@chakra-ui/react'
import BackWrapper from 'components/navigation/BackWrapper'
import NavigationWrapper from 'components/navigation/NavigationWrapper'

const FormBuilder = (props: FormBuilderPropType) => {
	const {
		layoutMarics: formLayoutMarics,
		inputFieldConfigs: formConfigs,
		inputInitialValues,
		pageSize = 6,
		updateInputValuesOnChange,
		inputFieldSettings,
		onFormInputChange,
	} = props
	const [formInputs, setFormInputs] = useState(getInitialState(props))
	const [currentPage, setCurrentPage] = useState(0)
	const [pages, setPages] = useState(1)

	const proccessedConfigs: FormInputFieldConfigType[] = []

	const onInputChange = ({ id, value }) => {
		setFormInputs({ ...formInputs, [id]: value })
	}

	useEffect(() => {
		onFormInputChange?.(formInputs)
	}, [formInputs, onFormInputChange])

	const [pageStart, pageEnd] = [pageSize * currentPage, pageSize * currentPage + pageSize]
	const inputFieldConfigs = formConfigs instanceof Array ? formConfigs : formConfigs ? [formConfigs] : []
	const pageSlice = inputFieldConfigs?.slice(pageStart, pageEnd)

	return (
		<Box>
			<FormBuilderContext.Provider value={{ inputValues: formInputs, inputInitialValues, onInputChange, inputFieldConfigs }}>
				<NavigationWrapper
					hide={
						pageSize >= inputFieldConfigs.length
						//&& formLayoutMarics?.length
					}
					forward={{
						visibility: pageSlice.length >= pageSize ? 'visible' : 'hidden',
						onClick: () => setCurrentPage(currentPage + 1),
						label: 'next page',
					}}
					backward={{ visibility: currentPage > 0 ? 'visible' : 'hidden', onClick: () => setCurrentPage(currentPage - 1), label: 'prev page' }}
				>
					{/* {inputsConfigs?.map((config, k) => { */}
					{pageSlice.map((config, k) => {
						const configNeigbours = getConfigNeighbor(config, formLayoutMarics, inputFieldConfigs)
						if (configNeigbours?.length) {
							return (
								<Stack direction={{ md: 'row', base: 'column' }} align="center">
									{configNeigbours.map((neighbor, i) => {
										const isProccessed = isConfigProccessed(neighbor.config, proccessedConfigs)
										if (isProccessed) {
											return null
										}
										proccessedConfigs.push(neighbor.config)
										const InputComponent = getFormInputComponent(neighbor.config)
										return (
											<InputComponent
												settings={inputFieldSettings?.[neighbor.config.id]}
												{...neighbor.config}
												layout={neighbor.layout}
												key={`${k}_${i}`}
											/>
										)
									})}
								</Stack>
							)
						}

						const isProccessed = isConfigProccessed(config, proccessedConfigs)
						if (isProccessed) {
							return null
						}
						proccessedConfigs.push(config)
						const InputComponent = getFormInputComponent(config)

						return <InputComponent settings={inputFieldSettings?.[config.id]} {...config} key={`${k}`} />
					})}
				</NavigationWrapper>
			</FormBuilderContext.Provider>
		</Box>
	)
}

export default FormBuilder
