import { Player } from '@lottiefiles/react-lottie-player'
import json from './json/cupJumb.json'
const CupJumbLoader = () => {
	return (
		<Player
			autoplay
			loop
			src={json}
			//src="https://assets5.lottiefiles.com/packages/lf20_Dz3Jb8.json"
			style={{ height: '250px', width: '300px' }}
		></Player>
	)
}

export default CupJumbLoader
