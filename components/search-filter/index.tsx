import { Box, Flex, Image } from '@chakra-ui/react'
import Small from 'components/typography/Small'
import { colors } from 'lib/theme'
import Input from 'components/input'
import { Button } from 'components/button'
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { BiCaretDown } from 'react-icons/bi'
import Select from 'components/input/select'

type FilterProps = {
	searchFilter: (search) => void
}

const Index = (props: FilterProps) => (
	<Flex justify="space-between" py="6" alignItems="center" h="2">
		<Box w="70%">
			<Input
				onChange={({ target }) => props.searchFilter(target.value)}
				containerStyle={{ bg: 'unset' }}
				flex="9"
				trapError={false}
				icon={{ iconComp: IoSearchOutline }}
				placeholder="Search Investment Solution"
			/>
		</Box>
		<Button h="2" py="4" px="8" alt size="lg">
			Search
		</Button>
	</Flex>
)

export default Index
