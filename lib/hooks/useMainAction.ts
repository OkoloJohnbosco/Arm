import { useContext } from 'react'
import { MainActionContext } from 'lib/contexts/mainAppProvider'

export default () => {
	return useContext(MainActionContext)
}
