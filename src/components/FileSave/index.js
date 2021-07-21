const Path = require('path')

module.exports = {
	options: {
		name: 'FileSave',
		title: 'Save',
		defaultPath: process.cwd(),
		filters: [],
		properties: {
			showHiddenFiles: true,
			dontAddToRecent: true
		}
	}
}