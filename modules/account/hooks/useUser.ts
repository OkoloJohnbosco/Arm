import { useMemo } from 'react'
import { getLogin } from '../helper'

export default () => {
	return useMemo(() => getLogin(), [])
}
