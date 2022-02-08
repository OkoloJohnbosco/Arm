import { Box, Stack } from '@chakra-ui/react'
import Link, { CustomLinkProps } from 'components/link'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BiChevronRight } from 'react-icons/bi'
import { Button, ButtonVariantType } from 'components/button'

const LinkText = ({ children, isChevron = false, ...others }: CustomLinkProps & { isChevron?: boolean }) => {
	return (
		<Link {...others}>
			<Stack
				spacing={2}
				align="center"
				direction="row"
				wrap="wrap"
				cursor="pointer"
				_hover={{ transform: 'translateX(4px)' }}
				transform="520ms"
				transition="transform .5s"
			>
				<Box as="label">{children}</Box>
				{isChevron ? <Box as={BiChevronRight} boxSize={5} /> : <Box as={BsArrowRight} boxSize={5} />}
				{/* < size={24}/> */}
			</Stack>
		</Link>
	)
}

const ChevronLink = ({ children, color = 'claret.500', isChevron = false }: ButtonVariantType & { isChevron?: boolean }) => (
	<Button
		w="120px"
		justifyContent="flex-start"
		className="chevron-link"
		my={2}
		style={{ outline: 'none', padding: 0 }}
		fontWeight="bold"
		color={color}
		bg="transparent"
		textDecoration="underline"
	>
		<span>{children}</span>
		{isChevron && <BiChevronRight />}
	</Button>
)

export default LinkText

export { ChevronLink }
