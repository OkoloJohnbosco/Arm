import { Box, Stack, Flex, HStack, LinkOverlay, LinkBox } from '@chakra-ui/react'
import Body from 'components/typography/Body'
import Caption from 'components/typography/Caption'
import React from 'react'
import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { IconType } from 'react-icons/lib'
import { NavItemType } from './type'

const Item = ({ config }: { config: NavItemType }) => {
	// @ts-ignore
	const Icon: IconType = config.icon

	return config.url ? (
		<LinkBox
			_hover={{
				color: 'neutral.0',
			}}
			//_focus={{ bg: 'claret.400' }}
		>
			<LinkOverlay href={config.url}>
				<HStack align="end" role="button" tabIndex={0} py={3}>
					{Icon && <Icon color="neutral.50" size={20} />}
					<Caption
						title={config.label}
						className="navigation-label"
						//	lineHeight='2'
					>
						{config.label}
					</Caption>
				</HStack>
			</LinkOverlay>
		</LinkBox>
	) : (
		<HStack
			align="end"
			role="button"
			tabIndex={0}
			py={3}
			_hover={{
				color: 'neutral.0',
			}}
			//_focus={{ bg: 'claret.400' }}
		>
			{Icon && <Icon color="neutral.50" strokeWidth=".5px" size={20} />}
			<Caption
				title={config.label}
				//variant="regular13"
				className="navigation-label"
				//	lineHeight='2'
			>
				{config.label}
			</Caption>
		</HStack>
	)
}

const ItemSection = ({ config }: { config: NavItemType }) => {
	return (
		<Box py={2} color="neutral.0">
			<Body
				className="navigation-section-label"
				title={config.label}
				fontSize="xx-small"
				letterSpacing={4}
				textTransform="uppercase"
				color="white"
			>
				{config.label}
			</Body>
		</Box>
	)
}

const Group = ({ config }: { config: NavItemType }) => {
	const [displayGroup, setDisplayGroup] = useState<boolean>(false)
	return (
		<Box>
			<Flex align="center" justify="space-between" role="button" as="label" onClick={() => setDisplayGroup(!displayGroup)}>
				{/* <Body className="navigation-label">{config.label}</Body> */}
				<Caption title={config.label} className="navigation-label">
					{config.label}
				</Caption>
				<Box transition="transform .3s ease-in-out" transform={displayGroup ? 'rotate(180deg)' : 'none'} willChange="transform">
					<HiChevronDown />
				</Box>
			</Flex>

			<Stack display={displayGroup ? 'flex' : 'none'} spacing={-1}>
				{config.items?.map((items, k) => (
					<Item key={k} config={items} />
				))}
			</Stack>
		</Box>
	)
}

const Items = ({ config }: { config: NavItemType[] }) => {
	return config.map((item) => {
		switch (item.type) {
			case 'group':
				return <Group config={item} />
			case 'item':
				return <Item config={item} />
			case 'section':
				return <ItemSection config={item} />
			default:
				return <Group config={item} />
		}
	})
}

export default Items
