import { useToast } from '@chakra-ui/toast'
import { MainActionContext, MainStateContext } from 'lib/contexts/mainAppProvider'
import { useContext, useEffect } from 'react'

type ServerErrorBoundaryProps = {
	fields?: Array<string>
	children: any
}
export default ({ children, fields }: ServerErrorBoundaryProps) => {
	const { serverErrors } = useContext(MainStateContext)
	const { clearServerErrors } = useContext(MainActionContext)
	const toast = useToast()

	useEffect(() => {
		let unCapturedError: any = 'Something is not understood from the Server'
		if (serverErrors.message) {
			const containsAnyKey = serverErrors.errors.some((error) => fields?.includes(error.code))
			//Dont show toast if any of the error field is captured
			if (containsAnyKey) {
				return
			}
			//Look for field in errors not captured and use it as error message
			try {
				unCapturedError = serverErrors.errors.find((error) => !fields?.includes(error.code))
			} catch (e) {
				//Server returned invalid error structure
			}
			toast({
				//onCloseComplete: clearServerErrors, //clear message but leave errors
				title: serverErrors.message,
				description: unCapturedError?.message || serverErrors.message,
				status: 'error',
				position: 'top-right',
				isClosable: true,
				//id: serverErrors.message,
			})
		}
	}, [serverErrors])
	return children
}
