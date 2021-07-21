const Path = require('path')

module.exports = {
	css: [Path.resolve(__dirname, 'PatternLock.css')],
	html: [Path.resolve(__dirname, 'PatternLock.html')],
	js: [Path.resolve(__dirname, 'PatternLock.js')],
	options: {
		name: 'PatternLock',
		title: 'PatternLock',
		confirm: false
	}
}