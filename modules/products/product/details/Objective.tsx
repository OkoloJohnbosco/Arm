import Body from 'components/typography/Body'
import { useContext } from 'react'
import ProductContext from '../ProductContext'

const Objective = () => {
	const { product } = useContext(ProductContext)
	return (
		<Body maxW="45ch" color="neutral-400">
			{product.description}
		</Body>
	)
}

export default Objective
