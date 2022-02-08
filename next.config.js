require('dotenv').config()

const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const { nextI18NextRewrites } = require('next-i18next/rewrites')
const localeSubpaths = {}

module.exports =
	//withBundleAnalyzer
	{
		typescript:{
			ignoreBuildErrors: true
		},
		images: {
			loader: process.env.NODE_ENV === 'production' ? 'cloudinary' : 'default',
			//domains: ['res.cloudinary.com'],
			path: 'https://res.cloudinary.com/rhics-tech/image/upload/v1610895232/cadawada/web',
			//path: 'rhics.imgix.net'
		},
		// poweredByHeader: false,
		// ignoreBuildErrors: false,
		// target: 'serverless',
		// reactStrictMode: true,
		sassOptions: {
			includePaths: [path.join(__dirname, 'public/css')],
		},
		webpack: (config, { isServer }) => {
			// config.resolve.alias['public'] = path.resolve(__dirname, 'public')
			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			})

			return config
		},
		// rewrites: async () => nextI18NextRewrites(localeSubpaths),
		// publicRuntimeConfig: {
		// 	localeSubpaths: {
		// 		fr: 'fr',
		// 		en: 'en',
		// 	},
		// },
		env: {
			SENTRY_DNS: process.env.SENTRY_DNS,
			ClientId: process.env.ClientId,
			ClientKey: process.env.ClientKey,
			BASE_URL: process.env.BASE_URL,
		},
		// shallowRender: true
	}
