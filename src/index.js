const _ = require('lodash-tts')
const Fork = require('child_process').fork
const Path = require('path')

let electronPath = Path.resolve(require.resolve('electron'), '../dist/electron.exe')
let electronCliPath = Path.resolve(require.resolve('electron'), '../cli.js')



function UiX (name, options = {}) {

	_.Define(this, 'Run', async function (cb) {
		return new Promise((resolve, reject) => {
			//const ui = spawn('node', [electronCliPath, Path.resolve(__dirname, 'main.js'), name, '-o', JSON.stringify(options)])

			const ui = Fork(electronCliPath, [
				Path.resolve(__dirname, 'main.js'),
				name,
				JSON.stringify(options)
			], {stdio: ['pipe', 'pipe', 'pipe', 'ipc']})

			ui.on('message', (data) => {
				ui.kill()
				resolve(_.IsJson(data.toString()) ? JSON.parse(data.toString()) : data.toString())
			})

			ui.on('error', (data) => {
				ui.kill()
				reject(data)
			})

			ui.stderr.on('data', (data) => {
				ui.kill()
				resolve({error: data})
			})

			ui.stdout.on('data', (data) => {
				if (data.toString().trim() === '') return
				ui.kill()
				resolve(_.IsJson(data.toString()) ? JSON.parse(data.toString()) : data.toString())
			})
		})
	})

	return this
}

_.Define(UiX, 'Components', require('./components'))

module.exports = UiX
