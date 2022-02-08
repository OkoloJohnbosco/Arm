import { BoxProps } from '@chakra-ui/react'
import Skeleton from './Skeleton'

const CircleSkeleton = (props: BoxProps) => {
	return <Skeleton boxSize="4" rounded="full" {...props} />
}

export default CircleSkeleton
