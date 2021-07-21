
$(() => {
	$('div.Title').text(options.title)
	$('div.Text').text(options.text)
	$('button.Cancel').text(options.buttons.cancel)
	$('button.Confirm').text(options.buttons.confirm)

	$('button.Cancel').on('click', () => {UiX.Done({canceled: true})})
	$('button.Confirm').on('click', () => {UiX.Done({canceled: false})})

	UiX.Ready(options)
})
