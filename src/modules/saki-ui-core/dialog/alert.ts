export const alert = ({
	titleAvatar,
	titleAvatarText,
	title,
	content,
	cancelText,
	confirmText,
	autoHideDuration = 0,
	flexButton = false,
	onCancel,
	onConfirm,
}: {
	titleAvatar?: string
	titleAvatarText?: string
	title: string
	content: string
	cancelText?: string
	confirmText?: string
	autoHideDuration?: number
	flexButton?: boolean
	onCancel?: () => void
	onConfirm?: () => void
}) => {
	let el: any
	const api = {
		open() {
			el = document.createElement('saki-dialog-alert')
			el['title'] = title
			el['titleAvatar'] = titleAvatar || ''
			el['titleAvatarText'] = titleAvatarText || ''
			el['title'] = title
			el['content'] = content
			el['cancelText'] = cancelText
			el['confirmText'] = confirmText
			el['autoHideDuration'] = autoHideDuration
			el['flexButton'] = flexButton
			el.addEventListener('load', () => {
				el.open()
			})
			// el.onclose = () => {
			//   console.log("close")
			// 	document.body.removeChild(el)
			// }
			el.addEventListener('close', () => {
				document.body.removeChild(el)
			})
			el.addEventListener('cancel', () => {
				onCancel?.()
			})
			el.addEventListener('confirm', () => {
				onConfirm?.()
			})
			document.body.appendChild(el)
		},
		close() {
			el?.close?.()
		},
	}
	return api
}
