import { MutableRefObject, useEffect, useState } from 'react'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useClickOutside2(p: { targetRef: MutableRefObject<any>; excludeRefs?: Array<MutableRefObject<any>> }) {
	const [outsideClicked, setOutSideClicked] = useState(false)
	const { targetRef, excludeRefs } = p
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			// First check
			// chechs if there is a target Ref and if the dom elemen clicked is outside of the targetRef
			if (targetRef.current && !targetRef.current.contains(event.target)) {
				if (excludeRefs?.find((excludeRef) => excludeRef.current === event.target)) {
					setOutSideClicked(false)
					return
				}

				setOutSideClicked(true)
			} else {
				setOutSideClicked(false)
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [targetRef, excludeRefs])

	return outsideClicked
}

export default useClickOutside2
