const Path = require('path')

module.exports = {
	css: [Path.resolve(__dirname, 'Confirm.css')],
	html: [Path.resolve(__dirname, 'Confirm.html')],
	js: [Path.resolve(__dirname, 'Confirm.js')],
	options: {
		name: 'Confirm',
		title: 'Confirmation',
		text: 'Do you confirm?',
		buttons: {
			cancel: 'No',
			confirm: 'Yes'
		}
	}
}