import { Stack } from '@chakra-ui/react'
import Icon from 'components/icon'
import Link from 'components/link'
import Caption from 'components/typography/Caption'
import { BodyTypography } from 'components/typography/types'
import { useRouter } from 'next/router'
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

export type BackProps = {
	label?: string
	onClick?: (event: any) => void
	href?: string
	title?: string
	direction?: 'forward' | 'backward'
} & BodyTypography

const Index = ({ onClick, label = 'Back', href, direction = 'backward', title = '', ...others }: BackProps) => {
	const router = useRouter()
	return (
		<Link
			w="fit-content"
			href={href || router.asPath}
			onClick={(event) => {
				if (!href && !onClick) {
					router.back()
				}
				if (!href && onClick) {
					onClick(event)
				}
			}}
			{...others}
		>
			<Stack
				color="claret.500"
				alignItems="center"
				// justifyContent="center"
				// boxSize={10}
				ml={-1}
				display="inline-flex"
				transition="all .5s"
				// _hover={{
				// 	backgroundColor: hexToRGBA(colors['green-500'], 0.1),
				// }}
				{...others}
				rounded="full"
				direction="row"
				spacing={1}
			>
				{direction === 'backward' ? (
					<>
						<Icon boxSize={5} iconComp={BsArrowLeft} />

						<Caption>{label}</Caption>
					</>
				) : (
					<>
						<Caption>{label}</Caption> <Icon boxSize={5} iconComp={BsArrowRight} />
					</>
				)}
			</Stack>
		</Link>
	)
}

export default React.memo(Index)
