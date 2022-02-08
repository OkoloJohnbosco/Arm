import { theme as chakraThemes } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
// import { AppTheme } from '@types'
// import themeColors from './color'
import { ColorType } from './type'

const LightColors: ColorType = {
	transparent: 'transparent',
	'neutral-20': '#F4F5F7',
	'neutral-30': '#EBECF0',
	'neutral-40': '#DFE1E6',
	'neutral-50': '#C1C7D0',
	'neutral-60': '#B3BAC5',
	'neutral-70': '#A5ADBA',
	'neutral-80': '#97A0AF',
	'neutral-90': '#8993A4',
	'neutral-100': '#7A869A',
	'neutral-200': '#6B778C',
	'neutral-300': '#5E6C84',
	'neutral-400': '#505F79',
	'neutral-500': '#42526E',
	'neutral-600': '#344563',
	'neutral-700': '#253858',
	'neutral-800': '#172B4D',
	'neutral-900': '#091E42',

	'purple-50': '#EAE6FF',
	'purple-75': '#C0B6F2',
	'purple-100': '#998DD9',
	'purple-200': '#8777D9',
	'purple-300': '#6554C0',
	'purple-400': '#5243AA',
	'purple-500': '#403294',

	inherit: 'inherit',
	'red-50': '#FFEBE6',
	'red-75': '#FFBDAD',
	'red-100': '#FF8F73',
	'red-200': '#FF7452',
	'red-300': '#FF5630',
	'red-400': '#DE350B',
	'red-500': '#BF2600',
	red: '#E53E3E',
	'red-900': '#63171B',
	'black-900': '#000',
	'green-50': '#E3FCEF',
	'green-75': '#ABF5D1',
	'green-100': '#79F2C0',
	'green-200': '#57D9A3',
	'green-300': '#36B37E',
	'green-400': '#00875A',
	'green-500': '#006644',
	green: '#36B37E',
	'green-900': '#1C4532',
	'deep-green': '#006644',

	'teal-50': '#E6FCFF',
	'teal-75': '#B3F5FF',
	'teal-100': '#79E2F2',
	'teal-200': '#00C7E6',
	'teal-300': '#00B8D9',
	'teal-400': '#00A3BF',
	'teal-500': '#0987A0',

	'blue-50': '#DEEBFF',
	'blue-75': '#B3D4FF',
	'blue-100': '#4C9AFF',
	'blue-200': '#2684FF',
	'blue-300': '#0065FF',
	'blue-400': '#0052CC',
	'blue-500': '#0747A6',
	'blue-800': '#153E75',
	'blue-700': '#1E4E8C',
	'blue-600': '#2A69AC',
	blue: '#1D6AE5',
	'blue-900': '#1A365D',
	'blue-light': '#0987A0',

	'grey-100': '#EDF2F7',
	'grey-200': '#CBD5E0',
	'grey-300': '#CBD5E0',
	'grey-400': '#A0AEC0',
	'grey-500': '#718096',
	'grey-600': '#4A5568',
	'grey-700': '#2D3748',
	grey: '#718096',
	'grey-900': '#1A202C',

	'black-100': '#656565',
	'neutral-light': '#172B4D',
	black: '#000',
	white: '#fff',
	secondary: '#73B462',
	primary: '#2C5282',
	'primary-light': '#0987A0',
	'primary-dark': '#29555C',
	'secondary-dark': '#6f994e',
	'secondary-light': '#E4F5D6',
	purple: '#152345',
	yellow: '#D69E2E',
	orange: '#DD6B20',
	'orange-300': '#F5816D',
	'yellow-50': '#FFFAE6',
	'yellow-75': '#FFF0B3',
	'yellow-100': '#FFE380',
	'yellow-200': '#FFC400',
	'yellow-300': '#FFAB00',
	'yellow-400': '#FF991F',
	'yellow-500': '#FF8B00',
	'orange-200': '#BF2600',
	'shadow-100': `0 0px 0px 0 rgba(49, 49, 93, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.08)`,
	'shadow-200': `0 3.2px 7.2px 0 rgba(0,0,0,.132), 0 0.6px 1.8px 0 rgba(0,0,0,.108)`,
	'shadow-300': `0 2px 6px 0 rgba(0,0,0,.05)`,
	'body-heighlight': '#667599',
	background: '#F5F6FA',
	'background-secondary': '#F7F7F7',
	'background-heighlight-secondary': '#FAEBD7',
	'background-heighlight': '#F5DEB3',
}

const breakpoints = createBreakpoints({
	xs: '320px',
	sm: '576px',
	md: '767px',
	lg: '991px',
	xl: '1200px',
	tablet: '1024px',
	mobile: '766px',
})

// const darkTheme = extendTheme({
// 	breakpoints,
// 	colors: {
// 		...chakraThemes.colors,
// 		...themeColors.DarkColors,
// 	},
// 	shadows: {
// 		...chakraThemes.shadows,
// 		B10: '0px 1px 1px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		B20: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		B30: '0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		B40: '0px 10px 18px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		B50: '0px 18px 28px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
// 		inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
// 		float: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);',
// 		light: '0px 1px 10px 0 rgba(168, 164, 164, 0.2)',
// 		none: 'none',
// 	},
// })

// const lightTheme = extendTheme({
// 	breakpoints,
// 	colors: {
// 		...chakraThemes.colors,
// 		...themeColors.LightColors,
// 	},
// 	shadows: {
// 		...chakraThemes.shadows,
// 		B10: '0px 1px 1px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		B20: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		B30: '0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		B40: '0px 10px 18px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		B50: '0px 18px 28px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
// 		outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
// 		inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
// 		float: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);',
// 		light: '0px 1px 10px 0 rgba(168, 164, 164, 0.2)',
// 		none: 'none',
// 	},
// })

export const injectThemeData = ({ colors }: { colors: any }) => {
	return extendTheme({
		breakpoints,
		colors: {
			...chakraThemes.colors,
			...colors,
		},
		shadows: {
			...chakraThemes.shadows,
			B10: '0px 1px 1px rgba(9, 30, 66, 0.25), 0px 0px 1px rgba(9, 30, 66, 0.31);',
			B20: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);',
			B30: '0px 8px 12px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
			B40: '0px 10px 18px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
			B50: '0px 18px 28px rgba(9, 30, 66, 0.15), 0px 0px 1px rgba(9, 30, 66, 0.31);',
			outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
			inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
			float: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);',
			light: '0px 1px 10px 0 rgba(168, 164, 164, 0.2)',
			none: 'none',
		},
	})
}

export const colors = LightColors

// export default {
// 	lightTheme,
// }
