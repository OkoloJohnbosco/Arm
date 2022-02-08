import { ColorType } from 'lib/theme/type'

export interface AppTheme {
	colors: ColorType
}

// export type Color = keyof LocalTheme['colors']

declare module 'styled-components' {
	export interface DefaultTheme extends AppTheme {}
}
