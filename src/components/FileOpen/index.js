const Path = require('path')

module.exports = {
	options: {
		name: 'FileOpen',
		title: 'Open',
		defaultPath: process.cwd(),
		filters: [],
		properties: {
			openFile: true,
			openDirectory: false,
			multiSelection: true,
			showHiddenFiles: true,
			promptToCreate: true,
			dontAddToRecent: true
		}
	}
}
