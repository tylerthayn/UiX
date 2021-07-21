let Fs = require('fs')
let Path = require('path')

Fs.readdirSync(__dirname, {withFileTypes: true}).forEach(entry => {
	if (entry.isDirectory()) {
		module.exports[entry.name] = require(Path.resolve(__dirname, entry.name, 'index.js'))
	}
})
