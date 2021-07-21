let _ = require('lodash-tts')
let UiX = require('./')

let type = process.argv[2]
if (typeof type === 'undefined') {
	_.logj(UiX.Components)
	process.exit()
}

let ui = {}
if (type == 'Confirm') {
	ui = new UiX('Confirm', {
		title: 'Are you sure?',
		text: 'Do you really want to?'
	})
}

if (type == 'Login1') {
	ui = new UiX('Login', {})
}
if (type == 'Login2') {
	ui = new UiX('Login', {includeUsername: false})
}
if (type == 'Login3') {
	ui = new UiX('Login', {confirm: true})
}
if (type == 'PatternLock') {
	ui = new UiX('PatternLock', {confirm: true})
}

ui.Run().then(_.log)

