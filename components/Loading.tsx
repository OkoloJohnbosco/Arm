import { Box, Image } from '@chakra-ui/react'
import { colors } from 'lib/theme'

const Loading = () => {
	return (
		<Box
			style={{
				backgroundColor: colors.white,
				// padding: '10px',
				borderRadius: '0px 30px 10px 50px',
				// border: `1px solid ${colors['neutral-40']}`,
				display: 'inline-block',
			}}
		>
			<Image src="/img/typing-loader.gif" width={'40px'} />
		</Box>
	)
}

export default Loading
