import { Stack, StackDivider } from '@chakra-ui/react'
import { RoboNoticeType } from 'lib/types'
import React from 'react'
import { getRoboComponent } from '../config'
import NoticeItem from './NoticeItem'

const Index = ({ roboNotices }: { roboNotices: RoboNoticeType[] }) => {
	return (
		<Stack divider={<StackDivider />} spacing={0} maxH="md">
			{roboNotices?.map((notice) => {
				const Comp = getRoboComponent(notice)
				return Comp ? <Comp {...notice} /> : <NoticeItem {...notice} />
			})}
		</Stack>
	)
}

export default Index
