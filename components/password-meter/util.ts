import { ColorProps } from 'lib/theme/type'

type PasswordStrengthType = { label: PasswordStrength; value: number; color: ColorProps }
type PasswordStrength = 'Weak' | 'Medium' | 'Strong' | 'Poor' | 'Bad'

const isPoorPassword = (input: string) => {
	return /^.*[a-z0-9\W]{4,7}.*$/gi.test(input)
}

const isWeakPassword = (input: string) => {
	return /^(.*[a-z0-9].*){8,}$/gi.test(input)
}

const isMediumPassword = (input: string) => {
	return /.*[A-Z]+.*/.test(input) && /.*[a-z]+.*/.test(input) && /.*[0-9]+.*/.test(input) && /.*[0-9a-z]{8,}.*/gi.test(input)
}

const isStrongPassword = (input: string) => {
	return (
		/.*[A-Z]+.*/.test(input) &&
		/.*[a-z]+.*/.test(input) &&
		/.*[0-9]+.*/.test(input) &&
		new RegExp('^.*\\W{1,}.*$').test(input) &&
		/.*[0-9a-z\W]{8,}.*/gi.test(input)
	)
}

export const getPasswordStrength = (input: string): PasswordStrengthType => {
	if (isStrongPassword(input)) {
		return { label: 'Strong', value: 99, color: 'green' }
	}
	if (isMediumPassword(input)) {
		return { label: 'Medium', value: 75, color: 'blue' }
	}
	if (isWeakPassword(input)) {
		return { label: 'Weak', value: 40, color: 'orange' }
	}
	if (isPoorPassword(input)) {
		return { label: 'Poor', value: 20, color: 'orange' }
	}
	return { label: 'Bad', value: 1, color: 'red' }
}

export const isInvalidPassword = (password: string, confirmPassword: string) => {
	return !password || !confirmPassword || password !== confirmPassword
}
