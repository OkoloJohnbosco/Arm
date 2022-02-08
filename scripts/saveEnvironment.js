const fs = require('fs')
const path = require('path')

const environment = {
	development: {
		BASE_URL: 'http://167.71.183.159',
		SENTRY_DNS: '',
	},
	staging: {
		BASE_URL: 'http://167.71.183.159',
		SENTRY_DNS: '',
	},
	production: {
		BASE_URL: 'http://167.71.183.159',
		SENTRY_DNS: '',
	},
}

function buildEnv() {
	const envPath = path.join(__dirname, '../.env').toString()
	const NODE_ENV = process.env.NODE_ENV
	console.info('\x1b[33m%s\x1b[0m', `Creating ${NODE_ENV} environment file at ${envPath}`)

	const { BASE_URL, SENTRY_DNS } = environment[NODE_ENV]

	const data = `
    BASE_URL=${BASE_URL}
	SENTRY_DNS=${SENTRY_DNS}
`
	fs.writeFileSync(envPath, data, { encoding: 'utf8' })
}
buildEnv()
