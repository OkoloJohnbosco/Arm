import { Player } from '@lottiefiles/react-lottie-player'
import json from './json/keylock.json'

const EmailSent = () => {
	return (
		<Player
			autoplay
			loop
			src={json}
			//	src="https://assets8.lottiefiles.com/packages/lf20_Stt1R6.json"
			style={{ width: '100px', margin: 'inherit' }}
		/>
	)
}

export default EmailSent
