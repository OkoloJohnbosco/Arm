import { Box } from '@chakra-ui/react'
import React from 'react'

class ErrorBounder extends React.Component<any, { hasError: boolean; error: any }> {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: null }
	}
	static getDerivedStateFromError(error) {
		console.log(error)
		return { hasError: true, error }
	}

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo)
	}

	render() {
		return this.state.hasError ? <Box>Oops that was not you but us {JSON.stringify(this.state.error)}</Box> : this.props.children
	}
}

export default ErrorBounder
