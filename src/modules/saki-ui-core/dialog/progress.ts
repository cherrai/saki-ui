export const progressBar = (options?: {
	maxWidth?: string
	minWidth?: string
	width?: string
	color?: string
	// ms
	delay?: number
}) => {
	let el: any
	const api = {
		open() {
			if (el) {
				el.open()
				return
			}
			el = document.createElement('saki-dialog-progress-bar')
			Object.keys(['maxWidth', 'color', 'minWidth', 'width', 'delay']).forEach(
				(k) => {
					options?.[k] && (el[k] = options?.[k])
				}
			)
			el.open()
			el.addEventListener('close', () => {
				// console.log('el', el)
				document.body.contains(el) && document.body.removeChild(el)
				el = null
			})
			document.body.appendChild(el)
		},
		setProgress({
			progress,
			tipText,
			tipColor,
			color,
			delay,
			onAnimationEnd,
		}: {
			progress: number
			tipText?: string
			tipColor?: string
			color?: string
			// ms
			delay?: number
			onAnimationEnd?: () => void
		}) {
			el['progress'] = progress
			el['tipText'] = tipText || ''
			el['tipColor'] = tipColor || ''
			el['color'] = color || ''
			delay && (el['delay'] = delay)
			onAnimationEnd &&
				setTimeout(() => {
					onAnimationEnd()
				}, delay || 500)
		},
		close() {
			el?.close && el?.close()
		},
	}
	return api
}
