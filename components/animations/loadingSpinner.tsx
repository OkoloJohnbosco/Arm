import { Player } from '@lottiefiles/react-lottie-player'
import json from './json/loadingSpinner.json'
const LoadingSpinner = () => {
	return (
		<Player
			autoplay
			loop
			src={json}
			//	src="https://assets8.lottiefiles.com/packages/lf20_Stt1R6.json"
			style={{ width: '60px', margin: 'inherit' }}
		></Player>
	)
}

export default LoadingSpinner
