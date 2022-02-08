import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class ArmEnageApp extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		const noOverlayWorkaroundScript = `
		window.addEventListener('error', event => {
			event.stopImmediatePropagation()
		})

		window.addEventListener('unhandledrejection', event => {
			event.stopImmediatePropagation()
		})
		`

		return (
			<Html lang="en">
				<Head>
					{process.env.NODE_ENV !== 'production' && <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />}
					<meta name="robots" content="all" />
					<meta name="Description" content="ArmEnage offers you a simple, quick and secure online system for managing your investments" />
					{/* <link
						// onLoad="this.media='all';this.onload=null;"
						href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,400&display=swap"
						rel="stylesheet"
					/>
					<link
						// onLoad="this.media='all';this.onload=null;"
						href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap"
						rel="stylesheet"
					/>

					<link
						href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
						rel="stylesheet"
					/> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
