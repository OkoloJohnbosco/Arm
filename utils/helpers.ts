import { colors } from 'lib/theme'
import { AlertType, ARMEngageResponseType, EventDataType, ResponseErrorType } from 'lib/types'
import { BroadcastChannel } from 'broadcast-channel'
import { CurrencyType } from 'components/types/type'
import { BodyTypography } from 'components/typography/types'
import { ColorProps } from 'lib/theme/type'
import $ from 'jquery'
/**
 * Validate that the input is only a number or empty string
 * @param {*} input
 * @returns true if a number or empty string is entered
 */
export const isNumberEdit = (input: string) => {
	return /^[0-9]+$/.test(input) || input === ''
}

export const isEmail = (text: string) => {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		text
	)
}

export const formatDateofBirth = (date: string | undefined) => {
	if (!date) {
		return
	}
	return new Date(date).toISOString()
}

export const trimName = (name: string, code: string, limit: number = 15) => {
	return name?.length > limit ? `${name.substring(0, limit)}.. ${code}` : `${name} ${code}`
}

export const formatCurrency = (amount: number | undefined) => {
	return !amount ? 0 : new Intl.NumberFormat().format(Number(Number(amount)))
}

export const randomColor = () => {
	const colorList = [colors['blue-500'], colors['red-400'], colors['green-400'], colors['primary'], colors['grey-400'], colors['blue-400']] //TODO Color
	return colorList[Math.floor(Math.random() * 6 + 0)]
}

export const randomColorNames = () => {
	const colors = ['blue.400', 'red.400', 'green.400', 'claret.500', 'grey.400', 'blue.400'] //TODO Color
	return colors[Math.floor(Math.random() * 6 + 0)] as ColorProps
}

export function hexToRGBA(hex, opacity) {
	return (
		'rgba(' +
		(hex = hex.replace('#', ''))
			.match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
			?.map(function (l) {
				return parseInt(hex.length % 2 ? l + l : l, 16)
			})
			.concat(opacity || 1)
			.join(',') +
		')'
	)
}
export function hexToRGBA2(color: ColorProps, opacity) {
	return hexToRGBA(colors[color], opacity)
}

export const splitWord = (word: string, delimeter: string = '_') => {
	return word.split(delimeter).join(' ')
}

export const mimicResponse = (data): ARMEngageResponseType => {
	return { data: { response_code: '', response_message: '', data: data } }
}

export const setSuccessMessage = (altMessage: string = 'Request Successfull') => (response: ARMEngageResponseType) => {
	return {
		message: response.data.response_message || altMessage,
		type: 'success' as AlertType,
	}
}

const jsUcfirst = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

const formatErrorMessage = (rawMessage: string) => {
	// change mentions of 'property' to 'field'
	let formatedMessage = rawMessage.replace(/property/g, 'field')
	// replace camel_case strings with their space separated words
	formatedMessage = formatedMessage.replace(/_/g, ' ')
	// let splits = formatedMessage.split('_').join(' ')
	// replace ' strings with their space separated words
	formatedMessage = formatedMessage.split("'").join('')
	// convert first letter to capitals
	formatedMessage = jsUcfirst(formatedMessage)

	return formatedMessage
}

export const setErrorMessage = (altMessage: string = 'An Error Occured please try again') => (response: ResponseErrorType) => {
	try {
		// There are two(2) error Schemas returned from the API
		// response.data.data.errors = [{code: '03', field: 'error message'}]
		// response.data.errors = {field1: 'error message', field2: 'error message'}
		let errorMessages: Array<EventDataType> = []
		if (response['response']['data']['data']) {
			const errors = response['response']['data']['data']['errors']
			const firstError = errors[0]
			const errorKeys = Object.keys(firstError)
			errorMessages = [
				{
					title: firstError.code || 'error',
					namespace: `${errorKeys[1]}`,
					message: `${firstError[errorKeys[1]]}` || altMessage,
					type: 'error' as AlertType,
				},
			]

			return errorMessages
		}

		const errors = response['response']['data']['errors']
		const errorKeys = Object.keys(errors)
		errorMessages = errorKeys.map((field) => {
			return {
				title: 'error',
				namespace: field,
				message: formatErrorMessage(errors[field]) || altMessage,
				type: 'error' as AlertType,
			}
		})
		return errorMessages
	} catch (error) {
		//@ts-ignore
		const message = response && 'message' in response ? response?.message : `An Unkown Error occured, please try again`
		return [
			{
				title: 'Network Error',
				message: message,
				type: 'error' as AlertType,
			},
		]
	}
}

export const truncateDecimals = (value: any, placeValue = 2) => {
	const input = String(value)
	if (!/^[0-9]{1}[0-9.]*$/gi.test(input)) {
		return 0
	}
	const decimalIndex = input?.match(/\./)?.index
	if (!decimalIndex) {
		return input
	}
	const RHSString = input.substr(decimalIndex + 1)
	return RHSString.length > 0
		? `${input.substring(0, decimalIndex)}.${RHSString.substring(0, RHSString.length > placeValue ? placeValue : RHSString.length)}`
		: input.replace('.', '')
}

export const scrollToSelector = (cssSelector: string) => {
	$('html, body').animate(
		{
			scrollTop: $(cssSelector)?.offset()?.top,
		},
		1000
	)
}

export const searchFilter = (props: { search; targets?: any[] }) =>
	props.targets?.some((target) => !props.search || new RegExp(props.search, 'gi').test(target))

export const dateToString = (dateString: string) => {
	const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
	if (!dateString) return null
	const date = new Date(dateString)
	return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export const toDateString = (serverDate) => {
	const date = new Date(serverDate).toDateString()
	const dateArr = date.split(' ')

	if (date === new Date().toDateString()) return 'Today'

	return `${dateArr[2]} ${dateArr[1]}, ${dateArr[3].slice(-2)}`
}

export const toTimeString = (serverDate) => {
	const time = new Date(serverDate)
		.toTimeString()
		.slice(0, 5)
		.split(':')
		.map((a) => +a)

	let hours = time[0]
	let timeMeridian = 'am'

	if (hours > 12 && hours < 24) {
		hours = time[0] - 12
		time[0] = hours
		timeMeridian = 'pm'
	}
	if (hours === 24) {
		time[0] = time[0] - 12
		timeMeridian = 'am'
	}
	return `${time.join(':')} ${timeMeridian}`
}

export const isKycComplete = (statusList: Array<string>, statusItem = 'COMPLETED') => {
	let status = 0
	if (!statusList.includes(statusItem)) {
		status = 0
	} else {
		const stagesCompleted = statusList.filter((item) => item == 'COMPLETED')

		status = (stagesCompleted.length / statusList.length) * 100
	}

	return status
}
