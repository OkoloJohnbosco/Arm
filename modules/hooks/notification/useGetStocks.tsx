import { useState, useEffect } from 'react'
import axios from 'axios'
const token = 'c4v8si2ad3id268b3k0g'
const BASE__URL = `https://finnhub.io/api/v1/quote`

function useGetStocks() {
	const [stocksData, setStocksData] = useState<any>([])

	useEffect(() => {
		const stocksList = ['MSFT', 'TSLA', 'FB', 'BABA', 'UBER']
		const promises: Array<Promise<any>> = []
		const testData: Array<any> = []

		const getStocksData = (stock): Promise<any> => {
			return axios.get(`${BASE__URL}?symbol=${stock}&token=${token}`).catch((error) => {
				console.error('Error', error.message)
			})
		}

		stocksList.forEach((stock) => {
			promises.push(
				getStocksData(stock)
					.then((res) => {
						testData.push({
							name: stock,
							...res?.data,
						})
					})
					.catch((err) => console.log(err))
			)
		})

		Promise.all(promises).then(() => {
			setStocksData(testData)
		})
	}, [])

	return [stocksData]
}

export default useGetStocks
