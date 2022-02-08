import { Player } from '@lottiefiles/react-lottie-player'
import json from './json/typing.json'

const Typing = () => {
	return (
		<Player
			autoplay
			loop
			src={json}
			//	src="https://assets8.lottiefiles.com/packages/lf20_Stt1R6.json"
			style={{ width: '6rem', margin: 'inherit', fill: 'transparent' }}
		/>
	)
}

export default Typing
