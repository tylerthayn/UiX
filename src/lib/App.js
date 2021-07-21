const {app, BrowserWindow, dialog, session, ipcMain} = require('electron')
const Fs = require('fs')
const Path = require('path')
const _ = require('lodash-tts')

let Send = (process.send !== 'undefined' && process.send instanceof Function) ? process.send : _.log

function WrapJs (js, options) {
	return '(function (options) {'+js+'})('+JSON.stringify(options)+')'
}

function CloseHandler () {
	Send(JSON.stringify({canceled: true}))
}

let insertedStyles = [], window = undefined, responseReturned = false

module.exports = (options) => {
	options.app.mainWindow.webPreferences.preload = Path.resolve(__dirname, 'preload.js')
	options.app.mainWindow.show = false

	function CreateWindow () {
		window = new BrowserWindow(options.app.mainWindow)
		window.loadFile(Path.resolve(__dirname, '../static/UiX.html'))
		//window.webContents.openDevTools()

		window.on('close', CloseHandler)

	}

	function Out (event, data = {}) {
		if (_.Type(data, 'object') && !Reflect.has(data, 'canceled')) {data.canceled = false}
		window.removeListener('close', CloseHandler)

		return new Promise((resolve, reject) => {
			resolve(Send(typeof data === 'object' ? JSON.stringify(data) : data))
		})
	}

	app.whenReady().then(CreateWindow)
	app.on('window-all-closed', function () {if (process.platform !== 'darwin') {app.quit()}})
	app.on('activate', function () {if (BrowserWindow.getAllWindows().length === 0) {CreateWindow()}})

	function LoadComponent (component) {
		if (_.Match(component.options.name, /^(File|Directory)(Open|Save)/i)) {
			let fn = component.options.name == 'FileOpen' ? dialog.showOpenDialog : component.options.name == 'FileSave' ? dialog.showSaveDialog : () => {}
			component.options.properties = ProcessProperties(component.options.properties)
			fn(window, component.options).then((data) => {
				Out({}, data)
			}).catch((e) => {
				Out({}, e)
			}).finally (() => {
				setTimeout(app.quit, 500)
			})
			return
		}

		window.webContents.send('clear')
		component.css && component.css.forEach(style => {
			//_.log(style)
			insertedStyles.push(window.webContents.insertCSS(Fs.readFileSync(Path.resolve(style), 'utf8')))
		})
		component.html && component.html.forEach(html => {
			//_.log(html)
			window.webContents.send('html', Fs.readFileSync(Path.resolve(html), 'utf8'))
		})
		component.js && component.js.forEach(js => {
			//_.log(js)
			window.webContents.executeJavaScript(WrapJs(Fs.readFileSync(Path.resolve(js), 'utf8'), component.options))
		})
	}

	ipcMain.handle('resize', (e, w, h) => {
		window.setContentSize(w, h)
	})

	ipcMain.handle('event', (e, name, ...args) => {
		if (name === 'ready') {
			LoadComponent(options.component)
		}
		return new Promise((resolve, reject) => {resolve(true)})
	})

	ipcMain.handle('process.send', (event, arg) => {
		return new Promise((resolve, reject) => {
			if (process.send !== 'undefined' && process.send instanceof Function) {
				return resolve(process.send(arg))
			}
			resolve(false)
		})
	})

	ipcMain.handle('process.stdout', (event, arg) => {
		return new Promise((resolve, reject) => {
			resolve(process.stdout.write(arg))
		})
	})

	ipcMain.handle('process.out', Out)

	ipcMain.handle('show', () => {
		window.show()
	})

	ipcMain.handle('exit', () => {
		app.quit()
	})


	function NativeDialog (component) {
		let fn = component.options.name == 'FileOpen' ? 'showOpenDialog' : component.options.name == 'FileSave' ? 'showSaveDialog' : 'noop'

		component.options.properties = ProcessProperties(component.options.properties)
		dialog[fn](window, component.options).then((data) => {
			Send(JSON.stringify(data))
			setTimeout(app.quit, 250)
		}).catch((e) => {fn(e.toString())})
	}

	function ProcessProperties (properties) {
		let _properties = []
		Object.keys(properties).forEach(prop => {
			if (properties[prop] === true) {
				_properties.push(prop)
			}
		})
		return _properties
	}
}
