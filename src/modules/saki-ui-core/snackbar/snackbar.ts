export const snackbar = (options: {
	message: string
	autoHideDuration?: number
	vertical: 'bottom' | 'center' | 'top'
	horizontal: 'left' | 'center' | 'right'
	closeIcon?: boolean
	backgroundColor?: string
	backgroundHoverColor?: string
	backgroundActiveColor?: string
	color?: string
	hoverColor?: string
	activeColor?: string
	fontWeight?: string
	padding?: string
	onTap?: () => void
}) => {
	let el: any
	const api = {
		open() {
			// console.log('state.app.status', el)
			if (el) {
				el.open()
				return
			}
			el = document.createElement('saki-snackbar')
			// console.log('state.app.status', el)
			// console.log(el)
			const { onTap } = options
			Object.keys(options).forEach((k) => {
				if (k != 'onTap' && options[k]) {
					el[k] = options[k]
				}
			})
			if (onTap) {
				el['allowContentClick'] = 'true'
				el.addEventListener('tap', () => {
					onTap()
				})
			}
			el.addEventListener('load', () => {
				el.open()
			})
			el.addEventListener('close', () => {
				document.body.contains(el) && document.body.removeChild(el)
				el = null
			})
			document.body.appendChild(el)
		},
		close() {
			el?.close && el?.close()
		},
		setMessage(msg: string) {
			console.log('elelelel', el)
			if (el) {
				el['message'] = msg
			} else {
				options.message = msg
			}
		},
	}
	return api
}
