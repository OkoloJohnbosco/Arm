import { Box } from '@chakra-ui/react'
import { Button } from 'components/button'
import Switct from 'components/input/switch'
import useQueryMutation from 'lib/hooks/useQueryMutation'
import { normalizeConfig } from 'next/dist/next-server/server/config-shared'
import React, { useContext } from 'react'
import { FormBuilderContext, InputFieldPropType } from '../type'
import { FormBuilderUtil } from '../util'

export type FileMiscType = {
	post_url: string
	onPost: () => void
}

const FormButton = (fieldConfig: InputFieldPropType<FileMiscType>) => {
	const formContext = useContext(FormBuilderContext)
	const { setFieldValueOnChange, layout } = fieldConfig.settings || {}
	const misc = fieldConfig.misc
	const mutate = useQueryMutation({ endpoint: misc?.post_url || '', method: 'POST', isARMEngageAPI: false, includeBaseApiHeaders: true })

	const onSubmit = (event) => {
		// event.preventDefault()
		console.log('submitted')
		mutate.mutateAsync(FormBuilderUtil.from(formContext.inputValues, formContext.inputFieldConfigs).map()).then(misc?.onPost)
	}

	return (
		<Box py={6}>
			<Button
				w="full"
				isLoading={mutate.isLoading}
				//isRequired={fieldConfig.required}
				onClick={onSubmit}
				type="submit"
				size="md"
				name={fieldConfig.id}
				title={fieldConfig.label}
				isChecked={formContext.inputValues[fieldConfig.id]}
				{...(typeof fieldConfig.layout === 'function' ? fieldConfig.layout({ fieldConfig, formContext }) : fieldConfig.layout)}
			>
				{fieldConfig.label}
			</Button>
		</Box>
	)
}

export default FormButton
