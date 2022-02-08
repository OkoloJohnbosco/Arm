import { SystemProps } from '@chakra-ui/react'

type Props = SystemProps['marginRight']

export const spacingUnits = (p: Props) => {
	return `${p}rem`
}
