const Path = require('path')

module.exports = {
	css: [Path.resolve(__dirname, 'Login.css')],
	html: [Path.resolve(__dirname, 'Login.html')],
	js: [Path.resolve(__dirname, 'Login.js')],
	options: {
		name: 'Login',
		title: 'User Login',
		includeUsername: true,
		includePassword: true,
		confirm: false
	}
}