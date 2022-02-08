import { Box } from '@chakra-ui/react'
import styled from 'styled-components'

export const StyledImage = styled(Box)<{ size: string | undefined }>`
	svg {
		height: ${(props) => props.size};
	}
`
