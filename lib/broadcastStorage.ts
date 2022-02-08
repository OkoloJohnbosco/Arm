import { BroadcastChannel } from 'broadcast-channel'
import { useEffect, useState } from 'react'
import useBroadcastChannel from './hooks/useBroadcastChannel'

type StorageType = 'sessionStorage' | 'localStorage'

export const useBroadcastStorage = (storageKey: string, storage?: StorageType) => {
	const [message, setMessage] = useState<any>(
		typeof window === 'undefined' ? null : storage === 'sessionStorage' ? localStorage.getItem(storageKey) : sessionStorage.getItem(storageKey)
	)
	const bc = useBroadcastChannel(storageKey)

	useEffect(() => {
		bc.onmessage = () => {
			switch (storage) {
				case 'localStorage':
					setMessage(localStorage.getItem(storageKey))
					break
				case 'sessionStorage':
					setMessage(sessionStorage.getItem(storageKey))
					break
				default:
					setMessage(sessionStorage.getItem(storageKey))
			}
		}
	}, [bc, storage, storageKey])

	return !message || message === 'undefined' ? 'null' : message
}

export const setBroadcastStorage = (key: string, value: string, storage: StorageType = 'localStorage') => {
	switch (storage) {
		case 'localStorage':
			localStorage.setItem(key, value)
			break
		case 'sessionStorage':
			sessionStorage.setItem(key, value)
	}
	console.log('Posting to', key)
	new BroadcastChannel(key).postMessage({ key, value })
}
