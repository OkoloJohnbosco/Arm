module.exports = {
	presets: [
		[
			'next/babel',
			{
				'preset-react': {
					runtime: 'automatic',
					importSource: '@emotion/react',
				},
			},
		],
	],
	plugins: [
		[
			'babel-plugin-import',
			{
				libraryName: 'antd',
				style: 'index.css',
			},
		],
		['styled-components', { ssr: true }],
		// [
		// 	'babel-plugin-root-import',
		// 	{
		// 		rootPathSuffix: './',
		// 		rootPathPrefix: '@/',
		// 	},
		// ],
		// [
		// 	'inline-react-svg',
		// 	{
		// 		svgo: {
		// 			plugins: [
		// 				{
		// 					removeAttrs: { attrs: '(data-name)' },
		// 				},
		// 				{
		// 					cleanupIDs: true,
		// 				},
		// 			],
		// 		},
		// 	},
		// ],
		'@emotion/babel-plugin',
	],
}
