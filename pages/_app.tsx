import { ChakraProvider } from '@chakra-ui/react'
import ErrorBounder from 'components/error/ErrorBoundary'
import { SESSION_STORAGE_THEME_NAME } from 'constant'
import { useBroadcastStorage } from 'lib/broadcastStorage'
import { MainAppProvider } from 'lib/contexts/mainAppProvider'
import useTheme from 'lib/theme/useTheme'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'public/css/index.scss'
import 'public/css/loader.scss'
import 'public/css/nprogress.css'
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()
NProgress.configure({ showSpinner: false })

function ArmEngageApp(props: any) {
	const { Component, pageProps, router, ...others } = props
	const themeName = useBroadcastStorage(SESSION_STORAGE_THEME_NAME)
	console.log(themeName, 'themeName from _app.tsx')

	const load = () => {
		NProgress.start()
	}

	const stop = () => {
		NProgress.done()
	}

	useEffect(() => {
		Router.events.on('routeChangeStart', load)
		Router.events.on('routeChangeComplete', stop)
		Router.events.on('routeChangeError', stop)

		return () => {
			Router.events.off('routeChangeStart', load)
			Router.events.off('routeChangeComplete', stop)
			Router.events.off('routeChangeError', stop)
		}
	}, [])

	return (
		// <ErrorBounder>
		<ChakraProvider resetCSS theme={useTheme('light')}>
			<Head>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
				<meta charSet="utf-8" />
			</Head>
			<QueryClientProvider client={queryClient}>
				{/* <Hydrate state={pageProps.dehydratedState}> */}
				<MainAppProvider>
					<Component {...pageProps} {...others} />
					<ReactQueryDevtools initialIsOpen={false} />
				</MainAppProvider>
				{/* </Hydrate> */}
			</QueryClientProvider>
		</ChakraProvider>
		//    </ErrorBounder>
	)
}

export default ArmEngageApp
