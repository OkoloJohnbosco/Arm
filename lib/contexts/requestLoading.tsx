import React, { useState, createContext, useContext } from 'react'

export type IsLoadingProps = {
	isLoading: boolean
	startLoading(): void
	stopLoading(): void
}

const LoadingActionContext = createContext<IsLoadingProps>({
	isLoading: false,
	stopLoading() {},
	startLoading() {},
})

export const useIsLoading = () => useContext(LoadingActionContext)

const LoadingActionProvider = ({ children }: { children: any }) => {
	const [isLoading, setIsLoading] = useState(false)

	const startLoading = () => {
		console.log('start loading...')
		setIsLoading(true)
	}

	const stopLoading = () => {
		console.log('stop loading...')
		setIsLoading(false)
	}

	return (
		<LoadingActionContext.Provider
			value={{
				isLoading,
				startLoading,
				stopLoading,
			}}
		>
			{children}
		</LoadingActionContext.Provider>
	)
}

export default LoadingActionProvider
