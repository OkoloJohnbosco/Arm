import { Stack, Box, Flex, Tag } from '@chakra-ui/react'
import Small from 'components/typography/Small'
import Divider from 'components/divider'
import React from 'react'
import Bullet, { TimeLineStatus } from './Bullet'
import Button from 'components/button/Button'
import Mini from 'components/typography/Mini'
import { ActivityType } from 'modules/hooks/account/useApiGetUserActivities'
import { toDateString, toTimeString } from 'utils/helpers'

type TimeLine = {
	title?: string
	isLast: boolean
	message: string
	date?: string
	status: TimeLineStatus
}

const TimeLine = ({ isLast, status, title, message, date }: TimeLine) => {
	return (
		<Stack direction="row" justify="space-between" minH="16" wrap="wrap">
			<Stack direction="row" spacing={4}>
				<Flex flexDirection="column">
					<Box>
						<Bullet status={status} />
					</Box>
					{/* <Box alignSelf='center'> */}
					<Divider display={isLast ? 'none' : 'initial'} alignSelf="center" orientation="vertical" borderColor="gray.300" opacity="1" />
					{/* </Box> */}
				</Flex>
				<Stack w="xs" spacing={6} pb="6">
					<Mini variant="semibold12">{message}</Mini>
					<Box>
						<Button size="xs" looks="accent">
							{title}
						</Button>
					</Box>
				</Stack>
			</Stack>
			<Stack py={2}>
				<Small color="neutral-300">
					{toDateString(date)} | {toTimeString(date)}
					{/* <Tag variant="solid" colorScheme="gray" size="sm" fontFamily="Barlow">
						{toDateString(date)} | {toTimeString(date)}
					</Tag> */}
				</Small>
			</Stack>
		</Stack>
	)
}
// timeline={['success', 'warning', 'info', 'error']

// const TimeLines = () => {
// 	const arr = ['success', 'warning', 'info', 'error']
// 	return arr.map((v, i) => <TimeLine status={v} isLast={i === arr.length - 1} />)
// }

// const TimeLines = (props: { timeline: Array<any> }) => {
// 	return (
// 		<Box>
// 			{props.timeline.map((v, i) => (
// 				<TimeLine status={v} key={i} isLast={i === props.timeline.length - 1} />
// 			))}
// 		</Box>
// 	)
// }

const TimeLines = ({ timeline }: { timeline: Array<ActivityType> | undefined }) => {
	return (
		<Box>
			{timeline &&
				timeline.map((v, i) => (
					<TimeLine
						status="success"
						date={v.date_created}
						title={v.category.title}
						message={v.category.message}
						key={i}
						isLast={timeline ? i === timeline.length - 1 : false}
					/>
				))}
		</Box>
	)
}

export default TimeLines

export const activityArr = [
	{
		is_archived: false,
		id: 13,
		activity_url: '/api/v1/investment/account_statement',
		is_response_required: false,
		date_created: '2021-11-23T08:16:44.355791',
		response_url: null,
		category: {
			id: 5,
			title: 'Account Statement',
			category_type: 'Account Statement',
			message: 'Successfully retrieved account statement',
		},
	},
	{
		is_archived: false,
		id: 14,
		activity_url: '/api/v1/investment/account_statement',
		is_response_required: false,
		date_created: '2021-11-23T08:16:50.577508',
		response_url: null,
		category: {
			id: 5,
			title: 'Account Statement',
			category_type: 'Account Statement',
			message: 'Successfully retrieved account statement',
		},
	},
	{
		is_archived: false,
		id: 15,
		activity_url: '/api/v1/investment/account_statement',
		is_response_required: false,
		date_created: '2021-11-23T08:17:58.982027',
		response_url: null,
		category: {
			id: 5,
			title: 'Account Statement',
			category_type: 'Account Statement',
			message: 'Successfully retrieved account statement',
		},
	},
	{
		is_archived: false,
		id: 130,
		activity_url: '/api/v1/investment/account_statement',
		is_response_required: false,
		date_created: '2021-11-23T08:16:44.355791',
		response_url: null,
		category: {
			id: 5,
			title: 'Account Statement',
			category_type: 'Account Statement',
			message: 'Successfully retrieved account statement',
		},
	},
	{
		is_archived: false,
		id: 140,
		activity_url: '/api/v1/investment/account_statement',
		is_response_required: false,
		date_created: '2021-11-23T08:16:50.577508',
		response_url: null,
		category: {
			id: 5,
			title: 'Account Statement',
			category_type: 'Account Statement',
			message: 'Successfully retrieved account statement',
		},
	},
	{
		is_archived: false,
		id: 150,
		activity_url: '/api/v1/investment/account_statement',
		is_response_required: false,
		date_created: '2021-11-23T08:17:58.982027',
		response_url: null,
		category: {
			id: 5,
			title: 'Account Statement',
			category_type: 'Account Statement',
			message: 'Successfully retrieved account statement',
		},
	},
	{
		is_archived: false,
		id: 1110,
		activity_url: '/api/v1/investment/account_statement',
		is_response_required: false,
		date_created: '2021-11-23T08:17:58.982027',
		response_url: null,
		category: {
			id: 5,
			title: 'Account Statement',
			category_type: 'Account Statement',
			message: 'Successfully retrieved account statement',
		},
	},
]
