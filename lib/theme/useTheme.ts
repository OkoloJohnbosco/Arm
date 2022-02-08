import { injectThemeData } from '.'
import themeColors from './color'
import { ThemeModeNameType } from './type'

export const themeColorNameValue = {
	light: themeColors.LightColors,
	dark: themeColors.DarkColors,
}

export default (theme: ThemeModeNameType) => {
	return injectThemeData({
		colors: themeColorNameValue[theme],
	})
}

// import themes from '.'

// export default themes.lightTheme
