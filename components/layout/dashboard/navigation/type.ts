import { IconType } from 'react-icons/lib'

export type NavItemType = {
	type: 'item' | 'group' | 'section'
	label?: string
	url?: string
	items?: Array<NavItemType>
	icon?: IconType
}
