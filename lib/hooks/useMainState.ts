import { useContext } from 'react'
import { MainStateContext } from 'lib/contexts/mainAppProvider'

export default () => {
	return useContext(MainStateContext)
}
