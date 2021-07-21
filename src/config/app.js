const Path = require('path')
const _ = require('lodash-tts')

module.exports = {
	mainWindow: {
		width: 600,
		height: 400,
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		//type: 'toolbar',
		webPreferences: {
			nodeIntegration: true,
			preload: Path.resolve('./src/lib/preload.js'),
			contextIsolation: true
		}
	}
}

