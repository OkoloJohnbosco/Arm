import { Popover, PopoverBody, PopoverContent, PopoverProps, PopoverTrigger } from '@chakra-ui/react'
import React from 'react'

const PopOver = ({ activator, children, trigger, ...others }: { activator: JSX.Element } & PopoverProps) => {
	return (
		<Popover
			// styleConfig={{
			// 	width: 'auto',
			// 	borderRadius: '1rem',
			// 	background: 'none'
			// }}
			trigger={trigger || 'hover'}
			placement="left-end"
			// returnFocusOnClose
			{...others}
		>
			<PopoverTrigger>{activator}</PopoverTrigger>
			<PopoverContent padding={3} border={0} shadow="float" _focus={{ boxShadow: 0 }}>
				{children}
			</PopoverContent>
		</Popover>
	)
}

export default React.memo(PopOver)
