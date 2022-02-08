type FileCategoryType = 'image' | 'video' | 'document'
const fileTypes: Record<FileCategoryType, string[]> = {
	image: ['image/png', 'image/webp', 'image/jpg', 'image/gif'],
	video: ['video/mp4', 'video/mpeg', 'video/3gp', 'video/avi'],
	document: ['application/pdf'],
}

export const getFileCategory = (mimiType?: string | null): FileCategoryType | null => {
	for (const fileType of Object.keys(fileTypes)) {
		if (fileTypes[fileType].some((mimi) => mimi == mimiType)) {
			return fileType as FileCategoryType
		}
	}
	return null
}
