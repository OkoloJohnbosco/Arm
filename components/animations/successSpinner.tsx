import { others } from '@chakra-ui/styled-system'
import { Player, Controls, IPlayerProps } from '@lottiefiles/react-lottie-player'
import json from './json/successSpinner.json'
const SuccessSpinner = () => {
	return (
		<Player
			autoplay
			src={json}
			// src="https://assets9.lottiefiles.com/packages/lf20_8GTONt.json"
			loop
			style={{ height: '100px', width: 'fit-content' }}
		/>
	)
}

export default SuccessSpinner
