import { useMemo } from 'react'
import { BroadcastChannel } from 'broadcast-channel'

const useBroadcastChannel = (channel: string) => {
	return useMemo(() => new BroadcastChannel(channel), [channel])
}

export default useBroadcastChannel
